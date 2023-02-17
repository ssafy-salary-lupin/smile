package cp.smile.study_common.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import cp.smile.config.AwsS3DirectoryName;
import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.study_common.StudyComment;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_common.StudyReply;
import cp.smile.entity.study_common.StudyType;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.entity.user.UserJoinStudyId;
import cp.smile.study_common.dto.FindFilter;
import cp.smile.study_common.dto.request.*;
import cp.smile.study_common.dto.response.*;
import cp.smile.study_common.dto.response.comment.StudyCommentDTO;
import cp.smile.study_common.dto.response.comment.UpdateCommentResDTO;
import cp.smile.study_common.dto.response.comment.UpdateReplyResDTO;
import cp.smile.study_common.repository.*;
import cp.smile.study_management.chat.service.ChatService;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static cp.smile.config.AwsS3DirectoryName.DEFAULT_STUDY;
import static cp.smile.config.AwsS3DirectoryName.STUDY_IMG;
import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class StudyCommonServiceImpl implements StudyCommonService{

    private final StudyCommonRepository studyCommonRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyTypeRepository studyTypeRepository;
    private final UserRepository userRepository;
    private final StudyCommentRepository studyCommentRepository;
    private final StudyReplyRepository studyReplyRepository;
    private final AmazonS3Client amazonS3Client;
    private final ChatService chatService;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    /*전체 조회.*/
    @Override
    public List<FindAllStudyDTO> findAllStudy(FindFilter findFilter)  {

        // TODO : QueryDsl을 사용하지 않아서 동적쿼리 짜기가 어려움 - 당장은 개별 쿼리로 짜고, 추후에 querydsl을 활용해서 수정 필요

        /*스터디 정보를 전체 조회해옴*/

        List<StudyInformation> studyInformations = null;
        /**검색 조건이 없을때*/
        if(findFilter.getName() == null && findFilter.getType() == 0){
            studyInformations = studyCommonRepository.findAllByStudyInformation();
        }

        /**검색조건이 name 하나일때*/
        else if(findFilter.getName() != null && findFilter.getType() == 0){

            studyInformations = studyCommonRepository.findAllByNameIsContaining(findFilter.getName());
        }
        /** 검색 조건이 type 하나일 때*/
        else if(findFilter.getName() == null && findFilter.getType() != 0){

            studyInformations = studyCommonRepository.findAllByStudyType(findFilter.getType());
        }
        /** 검색 조건이 둘다 일때.*/
        else{

            studyInformations = studyCommonRepository
                    .findAllByNameIsContainingAndStudyType(findFilter.getName(),findFilter.getType());
        }


        List<FindAllStudyDTO> findAllStudyDTOS = studyInformations.stream()
                .map(StudyInformation::createFindAllStudyDTO)
                .collect(Collectors.toList());


        return findAllStudyDTOS;
    }

    /*스터디 생성*/
    public CreateStudyResponseDTO createStudy(int userId, CreateStudyDTO createStudyDTO, MultipartFile multipartFile) {
        String storeFileUrl = ""; //AWS S3 이미지 url

        //파일이 없다면 디폴트 경로 넣어줌.
        if(multipartFile == null || multipartFile.getSize() == 0) storeFileUrl = DEFAULT_STUDY;

        //파일이 있으면 s3에 저장.
        else storeFileUrl = saveFile(multipartFile);


        //스터디 유형 조회.
        StudyType studyType = studyTypeRepository
                .findById(createStudyDTO.getTypeId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_TYPE));

        //스터디 생성.
        StudyInformation studyInformation = createStudyDTO.createStudyInformation(storeFileUrl);

        //연관관계 넣기
        studyInformation.addStudyType(studyType);


        //저장 - 저장한 객체를 반환해서 해당 id로 채팅방 생성.
        StudyInformation saveStudyInformation = studyCommonRepository.save(studyInformation);

        //유저 객체 조회
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        //유저 스터디 가입정보 복합키 생성
        UserJoinStudyId userJoinStudyId = UserJoinStudyId.builder()
                .userId(user.getId())
                .studyInformationId(studyInformation.getId()).build();

        //유저 스터디 가입 정보 테이블에 넣기.
        UserJoinStudy userJoinStudy = UserJoinStudy.createStudyJoinLeader(userJoinStudyId, user,studyInformation);

        userJoinStudyRepository.save(userJoinStudy); //유저 스터디 가입 정보 저장.

        /*스터디 채팅방 생성*/
        //디비에 정보저장이 다 되었으면 스터디 채팅방을 생성함.
        chatService.createRoom(saveStudyInformation.getId());

        return saveStudyInformation.createStudyResponseDTO();
    }

    //파일 업로드 하는 로직 - s3에 데이터 넣음.
    private String saveFile(MultipartFile multipartFile) {
        String storeFileUrl;
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(multipartFile.getSize());

        String originFileName = multipartFile.getOriginalFilename();


        int index = originFileName.lastIndexOf(".");
        String ext = originFileName.substring(index+1);//확장자

        String storeFileName = UUID.randomUUID().toString() + "." + ext; // 저장할 이름- 중복되지 않도록 하기 위해 uuid 사용(이름 중복이면 덮어씀.)

        String key  = STUDY_IMG + storeFileName; //파일 저장위치.

        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }
        catch(IOException e){

            throw new CustomException(FILE_SAVE_FAIL);
        }

        storeFileUrl = amazonS3Client.getUrl(bucket, key).toString(); //저장된 Url
        return storeFileUrl;
    }

    /*스터디 상세 조회*/
    public FindDetailStudyDTO findDetailStudy(int id){

        //스터디 테이블 조회 - 스터디 아이디로 조회하는데 없다면 잘못된 요청이므로 예외던짐.
        StudyInformation studyInformation = studyCommonRepository
                .findById(id)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //스터디 리더 조회
        UserJoinStudy userJoinStudy = userJoinStudyRepository
                .findByStudyInformationAndIsLeaderTrue(studyInformation)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        User user = userRepository
                .findById(userJoinStudy.getUser().getId())
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));


        //댓글 대댓글 조회 - 대댓글은 없을 수도 있기 때문에 null리턴.
        Set<StudyComment> studyComments = studyCommentRepository.findAllCommentAndReply(studyInformation);

        //댓글 DTO 채우기 & 대댓글 DTO 채우기
        List<StudyCommentDTO> StudyCommentDTOS = studyComments.stream()
                .map(StudyComment::createStudyCommentDTO)
                .collect(Collectors.toList());

        studyInformation.addViewCount();

        //스터디 상세 조회 DTO 채우기.
        return FindDetailStudyDTO.builder()
                .id(studyInformation.getId())
                .name(studyInformation.getName())
                .startDate(studyInformation.getStartDate())
                .endDate(studyInformation.getEndDate())
                .time(studyInformation.getTime())
                .imagePath(studyInformation.getImgPath())
                .currentPerson(studyInformation.getCurrentPerson())
                .maxPerson(studyInformation.getMaxPerson())
                .viewCount(studyInformation.getViewCount())
                .description(studyInformation.getDescription())
                .type(studyInformation.getStudyType().createStudyTypeDTO())
                .leader(user.createUserProfileDTO())
                .comments(StudyCommentDTOS).build();
    }

    /*댓글 생성*/
    @Override
    public void createComment(CreateCommentDTO createCommentDTO) {

        //유저 조회
        User user = userRepository
                .findById(createCommentDTO.getUserId())
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        //스터디 조회
        StudyInformation studyInformation = studyCommonRepository
                .findById(createCommentDTO.getStudyId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //댓글 엔티티에 저장.
        StudyComment studyComment = StudyComment.builder()
                .user(user)
                .studyInformation(studyInformation)
                .content(createCommentDTO.getContent())
                .isDeleted(false).build();

        //댓글 저장.
        studyCommentRepository.save(studyComment);

    }

    /*대댓글 생성*/
    @Override
    public void createReply(CreateReplyDTO createReplyDTO) {

        //유저 조회
        User user = userRepository
                .findById(createReplyDTO.getUserId())
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        //댓글 조회
        StudyComment studyComment = studyCommentRepository
                .findById(createReplyDTO.getCommentId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));


        //대댓글 엔티티 생성
        StudyReply studyReply = StudyReply.builder()
                .user(user)
                .studyComment(studyComment)
                .content(createReplyDTO.getContent())
                .isDeleted(false).build();

        //대댓글 엔티티 저장
        studyReplyRepository.save(studyReply);

    }

    @Override
    public List<StudyTypeDTO> findAllType() {
        List<StudyType> types = studyTypeRepository.findAll();
        return types.stream().map(StudyTypeDTO::of).collect(Collectors.toList());
    }

    //댓글 업데이트
    @Override
    public UpdateCommentResDTO updateComment(int userId, int studyId, int commentId, UpdateCommentDTO updateCommentDTO) {

        //해당 스터디가 있는지 확인
        studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //해당 댓글이 존재하는지 확인.
        StudyComment studyComment = studyCommentRepository
                .findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));

        //댓글 작성자인지 확인.
        studyCommentRepository
                .findByIdAndUserIdAndIsDeletedFalse(commentId,userId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_COMMENT));

        //댓글 수정.
        studyComment.updateStudyComment(updateCommentDTO.getContent());

        return UpdateCommentResDTO.builder()
                .content(studyComment.getContent()).build();

    }

    //댓글 삭제
    @Override
    public void deleteComment(int userId, int studyId, int commentId) {

        //해당 스터디가 있는지 확인
        studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //해당 댓글이 존재하는지 확인.
        StudyComment studyComment = studyCommentRepository
                .findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));

        //댓글 작성자인지 확인.
        studyCommentRepository
                .findByIdAndUserIdAndIsDeletedFalse(commentId,userId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_COMMENT));

        //댓글 삭제
        studyComment.deleteStudyComment();

    }

    //대댓글 업데이트
    @Override
    public UpdateReplyResDTO updateReply(int userId, int studyId, int commentId, int replyId, UpdateReplyDTO updateReplyDTO) {

        //해당 스터디가 있는지 확인
        studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //해당 댓글이 존재하는지 확인.
        studyCommentRepository
                .findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));

        //해당 대댓글이 존재하는지
        StudyReply studyReply = studyReplyRepository
                .findByIdAndIsDeletedFalse(replyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_REPLY));

        //대댓글 작성자인지 확인.
        studyReplyRepository
                .findByIdAndUserIdAndIsDeletedFalse(replyId,userId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_REPLY));

        //대댓글 수정.
        studyReply.updateStudyReply(updateReplyDTO.getContent());

        return UpdateReplyResDTO.builder()
                .content(studyReply.getContent()).build();
    }

    //대댓글 삭제.
    @Override
    public void deleteReply(int userId, int studyId, int commentId, int replyId) {

        //해당 스터디가 있는지 확인
        studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        //해당 댓글이 존재하는지 확인.
        StudyComment studyComment = studyCommentRepository
                .findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));

        //해당 대댓글이 존재하는지
        StudyReply studyReply = studyReplyRepository
                .findByIdAndIsDeletedFalse(replyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_REPLY));

        //대댓글 작성자인지 확인.
        studyReplyRepository
                .findByIdAndUserIdAndIsDeletedFalse(replyId,userId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_REPLY));

        //댓글 삭제.
        studyReply.deleteStudyReply();

    }


}
