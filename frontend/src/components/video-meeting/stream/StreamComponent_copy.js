<<<<<<< HEAD
import React, { Component } from "react";
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

// import styled from "styled-components";

// StreamComponent: 스트림된 요소들을 컨트롤하는 요소들을 담은 컴포넌트
export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  // toggleSound: 사운드를 뮤트하거나 풀 수 있는 토글 버튼 함수
  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      console.log(this.state.nickname);
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    return (
      <div className="OT_widget-container">
        {/* 닉네임 부분 */}
        <div className="pointer nickname">
          {this.state.showForm ? (
            <FormControl id="nicknameForm">
              {/* <IconButton
                color="inherit"
                id="closeButton"
                onClick={this.toggleNicknameForm}
              ></IconButton>
              <InputLabel htmlFor="name-simple" id="label">
                Nickname
              </InputLabel>
              <Input
                color="inherit"
                id="input"
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                required
              />
              {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                <FormHelperText id="name-error-text">
                  Nickname is too short!
                </FormHelperText>
              )}
              {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                <FormHelperText id="name-error-text">
                  Nickname is too long!
                </FormHelperText>
              )} */}
            </FormControl>
          ) : (
            <div onClick={this.toggleNicknameForm}>
              <span>{this.props.user.getNickname()}</span>
              {this.props.user.isLocal() && <span id=""> (edit)</span>}
            </div>
          )}
        </div>
        {/* 여기부터 동영상 */}
        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
=======
import React, { Component } from "react";
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

// import styled from "styled-components";

// StreamComponent: 스트림된 요소들을 컨트롤하는 요소들을 담은 컴포넌트
export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  // toggleSound: 사운드를 뮤트하거나 풀 수 있는 토글 버튼 함수
  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      console.log(this.state.nickname);
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    return (
      <div className="OT_widget-container">
        {/* 닉네임 부분 */}
        <div className="pointer nickname">
          {this.state.showForm ? (
            <FormControl id="nicknameForm">
              {/* <IconButton
                color="inherit"
                id="closeButton"
                onClick={this.toggleNicknameForm}
              ></IconButton>
              <InputLabel htmlFor="name-simple" id="label">
                Nickname
              </InputLabel>
              <Input
                color="inherit"
                id="input"
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                required
              />
              {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                <FormHelperText id="name-error-text">
                  Nickname is too short!
                </FormHelperText>
              )}
              {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                <FormHelperText id="name-error-text">
                  Nickname is too long!
                </FormHelperText>
              )} */}
            </FormControl>
          ) : (
            <div onClick={this.toggleNicknameForm}>
              <span>{this.props.user.getNickname()}</span>
              {this.props.user.isLocal() && <span id=""> (edit)</span>}
            </div>
          )}
        </div>
        {/* 여기부터 동영상 */}
        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
