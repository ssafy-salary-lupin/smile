package cp.smile.study_management.admin.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_common.StudyType;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_common.repository.StudyTypeRepository;
import cp.smile.study_management.admin.dto.request.StudyInfoDTO;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import static cp.smile.config.AwsS3DirectoryName.DEFAULT_STUDY;
import static cp.smile.config.AwsS3DirectoryName.STUDY_IMG;
import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = false)
@Service
public class StudyAdminServiceImpl implements StudyAdminService {

    private final UserRepository userRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final StudyTypeRepository studyTypeRepository;

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public List<User> findUserByStudy(int studyId) {
        return userRepository.findUserByStudy(studyId);
    }

    @Override
    public void changeLeader(int currentLeaderId, int studyId, int nextLeaderId) {

        UserJoinStudy currentLeader = userJoinStudyRepository.findByUserIdAndStudyId(currentLeaderId, studyId)
        .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (currentLeader.getIsLeader() == true) { //현재 스터디장
            UserJoinStudy nextLeader = userJoinStudyRepository.findByUserIdAndStudyId(nextLeaderId, studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (nextLeader.getIsLeader() == false) { //스터디장 위임대상
                currentLeader.dismissal();
                nextLeader.delegate();
            }
        }
    }

    @Override
    public void closeStudy(int studyLeaderId, int studyId) {

        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.getIsLeader() == true) { //스터디장이 맞으면
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (currentStudy.isEnd() == false) { //스터디가 진행중이면
                currentStudy.close();
            }
        }
    }

    @Override
    public void recruitStudy(int studyLeaderId, int studyId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.getIsLeader() == true) { //스터디장이 맞으면
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (currentStudy.isEnd() == false) { //스터디가 진행중이면

                if (currentStudy.getCurrentPerson() < currentStudy.getMaxPerson()) { //현재 가입 인원이 최대 인원 수 보다 적을 경우 모집가능
                    currentStudy.recruit();
                }
            }
        }
    }

    @Override
    public void deadlineStudy(int studyLeaderId, int studyId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.getIsLeader()) { //스터디장이 맞으면
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (!currentStudy.isEnd()) { //스터디가 진행중이면
                currentStudy.deadline();
            }
        }
    }

    @Override
    public void banUser(int studyLeaderId, int studyId, int userId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.getIsLeader()) {//스터디장이 맞으면
            UserJoinStudy user = userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (!user.getIsBan()) { //해당유저가 강퇴당한 상태가 아니면
                user.ban();
            }
        }
    }

    @Override
    public void updateStudyInfo(int studyLeaderId, int studyId, StudyInfoDTO studyInfoDTO, MultipartFile multipartFile) {

        //해당 유저가 있는지 확인.
        User user = userRepository
                .findById(studyLeaderId)
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        //해당 스터디가 있는지 확인
        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //해당 유저가 해당 스터디의 리더인지.
        userJoinStudyRepository
                .findByStudyInformationAndUserAndIsLeaderTrue(studyInformation,user)
                .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

        if(studyInfoDTO != null) {
            //타입 수정.
            if (studyInfoDTO.getTypeId() != 0) {
                //수정할 타입이 없는 타입이라면,
                StudyType studyType = studyTypeRepository
                        .findById(studyInfoDTO.getTypeId())
                        .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_TYPE));

                studyInformation.updateStudyType(studyType);
            }

            //종료일자 저장을 위한 데이터 포맷설정.
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


            LocalDate endDate = LocalDate.parse(studyInfoDTO.getEndDate(), formatter);

            if (studyInfoDTO.getName() != null) {
                studyInformation.updateName(studyInfoDTO.getName());
            }

            if (studyInfoDTO.getEndDate() != null) {
                studyInformation.updateEndDate(endDate);
            }

            if (studyInfoDTO.getTime() != null) {
                studyInformation.updateTime(studyInfoDTO.getTime());
            }

            if (studyInfoDTO.getMaxPerson() != null) {
                studyInformation.updateMaxPerson(studyInfoDTO.getMaxPerson());
            }

            if (studyInfoDTO.getDescription() != null) {
                studyInformation.updateDescription(studyInfoDTO.getDescription());
            }

            if (studyInfoDTO.getRule() != null) {
                studyInformation.updateRule(studyInfoDTO.getRule());
            }
        }

        //파일 수정 - 파일이 하나뿐이므로, 경로는 유지하고 기존 파일을 덮어버림.
        if(multipartFile != null && multipartFile.getSize() > 0){
            String temp = fileUpload(multipartFile, studyInformation.getImgPath());

            log.info("file path : {}",temp );
            studyInformation.updateImage(temp);
        }
    }

    public String fileUpload(MultipartFile multipartFile, String imagePath){

        String storeFileName = "";
        String fileSavePath = "";//파일 저장 위치

        // 기존 파일 경로 가져와서 저장할 경로와 파일이름 추출
        //기존 이미지경로에서 파일 이름 추출
        String[] imagePathSplit = imagePath.split("/");

        //확장자가 포함된 파일 이름.
        String fileName = imagePathSplit[imagePathSplit.length-1];

        //기본경로면 새로 파일이름을 생성해야됨.
        if(imagePathSplit[imagePathSplit.length-2].equals("default-img")){
            String originFileName = multipartFile.getOriginalFilename();
            int index = originFileName.lastIndexOf(".");
            String ext = originFileName.substring(index + 1);

            storeFileName = UUID.randomUUID().toString() + "." + ext;

        }
        else{
            storeFileName = fileName;

        }

        fileSavePath = STUDY_IMG + storeFileName;

        // TODO : 확장자를 제한할 필요가 있음

        //파일 저장
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());

        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileSavePath, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (IOException e) {
            throw new CustomException(FILE_SAVE_FAIL);
        }

        return amazonS3Client.getUrl(bucket,fileSavePath).toString();
    }

}
