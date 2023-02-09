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

    public static StudyMeetingStatus valueOf(int code) {
        for (StudyMeetingStatus status : StudyMeetingStatus.values()) {
            if (status.getCode() ==  code) {
                return status;
            }
        }
        return null;
    }
}
