package cp.smile.user.controller;

import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.entity.user.User;
import cp.smile.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

    @GetMapping("/users/{userId}")
    public DataResponse<User> findOne(@PathVariable(required = true) int userId){

        int currentId = 1;

        //인증 로직 - 자기 자신 정보를 호출하는게 맞는지

        //회원 조회 로직


        System.out.println("check1");
        return responseService.getDataResponse(userService.findOne(userId));
    }

    @GetMapping("/users")
    public DataResponse<List<User>> findAll(){
        System.out.println("check2");
        System.out.println(userService.findUsers().toString());
        return responseService.getDataResponse(userService.findUsers());
    }

    @PostMapping("/users")
    public CommonResponse save(@RequestBody User user){
        System.out.println("test");
        System.out.println(user.toString());
        userService.join(user);

        return responseService.getSuccessResponse();
    }

}
