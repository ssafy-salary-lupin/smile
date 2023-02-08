package cp.smile.entity.study_management;

public enum StudyMeetingStatus {

    end(0),
    proceeding(1),
    reservation(2),
    ;

    private final int code;

    StudyMeetingStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
