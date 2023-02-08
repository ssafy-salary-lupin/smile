package cp.smile.study_management.admin.service;

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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@RequiredArgsConstructor
@Transactional(readOnly = false)
@Service
public class StudyAdminServiceImpl implements StudyAdminService {

    private final UserRepository userRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;
    private final StudyCommonRepository studyCommonRepository;
    private final StudyTypeRepository studyTypeRepository;

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

        if (studyLeader.getIsLeader() == true) { //스터디장이 맞으면
            StudyInformation currentStudy = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (currentStudy.isEnd() == false) { //스터디가 진행중이면
                currentStudy.deadline();
            }
        }
    }

    @Override
    public void banUser(int studyLeaderId, int studyId, int userId) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.getIsLeader() == true) {//스터디장이 맞으면
            UserJoinStudy user = userJoinStudyRepository.findByUserIdAndStudyId(userId, studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            if (user.getIsBan() == false) { //해당유저가 강퇴당한 상태가 아니면
                user.ban();
            }
        }
    }

    @Override
    public void updateStudyInfo(int studyLeaderId, int studyId, StudyInfoDTO studyInfoDTO) {
        UserJoinStudy studyLeader = userJoinStudyRepository.findByUserIdAndStudyId(studyLeaderId, studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (studyLeader.getIsLeader() == true) { // 스터디장이 맞으면
            StudyInformation studyInfo = studyCommonRepository.findById(studyId)
                    .orElseThrow(() -> new CustomException(USER_NOT_STUDY_LEADER));

            StudyType studyType = studyTypeRepository
                    .findById(studyInfoDTO.getTypeId())
                    .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY_TYPE));

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

            LocalDate endDate = LocalDate.parse(studyInfoDTO.getEndDate(), formatter);

            if (studyInfoDTO.getName() != null) {
                studyInfo.updateName(studyInfoDTO.getName());
            }

            if (studyInfoDTO.getEndDate() != null) {
                studyInfo.updateEndDate(endDate);
            }

            if (studyInfoDTO.getTime() != null) {
                studyInfo.updateTime(studyInfoDTO.getTime());
            }

            if (studyInfoDTO.getMaxPerson() != null) {
                studyInfo.updateMaxPerson(studyInfoDTO.getMaxPerson());
            }

            if (studyInfoDTO.getDescription() != null) {
                studyInfo.updateDescription(studyInfoDTO.getDescription());
            }

            if (studyInfoDTO.getRule() != null) {
                studyInfo.updateRule(studyInfoDTO.getRule());
            }

            if (studyType != null) {
                studyInfo.updateStudyType(studyType);
            }
        }

    }

}
