package cp.smile.study_common.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.entity.study_common.StudyComment;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_common.StudyReply;
import cp.smile.entity.study_common.StudyType;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.entity.user.UserJoinStudyId;
import cp.smile.study_common.dto.request.CreateCommentDTO;
import cp.smile.study_common.dto.request.CreateReplyDTO;
import cp.smile.study_common.dto.request.CreateStudyDTO;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.dto.response.FindDetailStudyDTO;
import cp.smile.study_common.dto.response.StudyTypeDTO;
import cp.smile.study_common.dto.response.UserProfileDTO;
import cp.smile.study_common.dto.response.comment.StudyCommentDTO;
import cp.smile.study_common.repository.*;
import cp.smile.study_management.chat.service.ChatService;
import cp.smile.study_management.chat.service.ChatServiceImpl;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    public List<FindAllStudyDTO> findAllStudy()  {


        // TODO : 현재는 단순한 RuntimeException을 던지지만, 추후에 예외에 대한 정리가 끝나면, 조회 데이터가 없다는 예외를 던지는 커스텀 예외를 적용해야됨.
        /*스터디 정보를 전체 조회해옴*/
        Set<StudyInformation> studyInformations = studyCommonRepository.findAllByStudyInformation();


        List<FindAllStudyDTO> findAllStudyDTOS = new ArrayList<>();

        // TODO : 스트림으로 코드를 좀 더 깔끔하게 처리할 필요가 있음, - 또는 디비구조를 개편해서 코드를 줄이는 방법 생각(join을 안쓸 순 없음.)
        /*조인 한 결과를 response DTO에 담음.*/
        for(StudyInformation studyInformation : studyInformations){

            //스터디 타입 객체 매핑
            StudyTypeDTO studyTypeDTO = studyInformation.getStudyType().createStudyTypeDTO();

            //유저 프로필 정보 객체 매핑
            UserProfileDTO userProfileDTO = studyInformation.getUserJoinStudies().iterator().next().getUser().createUserProfileDTO();

            //댓글의 수 구하기 - 삭제 된 것도 있기 때문에 스트림을 이용해서 개수를 세어줌.
            int commentCount = (int)studyInformation.getStudyComments().stream()
                    .filter((comment) -> comment.isDeleted() == false)
                    .count();


            //스터디 전체 조회시에 프론트로 리턴할 객체.
            FindAllStudyDTO findAllStudyDTO = FindAllStudyDTO.builder()
                    .id(studyInformation.getId())
                    .imgPath(studyInformation.getImgPath())
                    .person(studyInformation.getCurrentPerson())
                    .maxPerson(studyInformation.getMaxPerson())
                    .description(studyInformation.getDescription())
                    .viewCount(studyInformation.getViewCount())
                    .lastVisitedTime(studyInformation.getLastVisitedTime())
                    .type(studyTypeDTO)
                    .commentCount(commentCount)
                    .leader(userProfileDTO).build();

            findAllStudyDTOS.add(findAllStudyDTO);
        }

        return findAllStudyDTOS;
    }

    /*스터디 생성*/
    public void createStudy(int userId, CreateStudyDTO createStudyDTO, MultipartFile multipartFile) {
        String storeFileUrl = ""; //AWS S3 이미지 url

        //파일이 없다면 디폴트 경로 넣어줌.
        if(multipartFile == null || multipartFile.getSize() == 0){
            storeFileUrl = DEFAULT_STUDY;
        }
        //파일이 있으면 s3에 저장.
        else{
            /*파일 저장*/
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(multipartFile.getSize());

            String originFileName = multipartFile.getOriginalFilename();


            int index = originFileName.lastIndexOf(".");
            String ext = originFileName.substring(index+1);//확장자

            String storeFileName = UUID.randomUUID().toString() + "." + ext; // 저장할 이름- 중복되지 않도록 하기 위해 uuid 사용(이름 중복이면 덮어씀.)

            String key  = STUDY_IMG + storeFileName; //파일 저장위치.

            System.out.println(bucket);

            try (InputStream inputStream = multipartFile.getInputStream()) {
                amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            }
            catch(IOException e){

                throw new CustomException(FILE_SAVE_FAIL);
            }

            storeFileUrl = amazonS3Client.getUrl(bucket, key).toString(); //저장된 Url
        }


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        String uuid = UUID.randomUUID().toString();

        //스터디 유형 조회.
        StudyType studyType = studyTypeRepository
                .findById(createStudyDTO.getTypeId())
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_TYPE));


        //스터디 테이블 넣기
        StudyInformation studyInformation = StudyInformation.builder()
                .name(createStudyDTO.getName())
                .startDate(LocalDate.parse(createStudyDTO.getStartDate(), formatter))
                .endDate(LocalDate.parse(createStudyDTO.getEndDate(), formatter))
                .time(createStudyDTO.getTime())
                .currentPerson(1)
                .maxPerson(createStudyDTO.getMaxPerson())
                .description(createStudyDTO.getDescription())
                .viewCount(0)
                .deadline(false)
                .chatroomId(uuid)
                .isEnd(false)
                .studyType(studyType)
                .imgPath(storeFileUrl)
                .lastVisitedTime(LocalDateTime.now()).build();


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
        UserJoinStudy userJoinStudy = UserJoinStudy.builder()
                .id(userJoinStudyId)
                .user(user)
                .studyInformation(studyInformation)
                .isLeader(true)
                .isBan(false)
                .isDeleted(false)
                .build();

        userJoinStudyRepository.save(userJoinStudy); //유저 스터디 가입 정보 저장.

        /*스터디 채팅방 생성*/
        //디비에 정보저장이 다 되었으면 스터디 채팅방을 생성함.
        chatService.createRoom(saveStudyInformation.getId());

        // TODO : 방이 생성되면 studyId를 생성해서 반환해주어야 한다.
    }

    /*스터디 상세 조회*/
    public FindDetailStudyDTO findDetailStudy(int id){

        //스터디 테이블 조회 - 스터디 아이디로 조회하는데 없다면 잘못된 요청이므로 예외던짐.
        StudyInformation studyInformation = studyCommonRepository
                .findById(id)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));


        //댓글 대댓글 조회 - 대댓글은 없을 수도 있기 때문에 null리턴.
        Set<StudyComment> studyComments = studyCommentRepository
                .findAllCommentAndReply(studyInformation)
                .orElse(null);

        //댓글 DTO 채우기 & 대댓글 DTO 채우기
        List<StudyCommentDTO> StudyCommentDTOS = studyComments.stream()
                .map(StudyComment::createStudyCommentDTO)
                .collect(Collectors.toList());

        //스터디 상세 조회 DTO 채우기.
        return FindDetailStudyDTO.builder()
                .id(studyInformation.getId())
                .name(studyInformation.getName())
                .startDate(studyInformation.getStartDate())
                .endDate(studyInformation.getEndDate())
                .time(studyInformation.getTime())
                .imgPath(studyInformation.getImgPath())
                .currentPerson(studyInformation.getCurrentPerson())
                .maxPerson(studyInformation.getMaxPerson())
                .viewCount(studyInformation.getViewCount())
                .type(studyInformation.getStudyType().createStudyTypeDTO())
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



}
