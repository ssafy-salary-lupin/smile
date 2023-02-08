package cp.smile.study_management.meeting.dto.request;

import io.openvidu.java.client.KurentoOptions;
import io.openvidu.java.client.OpenViduRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class AttendRequestDTO {

    private String data;
    private OpenViduRole role;
    private KurentoOptions kurentoOptions;

    @Getter @Setter
    @NoArgsConstructor
    private static class KurentoOptions {
        private int videoMaxRecvBandwidth;
        private int videoMinRecvBandwidth;
        private int videoMaxSendBandwidth;
        private int videoMinSendBandwidth;
        private String[] allowedFilters;
    }

    public Map<String, Object> toMap() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("data", data);
        map.put("record", false);
        map.put("role", role);

        if (kurentoOptions != null) {
            io.openvidu.java.client.KurentoOptions options = new io.openvidu.java.client.KurentoOptions.Builder()
                    .videoMaxRecvBandwidth(kurentoOptions.videoMaxRecvBandwidth)
                    .videoMinRecvBandwidth(kurentoOptions.videoMinRecvBandwidth)
                    .videoMaxSendBandwidth(kurentoOptions.videoMaxSendBandwidth)
                    .videoMinSendBandwidth(kurentoOptions.videoMinSendBandwidth)
                    .allowedFilters(kurentoOptions.allowedFilters)
                    .build();

            map.put("kurentoOptions", options);
        }

        return map;
    }
}
