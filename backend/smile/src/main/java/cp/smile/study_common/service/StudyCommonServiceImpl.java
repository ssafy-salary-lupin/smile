package cp.smile.study_common.service;


import cp.smile.entity.study_common.StudyComment;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.study_common.StudyType;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_common.dto.request.CreateStudyDTO;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.dto.response.FindDetailStudyDTO;
import cp.smile.study_common.dto.response.StudyTypeDTO;
import cp.smile.study_common.dto.response.StudyUserProfileDTO;
import cp.smile.study_common.dto.response.comment.StudyCommentDTO;
import cp.smile.study_common.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class StudyCommonServiceImpl implements StudyCommonService{
    private final StudyCommonRepository studyCommonRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyTypeRepository studyTypeRepository;
    private final UserRepository userRepository;
    private final StudyCommentRepository studyCommentRepository;

    /*전체 조회.*/
    @Override
    public List<FindAllStudyDTO> findAllStudy() {


        // TODO : 현재는 단순한 RuntimeException을 던지지만, 추후에 예외에 대한 정리가 끝나면, 조회 데이터가 없다는 예외를 던지는 커스텀 예외를 적용해야됨.
        /*스터디 정보를 전체 조회해옴*/
        Set<StudyInformation> studyInformations = studyCommonRepository
                .findAllByStudyInformation()
                .orElseThrow(RuntimeException::new);


        List<FindAllStudyDTO> findAllStudyDTOS = new ArrayList<>();

        // TODO : 스트림으로 코드를 좀 더 깔끔하게 처리할 필요가 있음, - 또는 디비구조를 개편해서 코드를 줄이는 방법 생각(join을 안쓸 순 없음.)
        /*조인 한 결과를 response DTO에 담음.*/
        for(StudyInformation studyInformation : studyInformations){

            //스터디 타입 객체 매핑
            StudyTypeDTO studyTypeDTO = studyInformation.getStudyType().createStudyTypeDTO();

            //유저 프로필 정보 객체 매핑
            StudyUserProfileDTO studyUserProfileDTO = studyInformation.getUserJoinStudies().iterator().next().getUser().createStudyUserProfileDTO();

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
                    .leader(studyUserProfileDTO).build();

            findAllStudyDTOS.add(findAllStudyDTO);
        }

        return findAllStudyDTOS;
    }

    /*스터디 생성*/
    public void createStudy(int userId, CreateStudyDTO createStudyDTO){

        String uuid = UUID.randomUUID().toString();

        //스터디 유형 조회.
        StudyType studyType = studyTypeRepository
                .findById(createStudyDTO.getTypeId())
                .orElseThrow(RuntimeException::new);


        //스터디 테이블 넣기
        StudyInformation studyInformation = StudyInformation.builder()
                .name(createStudyDTO.getName())
                .startDate(createStudyDTO.getStartDate())
                .endDate(createStudyDTO.getEndDate())
                .time(createStudyDTO.getTime())
                .currentPerson(1)
                .maxPerson(createStudyDTO.getMaxPerson())
                .description(createStudyDTO.getDescription())
                .viewCount(0)
                .deadline(false)
                .chatroomId(uuid)
                .isEnd(false)
                .studyType(studyType)
                .lastVisitedTime(LocalDateTime.now()).build();

        studyCommonRepository.save(studyInformation); //저장

        //유저 객체 조회
        User user = userRepository
                .findById(userId)
                .orElseThrow(RuntimeException::new);

        //유저 스터디 가입 정보 테이블에 넣기.
        UserJoinStudy userJoinStudy = UserJoinStudy.builder()
                .user(user)
                .studyInformation(studyInformation)
                .isLeader(true)
                .isBan(false)
                .isDeleted(false)
                .build();

        userJoinStudyRepository.save(userJoinStudy); //유저 스터디 가입 정보 저장.
    }

    /*스터디 상세 조회*/
    public FindDetailStudyDTO findDetailStudy(int id){

        //스터디 테이블 조회 - 스터디 아이디로 조회하는데 없다면 잘못된 요청이므로 예외던짐.
        StudyInformation studyInformation = studyCommonRepository
                .findById(id)
                .orElseThrow(RuntimeException::new);


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
}
