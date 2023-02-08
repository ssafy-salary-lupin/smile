import VideoRoomComponent from "components/video-meeting/VideoRoomComponent";
import { useParams } from "react-router-dom";

interface Iparams {
  studyId: string;
}

function VideoMeetingPages() {
  const studyId = useParams<Iparams>().studyId;
  console.log(studyId);
  return <VideoRoomComponent sessionName={studyId} />;
}

export default VideoMeetingPages;
