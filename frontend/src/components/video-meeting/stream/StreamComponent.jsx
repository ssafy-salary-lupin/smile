<<<<<<< HEAD
import React, { Component, useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";

import MicOff from "@mui/icons-material/MicOff";
import VideocamOff from "@mui/icons-material/VideocamOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import HighlightOff from "@mui/icons-material/HighlightOff";
import FormHelperText from "@mui/material/FormHelperText";

import styled from "styled-components";

const Nickname = styled.div`
  background: rgba(58, 64, 74, 0.651);
  padding: 5px !important;
  /* margin: 25px 25px; */
  position: absolute;
  left: 25px;
  top: 25px;
  z-index: 999;
  color: #ffffff;
`;

// StreamComponent: 스트림된 요소들을 컨트롤하는 요소들을 담은 컴포넌트
export default function StreamComponent(props) {
  const [nickname, setNickname] = useState(props.user.getNickname());
  const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (event) => {
    setNickname(event.target.value);
    event.preventDefault();
  };

  const toggleNicknameForm = () => {
    if (props.user.isLocal()) {
      setShowForm(!showForm);
    }
  };

  // toggleSound: 사운드를 뮤트하거나 풀 수 있는 토글 버튼 함수
  const toggleSound = () => {
    setMutedSound(!mutedSound);
  };

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      console.log(nickname);
      if (nickname.length >= 3 && nickname.length <= 20) {
        props.handleNickname(nickname);
        toggleNicknameForm();
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  };

  return (
    <div className="OT_widget-container">
      {/* 닉네임 부분 */}
      <Nickname>
        <span>{props.user.getNickname()}</span>
      </Nickname>
      {/* 여기부터 동영상 */}
      {props.user !== undefined &&
      props.user.getStreamManager() !== undefined ? (
        <div className="streamComponent">
          <OvVideoComponent user={props.user} mutedSound={mutedSound} />
          <div id="statusIcons">
            {!props.user.isVideoActive() ? (
              <div id="camIcon">
                <VideocamOff id="statusCam" />
              </div>
            ) : null}

            {!props.user.isAudioActive() ? (
              <div id="micIcon">
                <MicOff id="statusMic" />
              </div>
            ) : null}
          </div>
          <div>
            {!props.user.isLocal() && (
              <IconButton id="volumeButton" onClick={toggleSound}>
                {mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
              </IconButton>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
=======
import React, { Component, useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";

import MicOff from "@mui/icons-material/MicOff";
import VideocamOff from "@mui/icons-material/VideocamOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import HighlightOff from "@mui/icons-material/HighlightOff";
import FormHelperText from "@mui/material/FormHelperText";

import styled from "styled-components";

const Nickname = styled.div`
  background: rgba(58, 64, 74, 0.651);
  padding: 5px !important;
  /* margin: 25px 25px; */
  position: absolute;
  left: 25px;
  top: 25px;
  z-index: 999;
  color: #ffffff;
`;

// StreamComponent: 스트림된 요소들을 컨트롤하는 요소들을 담은 컴포넌트
export default function StreamComponent(props) {
  const [nickname, setNickname] = useState(props.user.getNickname());
  const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (event) => {
    setNickname(event.target.value);
    event.preventDefault();
  };

  const toggleNicknameForm = () => {
    if (props.user.isLocal()) {
      setShowForm(!showForm);
    }
  };

  // toggleSound: 사운드를 뮤트하거나 풀 수 있는 토글 버튼 함수
  const toggleSound = () => {
    setMutedSound(!mutedSound);
  };

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      console.log(nickname);
      if (nickname.length >= 3 && nickname.length <= 20) {
        props.handleNickname(nickname);
        toggleNicknameForm();
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  };

  return (
    <div className="OT_widget-container">
      {/* 닉네임 부분 */}
      <Nickname>
        <span>{props.user.getNickname()}</span>
      </Nickname>
      {/* 여기부터 동영상 */}
      {props.user !== undefined &&
      props.user.getStreamManager() !== undefined ? (
        <div className="streamComponent">
          <OvVideoComponent user={props.user} mutedSound={mutedSound} />
          <div id="statusIcons">
            {!props.user.isVideoActive() ? (
              <div id="camIcon">
                <VideocamOff id="statusCam" />
              </div>
            ) : null}

            {!props.user.isAudioActive() ? (
              <div id="micIcon">
                <MicOff id="statusMic" />
              </div>
            ) : null}
          </div>
          <div>
            {!props.user.isLocal() && (
              <IconButton id="volumeButton" onClick={toggleSound}>
                {mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
              </IconButton>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
