import React, { Component, useState } from "react";
import "./ToolbarComponent.css";
import "./CustomToolbarComponent.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import Videocam from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
import PictureInPicture from "@mui/icons-material/PictureInPicture";
import ScreenShare from "@mui/icons-material/ScreenShare";
import StopScreenShare from "@mui/icons-material/StopScreenShare";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";

import IconButton from "@mui/material/IconButton";
import logo from "assets/img/smile_black.png";

import * as DuotonIcons from "components/common/DuotonIcons";
import styled from "styled-components";

const ToolbarContainer = styled.div`
  /* color: #ffffff; */
  height: 100px;
  width: 100vw;
  /* padding: 0 14px 0 0; */
  /* z-index: 999999; */
  /* min-width: 400px !important; */
`;

const IconContainer = styled.div`
  width: 3.889vw;
  height: 3.889vw;
  border-radius: 50px;
  background-color: #393e46;
`;

export default function CustomToolbarComponent(props) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    props.toggleFullscreen();
  };

  const mySessionId = props.sessionId;
  const localUser = props.user;
  return (
    <ToolbarContainer id="toolbar">
      <IconContainer>
        <DuotonIcons.VideoCamera fill="none" stroke="#F5C82E" />
      </IconContainer>
    </ToolbarContainer>
  );
}
