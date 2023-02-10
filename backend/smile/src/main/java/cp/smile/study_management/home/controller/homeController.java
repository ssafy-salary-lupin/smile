package cp.smile.study_management.home.controller;


import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.study_management.home.dto.response.ScheduleDdayDTO;
import cp.smile.study_management.home.service.HomeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static cp.smile.config.response.CustomSuccessStatus.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;
    private final ResponseService responseService;




    @GetMapping("/studies/{studyId}/home/d-day")
    public DataResponse<List<ScheduleDdayDTO>> findDday(
            @PathVariable int studyId,
            @AuthenticationPrincipal CustomOAuth2User oAuth2User
    ){

        int userId = oAuth2User.getUserId();
        List<ScheduleDdayDTO> scheduleDdayDTOS = homeService.findDDay(userId, studyId);

        if(scheduleDdayDTOS.isEmpty()) return responseService.getDataResponse(scheduleDdayDTOS,RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(scheduleDdayDTOS,RESPONSE_SUCCESS);

    }

}
