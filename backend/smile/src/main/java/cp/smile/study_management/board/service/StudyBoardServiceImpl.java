package cp.smile.study_management.board.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.study_management.StudyBoardFile;
import cp.smile.entity.study_management.StudyBoardType;
import cp.smile.entity.study_management.StudyBoardTypeName;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.repository.StudyBoardFileRepository;
import cp.smile.study_management.board.repository.StudyBoardRepository;
import cp.smile.study_management.board.repository.StudyBoardTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static cp.smile.config.AwsS3DirectoryName.STUDY_FILE;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyBoardServiceImpl implements StudyBoardService {

    private final StudyBoardRepository studyBoardRepository;
    private final StudyBoardTypeRepository studyBoardTypeRepository;
    private final StudyBoardFileRepository studyBoardFileRepository;
    private final AmazonS3Client amazonS3Client;
    
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    @Transactional
    public StudyBoard write(UserJoinStudy userJoinStudy, StudyBoardWriteDTO dto, MultipartFile[] files) {
        StudyBoardType boardType = studyBoardTypeRepository.findById(dto.getTypeId())
                .orElseThrow(() -> new EntityNotFoundException(dto.getTypeId() + "에 해당하는 게시글 유형이 없습니다."));

        // 게시글 유형이 공지인 경우 스터디장만 쓸 수있도록 검사
        if (boardType.getName() == StudyBoardTypeName.notice && !userJoinStudy.getIsLeader()) {
            throw new RuntimeException("공지는 스터디장만 쓸 수 있습니다.");
        }

        StudyBoard studyBoard = StudyBoard.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .studyBoardType(boardType)
                .build();

        studyBoard.setWriter(userJoinStudy.getUser());
        studyBoard.setStudyInformation(userJoinStudy.getStudyInformation());
        studyBoardRepository.save(studyBoard);

        if (files[0].getSize() != 0) {
            List<StudyBoardFile> uploadedFiles = uploadFiles(studyBoard, files);
            studyBoardFileRepository.saveAll(uploadedFiles);
        }

        return studyBoard;
    }

    private List<StudyBoardFile> uploadFiles(StudyBoard studyBoard, MultipartFile ...files) {
        List<StudyBoardFile> uploadedBoardFiles = new ArrayList<>();
        for (MultipartFile file : files) {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            objectMetadata.setContentLength(file.getSize());

            String originFileName = file.getOriginalFilename();

            int index = originFileName.lastIndexOf(".");
            String ext = originFileName.substring(index + 1);//확장자

            // 저장할 이름- 중복되지 않도록 하기 위해 uuid 사용(이름 중복이면 덮어씀.)
            String storeFileName = UUID.randomUUID().toString() + "." + ext;

            // key: study-file/{스터디식별자}/{게시글식별자}/파일명
            String key = STUDY_FILE + studyBoard.getStudyInformation().getId()
                    + "/" + studyBoard.getId()
                    + "/" + storeFileName;

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e){
                throw new RuntimeException(e);
            }

            uploadedBoardFiles.add(
                    StudyBoardFile.builder()
                            .studyBoard(studyBoard)
                            .name(originFileName)
                            .path(amazonS3Client.getUrl(bucket, key).toString())
                            .build()
            );
        }

        return uploadedBoardFiles;
    }

    @Override
    public Page<StudyBoard> findByStudyIdWithPaging(int studyId, Pageable pageable) {
        return studyBoardRepository.findByStudyIdWithPaging(studyId, pageable);
    }
}
