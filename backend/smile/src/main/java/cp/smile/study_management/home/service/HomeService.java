package cp.smile.study_management.home.service;

import cp.smile.study_management.home.dto.response.StudyHomeDetailDTO;

public interface HomeService {

    StudyHomeDetailDTO findStudyHomeDetail(int userId, int studyId);
}
