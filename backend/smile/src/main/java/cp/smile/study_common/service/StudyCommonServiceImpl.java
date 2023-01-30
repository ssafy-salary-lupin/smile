package cp.smile.study_common.service;


import cp.smile.entity.study_common.StudyInformation;
import cp.smile.study_common.dto.response.FindAllStudyDTO;
import cp.smile.study_common.dto.response.StudyTypeDTO;
import cp.smile.study_common.dto.response.StudyUserProfileDTO;
import cp.smile.study_common.repository.StudyCommonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class StudyCommonServiceImpl implements StudyCommonService{
    private final StudyCommonRepository studyCommonRepository;

    @Override
    public List<FindAllStudyDTO> findAllStudy() {


        // TODO : 현재는 단순한 RuntimeException을 던지지만, 추후에 예외에 대한 정리가 끝나면, 조회 데이터가 없다는 예외를 던지는 커스텀 예외를 적용해야됨.
        /*스터디 정보를 전체 조회해옴*/
        Set<StudyInformation> studyInformations = studyCommonRepository
                .findAllByStudyInformation()
                .orElseThrow(RuntimeException::new);


        List<FindAllStudyDTO> findAllStudyDTOS = new ArrayList<>();

        System.out.println(studyInformations);

        // TODO : 스트림으로 코드를 좀 더 깔끔하게 처리할 필요가 있음, - 또는 디비구조를 개편해서 코드를 줄이는 방법 생각(join을 안쓸 순 없음.)
        /*조인 한 결과를 response DTO에 담음.*/
        for(StudyInformation studyInformation : studyInformations){

            //스터디 타입 객체 매핑
            StudyTypeDTO studyTypeDTO = StudyTypeDTO.builder()
                    .id(studyInformation.getStudyType().getId())
                    .name(studyInformation.getStudyType().getName()).build();

            //유저 프로필 정보 객체 매핑.
            StudyUserProfileDTO studyUserProfileDTO = StudyUserProfileDTO.builder()
                    .id(studyInformation.getUserJoinStudies().iterator().next().getUser().getId())
                    .nickname(studyInformation.getUserJoinStudies().iterator().next().getUser().getNickname())
                    .imgPath(studyInformation.getUserJoinStudies().iterator().next().getUser().getImagePath()).build();


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


        // TODO : user 도메인 쪽에서 스터디가입 정보 조회 테이블이 완료되면
        /*스터디 장 조회*/

        System.out.println(findAllStudyDTOS);
        return findAllStudyDTOS;
    }
}
