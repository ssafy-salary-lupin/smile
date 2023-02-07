import React, { Component } from "react";
import "./StreamComponent.css";
import styled from "styled-components";

const Personal = styled.video`
  padding: 25px 25px 25px 25px;
`;

// OvVideoComponent: 비디오 컴포넌트 관련 함수
export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  // componentDidMount: 해당 컴포넌트가 마운트되고 나서 user의 getStreamManager에 비디오 요소를 넣는 리액트 컴포넌트 생명주기함수
  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log("PROPS: ", this.props);
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        "signal:userChanged",
        (event) => {
          const data = JSON.parse(event.data);
          if (data.isScreenShareActive !== undefined) {
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        },
      );
    }
  }
  // componentDidUpdate: 컴포넌트가 업데이트 된 이후에 user의 getStreamManager에 비디오 요소를 넣는 리액트 컴포넌트 생명주기함수1
  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }
  // render: 렌더링을 도와주는 함수
  render() {
    return (
      <Personal
        autoPlay={true}
        id={"video-" + this.props.user.getStreamManager().stream.streamId}
        ref={this.videoRef}
        muted={this.props.mutedSound}
      />
    );
  }
}
