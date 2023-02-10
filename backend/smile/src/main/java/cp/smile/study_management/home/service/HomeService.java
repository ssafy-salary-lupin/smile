package cp.smile.study_management.home.service;

import cp.smile.study_management.home.dto.response.ScheduleDdayDTO;
import cp.smile.study_management.home.dto.response.StudyHomeDetailDTO;

import java.util.List;

public interface HomeService {

    StudyHomeDetailDTO findStudyHomeDetail(int userId, int studyId);
    List<ScheduleDdayDTO> findDDay(int userId, int studyId);
}

