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

        if (currentLeader.isLeader() == true) { //?????? ????????????
            UserJoinStudy nextLeader = userJoinStudyRepository.findByUserIdAndStudyId(nextLeaderId, studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (nextLeader.isLeader() == false) { //???????????? ????????????
                currentLeader.dismissal();
                nextLeader.delegate();
            }
        }
    }

    @Override
    public void closeStudy(int studyLeaderId, int studyId) {

        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.isLeader() == true) { //??????????????? ?????????
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (currentStudy.isEnd() == false) { //???????????? ???????????????
                currentStudy.close();
            }
        }
    }

    @Override
    public void recruitStudy(int studyLeaderId, int studyId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.isLeader() == true) { //??????????????? ?????????
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (currentStudy.isEnd() == false) { //???????????? ???????????????

                if (currentStudy.getCurrentPerson() < currentStudy.getMaxPerson()) { //?????? ?????? ????????? ?????? ?????? ??? ?????? ?????? ?????? ????????????
                    currentStudy.recruit();
                }
            }
        }
    }

    @Override
    public void deadlineStudy(int studyLeaderId, int studyId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.isLeader()) { //??????????????? ?????????
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (!currentStudy.isEnd()) { //???????????? ???????????????
                currentStudy.deadline();
            }
        }
    }

    @Override
    public void banUser(int studyLeaderId, int studyId, int userId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.isLeader()) {//??????????????? ?????????
            UserJoinStudy user = userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (!user.isBan()) { //??????????????? ???????????? ????????? ?????????
                user.ban();
            }
        }
    }

    @Override
    public void updateStudyInfo(int studyLeaderId, int studyId, StudyInfoDTO studyInfoDTO, MultipartFile multipartFile) {

        //?????? ????????? ????????? ??????.
        User user = userRepository
                .findById(studyLeaderId)
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        //?????? ???????????? ????????? ??????
        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //?????? ????????? ?????? ???????????? ????????????.
        userJoinStudyRepository
                .findByStudyInformationAndUserAndIsLeaderTrue(studyInformation,user)
                .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

        if(studyInfoDTO != null) {
            //?????? ??????.
            if (studyInfoDTO.getTypeId() != 0) {
                //????????? ????????? ?????? ???????????????,
                StudyType studyType = studyTypeRepository
                        .findById(studyInfoDTO.getTypeId())
                        .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_TYPE));

                studyInformation.updateStudyType(studyType);
            }

            //???????????? ????????? ?????? ????????? ????????????.
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

        //?????? ?????? - ????????? ??????????????????, ????????? ???????????? ?????? ????????? ????????????.
        if(multipartFile != null && multipartFile.getSize() > 0){
            String temp = fileUpload(multipartFile, studyInformation.getImgPath());

            log.info("file path : {}",temp );
            studyInformation.updateImage(temp);
        }
    }

    public String fileUpload(MultipartFile multipartFile, String imagePath){

        String storeFileName = "";
        String fileSavePath = "";//?????? ?????? ??????

        // ?????? ?????? ?????? ???????????? ????????? ????????? ???????????? ??????
        //?????? ????????????????????? ?????? ?????? ??????
        String[] imagePathSplit = imagePath.split("/");

        //???????????? ????????? ?????? ??????.
        String fileName = imagePathSplit[imagePathSplit.length-1];

        //??????????????? ?????? ??????????????? ???????????????.
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

        // TODO : ???????????? ????????? ????????? ??????

        //?????? ??????
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
