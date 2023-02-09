package cp.smile.config.response.exception;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 커스텀 예외의 각종 상태를 저장
 */
@Getter
@RequiredArgsConstructor
public enum CustomExceptionStatus {

    /**
     * request 오류 정의
     */

    /*common error*/
    REQUEST_ERROR(false, 400, "요청을 확인해주세요."),
    //EMPTY_JWT(false, 401, "JWT를 입력해주세요."),
    INVALID_JWT(false, 401, "유효하지 않은 JWT입니다."),
    //INVALID_USER_JWT(false,403,"권한이 없는 유저의 접근입니다."),
    //NOT_AUTHENTICATED_ACCOUNT(false, 403, "로그인이 필요합니다."),


    /*user 관련*/
    ACCOUNT_NOT_FOUND(false, 401, "유저를 찾을 수 없습니다."),
    ACCOUNT_NOT_VALID(false, 401, "유효한 사용자가 아닙니다."),

    /*[post] user관련*/
    USERS_EXISTS_EMAIL(false,409,"중복된 이메일입니다."),
    USERS_EXISTS_NICKNAME(false,409,"중복된 닉네임입니다."),

    /**
     * response 오류 정의
     */
    USER_NOT_ACCESS_STUDY(false,403,"스터디에 가입된 사용자가 아닙니다."),
    USER_NOT_STUDY_LEADER(false, 403, "스터디 장만 접근이 가능합니다."),



    /*스터디 일반 관련*/

    NOT_FOUND_STUDY(false,404, "스터디를 찾을 수 없습니다."),

    /*스터디 게시판 관련*/
    NOT_FOUND_STUDY_BOARD(false, 404, "해당 게시글을 찾을 수 없습니다."),
    NOT_FOUND_STUDY_TYPE(false, 404, "올바르지 않은 스터디 유형입니다."),
    NOT_FOUND_CHAT_ROOM(false, 404, "해당 채팅방을 찾을 수 없습니다."),

    FILE_SAVE_FAIL(false,500,"파일 저장에 실패했습니다."),

    NOT_FOUND_SCHEDULE(false,404, "일정을 찾을 수 없습니다."),
    NOT_FOUND_SCHEDULE_TYPE(false, 404, "올바르지 않은 일정 유형입니다."),

    NOT_FOUND_LOGIN_PROVIDER(false,404, "올바르지 않은 로그인 제공자 유형입니다."),

    /*화상회의 예외*/
    STUDY_EXISTS_MEETING(false, 409,"해당 스터디에 이미 화상회의가 생성되어있습니다."),
    NOT_FOUND_MEETING_SESSION(false,404,"존재하지 않는 세션입니다."),
    OVER_MAX_SIZE_PERSON(false,429, "최대 입장 인원을 초과하였습니다."),

    NOT_FOUND_MEETING(false,404,"해당 미팅정보가 없습니다."),
    NOT_FOUND_MEETING_TYPE(false, 404, "해당 미팅 유형이 없습니다."),

    /*댓글*/
    NOT_FOUND_COMMENT(false,404,"존재하지 않는 댓글입니다."),


    ;
    private final Boolean isSuccess;

    private final int code;

    private final String message;
}
