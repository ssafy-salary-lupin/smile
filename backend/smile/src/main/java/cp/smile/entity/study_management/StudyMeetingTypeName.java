package cp.smile.entity.study_management;

import lombok.Getter;

@Getter
public enum StudyMeetingTypeName {
    일반(1), 면접(2),
    ;

    private final int id;

    StudyMeetingTypeName(int id) {
        this.id = id;
    }

    public static StudyMeetingTypeName valueOf(int id) {
        for (StudyMeetingTypeName smtn : StudyMeetingTypeName.values()) {
            if (smtn.id == id) {
                return smtn;
            }
        }
        return null;
    }
}
