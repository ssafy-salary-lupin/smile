package cp.smile.study_management.home.service;

import cp.smile.study_management.home.dto.response.ScheduleDdayDTO;

import java.util.List;

public interface HomeService {


    List<ScheduleDdayDTO> findDDay(int userId, int studyId);
}
