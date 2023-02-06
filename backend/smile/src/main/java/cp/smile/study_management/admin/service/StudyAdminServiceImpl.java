package cp.smile.study_management.admin.service;

import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = false)
@Service
public class StudyAdminServiceImpl implements StudyAdminService {

    private final UserRepository userRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyCommonRepository studyCommonRepository;

    @Override
    public List<User> findUserByStudy(int studyId) {
        return userRepository.findUserByStudy(studyId);
    }

    @Override
    public void changeLeader(int currentLeaderId, int studyId, int nextLeaderId) {

        UserJoinStudy currentLeader = userJoinStudyRepository.findByUserIdAndStudyId(currentLeaderId, studyId)
        .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

        if (currentLeader.getIsLeader() == true) { //현재 스터디장
            UserJoinStudy nextLeader = userJoinStudyRepository.findByUserIdAndStudyId(nextLeaderId, studyId)
                    .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

            if (nextLeader.getIsLeader() == false) { //스터디장 위임대상
                currentLeader.dismissal();
                nextLeader.delegate();
            }
        }
    }

    @Override
    public void closeStudy(int studyLeaderId, int studyId) {

        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

        if (studyLeader.getIsLeader() == true) { //스터디장이 맞으면
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

            if (currentStudy.isEnd() == false) { //스터디가 진행중이면
                currentStudy.close();
            }
        }
    }

    @Override
    public void recruitStudy(int studyLeaderId, int studyId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

        if (studyLeader.getIsLeader() == true) { //스터디장이 맞으면
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

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
                .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

        if (studyLeader.getIsLeader() == true) { //스터디장이 맞으면
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

            if (currentStudy.isEnd() == false) { //스터디가 진행중이면
                currentStudy.deadline();
            }
        }
    }

    @Override
    public void banUser(int studyLeaderId, int studyId, int userId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

        if (studyLeader.getIsLeader() == true) {//스터디장이 맞으면
            UserJoinStudy user = userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId)
                    .orElseThrow(() -> new EntityNotFoundException("잘못된 접근입니다."));

            if (user.getIsBan() == false) { //해당유저가 강퇴당한 상태가 아니면
                user.ban();
            }
        }
    }

}
