import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, useState } from "react";
import ChatComponent from "./chat/ChatComponent";
import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import StreamComponent from "./stream/StreamComponent";
import "./VideoRoomComponent.css";

import OpenViduLayout from "layout/openvidu-layout";
import UserModel from "models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";
import { dE } from "@fullcalendar/core/internal-common";

let localUser = new UserModel();
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://i8b205.p.ssafy.io:5000/";

function VideoRoomComponent(props) {
  let hasBeenUpdated = false;
  let layout = new OpenViduLayout();
  let sessionName = props.sessionName ? props.sessionName : "SessionA";
  let userName = props.user
    ? props.user
    : "OpenVidu_User" + Math.floor(Math.random() * 100);
  let remotes = [];
  let localUserAccessAllowed = false;

  const [mySessionId, setMySessionId] = useState(sessionName);
  const [myUserName, setMyUserName] = useState(userName);
  const [session, setSessionId] = useState(undefined);
  const [localUser, setLocalUser] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [chatDisplay, setChatDisplay] = useState(none);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  useEffect(() => {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };
    layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions,
    );
    onbeforeunload("beforeunload", this.onbeforeunload);
    updateLayout("resize", this.updateLayout);
    checkSize("resize", this.checkSize);
    joinSession();
    return () => {
      {
        onbeforeunload("beforeunload", this.onbeforeunload);
        updateLayout("resize", this.updateLayout);
        checkSize("resize", this.checkSize);
        leaveSession();
      }
    };
  }, []);
}

export default VideoRoomComponent;

