package cp.smile.study_management.home.service;


import cp.smile.config.response.exception.CustomException;
import cp.smile.entity.study_common.StudyInformation;
import cp.smile.entity.user.User;
import cp.smile.study_common.repository.StudyCommonRepository;
import cp.smile.study_management.home.dto.response.StudyHomeDetailDTO;
import cp.smile.study_management.home.dto.response.UserNicknameDTO;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static cp.smile.config.response.exception.CustomExceptionStatus.NOT_FOUND_STUDY;

@Slf4j
@RequiredArgsConstructor
@Service
public class HomeServiceImpl implements HomeService {

    private final StudyCommonRepository studyCommonRepository;
    private final UserRepository userRepository;

    @Override
    public StudyHomeDetailDTO findStudyHomeDetail(int userId, int studyId) {

        StudyInformation studyInformation = studyCommonRepository
                .findById(studyId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_STUDY));

        List<UserNicknameDTO> UserNicknameDTOS = new ArrayList<>();

        List<User> users = userRepository.findUserByStudy(studyId);

        for (User user : users) {
            UserNicknameDTOS.add(UserNicknameDTO.builder()
                    .id(user.getId())
                    .nickname(user.getNickname()).build());
        }

        return StudyHomeDetailDTO.builder()
                .imagePath(studyInformation.getImgPath())
                .name(studyInformation.getName())
                .description(studyInformation.getDescription())
                .startDate(studyInformation.getStartDate())
                .endDate(studyInformation.getEndDate())
                .time(studyInformation.getTime())
                .rule(studyInformation.getRule())
                .users(UserNicknameDTOS).build();
    }
}
