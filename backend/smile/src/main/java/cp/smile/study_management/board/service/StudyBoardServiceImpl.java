package cp.smile.study_management.board.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import cp.smile.config.response.exception.CustomException;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_management.*;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.board.dto.request.StudyBoardUpdateDTO;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.dto.request.UpdateCommentDTO;
import cp.smile.study_management.board.repository.StudyBoardCommentRepository;
import cp.smile.study_management.board.repository.StudyBoardFileRepository;
import cp.smile.study_management.board.repository.StudyBoardRepository;
import cp.smile.study_management.board.repository.StudyBoardTypeRepository;
import cp.smile.user.repository.UserJoinStudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static cp.smile.config.AwsS3DirectoryName.STUDY_FILE;
import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudyBoardServiceImpl implements StudyBoardService {


    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final StudyBoardRepository studyBoardRepository;
    private final StudyBoardTypeRepository studyBoardTypeRepository;
    private final StudyBoardFileRepository studyBoardFileRepository;
    private final StudyBoardCommentRepository studyBoardCommentRepository;
    private final AmazonS3Client amazonS3Client;
    
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    @Transactional
    public StudyBoard write(UserJoinStudy userJoinStudy, StudyBoardWriteDTO dto, MultipartFile[] files) {
        StudyBoardType boardType = studyBoardTypeRepository.findById(dto.getTypeId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_TYPE));

        // ????????? ????????? ????????? ?????? ??????????????? ??? ???????????? ??????
        if (boardType.getName() == StudyBoardTypeName.?????? && !userJoinStudy.isLeader()) {
            throw new CustomException(USER_NOT_STUDY_LEADER);
        }

        StudyBoard studyBoard = StudyBoard.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .studyBoardType(boardType)
                .build();

        studyBoard.setWriter(userJoinStudy.getUser());
        studyBoard.addTo(userJoinStudy.getStudyInformation());
        studyBoardRepository.save(studyBoard);



        //????????? ????????? ?????? ??????.
        if (files != null && files[0].getSize() != 0) {

            List<StudyBoardFile> uploadedFiles = uploadFiles(studyBoard, files);
            studyBoardFileRepository.saveAll(uploadedFiles);
        }

        return studyBoard;
    }

    /**
     * ????????? ID??? ????????? ??????
     * ????????? ?????? ???????????? ????????? ???????????? ?????? ????????? ?????? ??????
     */
    @Override
    public StudyBoard findById(int boardId) {
        StudyBoard studyBoard = studyBoardRepository.findByIdWithType(boardId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_BOARD));

        List<StudyBoardFile> files = studyBoardFileRepository.findByStudyBoard(studyBoard);
        List<StudyBoardComment> comments = studyBoardCommentRepository.findByStudyBoardWithUser(studyBoard);

        studyBoard.setStudyBoardFiles(files);
        studyBoard.setStudyBoardComments(comments);

        return studyBoard;
    }


    /**
     * ????????? ID??? ????????? ???????????? `???????????? ??????`
     * ????????? ?????? ???????????? ????????? ???????????? ?????? ????????? ?????? ??????
     * `Client??? ????????? ??????`??? ??????
     */
    @Override
    @Transactional
    public StudyBoard findByIdForView(int boardId) {
        StudyBoard studyBoard = findById(boardId);
        studyBoard.addViewCount();
        return studyBoard;
    }

    @Override
    @Transactional
    public StudyBoardComment writeComment(User writer, int boardId, String content) {
        StudyBoard studyBoard = studyBoardRepository.findById(boardId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_BOARD));

        StudyBoardComment boardComment = StudyBoardComment.builder()
                .studyBoard(studyBoard)
                .content(content)
                .user(writer)
                .build();

        // ?????? ????????? ??????

        return studyBoardCommentRepository.save(boardComment);
    }

    private List<StudyBoardFile> uploadFiles(StudyBoard studyBoard, MultipartFile ...files) {
        List<StudyBoardFile> uploadedBoardFiles = new ArrayList<>();
        for (MultipartFile file : files) {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            objectMetadata.setContentLength(file.getSize());

            String originFileName = file.getOriginalFilename();

            int index = originFileName.lastIndexOf(".");
            String ext = originFileName.substring(index + 1);//?????????

            // ????????? ??????- ???????????? ????????? ?????? ?????? uuid ??????(?????? ???????????? ?????????.)
            String storeFileName = UUID.randomUUID().toString() + "." + ext;

            // key: study-file/{??????????????????}/{??????????????????}/?????????
            String key = STUDY_FILE + studyBoard.getStudyInformation().getId()
                    + "/" + studyBoard.getId()
                    + "/" + storeFileName;

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e){
                throw new CustomException(FILE_SAVE_FAIL);
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
    public Page<StudyBoard> findByStudyIdWithPaging(int studyId,int typeId, Pageable pageable) {

        //???????????? ??????
        if(typeId == 1) return studyBoardRepository.findByStudyIdWithPagingNotice(studyId,pageable);
        //????????? ??????.
        else return studyBoardRepository.findByStudyIdWithPaging(studyId, pageable);
    }

    @Override
    public List<StudyBoardType> findAllType() {
        return studyBoardTypeRepository.findAll();
    }

    @Transactional(readOnly = false)
    @Override
    public void deleteStudyBoard(int userId, int studyId, int boardId) {

        //????????? ??????
        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //?????? ????????? ???????????? ?????? ???????????? ?????? - ????????? ???????????? ?????? ?????? ?????? ?????? ??????.
        userJoinStudyRepository
                .findByUserIdAndStudyId(userId,studyInformation.getId())
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));


        //?????? ????????? ??????????????????.
        userJoinStudyRepository
                .findByStudyInformationAndIsLeaderTrue(studyInformation)
                .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

        //???????????? ??????????????? ??????.
        studyBoardRepository.
                findByIdAndIsDeletedFalse(boardId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_BOARD));

        //????????? ???????????????
        StudyBoard studyBoard = studyBoardRepository.
                findById(boardId)
                .orElseThrow(() -> new CustomException(USER_NOT_DELETE_BOARD));

        //????????? ??????.
        studyBoard.deleteBoard();
    }

    @Override
    @Transactional(readOnly = false)
    public void updateStudyBoardComment(int userId, int studyId, int boardId, int commentId, UpdateCommentDTO updateCommentDTO) {

        // ????????? ??????
        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        // ???????????? ?????? ???????????? ??????
        userJoinStudyRepository
                .findByUserIdAndStudyId(userId, studyInformation.getId())
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        // ???????????? ??????????????? ??????
        studyBoardRepository.
                findByIdAndIsDeletedFalse(boardId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_BOARD));

        // ????????? ??????????????? ??????
        StudyBoardComment studyBoardComment = studyBoardCommentRepository
                .findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));

        // ?????? ????????? id??? ??????????????? ????????? id??? ?????????
        if (studyBoardComment.getUser().getId() == userId) {
            studyBoardComment.updateStudyBoardComment(updateCommentDTO.getContent());
        }
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteStudyBoardComment(int userId, int studyId, int boardId, int commentId) {

        // ????????? ??????
        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        // ???????????? ?????? ???????????? ??????
        userJoinStudyRepository
                .findByUserIdAndStudyId(userId, studyInformation.getId())
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        // ???????????? ??????????????? ??????
        studyBoardRepository.
                findByIdAndIsDeletedFalse(boardId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_BOARD));

        // ????????? ??????????????? ??????
        StudyBoardComment studyBoardComment = studyBoardCommentRepository
                .findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));

        // ?????? ????????? id??? ??????????????? ????????? id??? ?????????
        if (studyBoardComment.getUser().getId() == userId) {
            studyBoardComment.deleteStudyBoardComment();
        }
    }

    @Override
    @Transactional
    public void updateStudyBoard(User writer, int boardId, StudyBoardUpdateDTO dto, MultipartFile[] updateFiles) {
        StudyBoard studyBoard = studyBoardRepository.findById(boardId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_BOARD));

        if (!studyBoard.isWriter(writer)) {
            throw new CustomException(NOT_WRITER);
        }

        if (StringUtils.hasText(dto.getTitle())) {
            studyBoard.updateTitle(dto.getTitle());
        }

        if (StringUtils.hasText(dto.getContent())) {
            studyBoard.updateContent(dto.getContent());
        }

        if (dto.getTypeId() != null) {
            StudyBoardType boardType = studyBoardTypeRepository.findById(dto.getTypeId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_BOARD_TYPE));
            studyBoard.updateType(boardType);
        }

        studyBoard.deleteFiles(dto.getDeleteFileId());

        if (updateFiles != null && updateFiles[0].getSize() != 0) {
            List<StudyBoardFile> uploadedFiles = uploadFiles(studyBoard, updateFiles);
            studyBoardFileRepository.saveAll(uploadedFiles);
        }
    }
}
