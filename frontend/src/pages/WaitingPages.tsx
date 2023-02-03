import styled from "styled-components";
import * as Icons from "../components/common/Icons";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Container = styled.div`
  background-color: #1f1e1e;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 640px;
  height: 480px;
`;

function WaitingPages() {
  const [isShowVideo, setIsShowVideo] = useState<boolean | never>(false);
  const videoElement = useRef<Webcam>(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const startCam = () => {
    setIsShowVideo(true);
  };

  const stopCam = () => {
    console.log(videoElement.current);
    if (videoElement.current !== null) {
      const stream = videoElement.current.stream;
      if (stream !== null) {
        const tracks = stream.getTracks();
        tracks.forEach((track: any) => track.stop());
        setIsShowVideo(false);
      }
    }
  };

  return (
    <Container>
      {isShowVideo && (
        <Webcam
          audio={false}
          ref={videoElement}
          videoConstraints={videoConstraints}
        />
      )}
      <button onClick={startCam}>Start Video</button>
      <button onClick={stopCam}>Stop Video</button>
    </Container>
  );
}
export default WaitingPages;
