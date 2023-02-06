import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./DialogExtension.css";

// DialogExtensionComponent: 익스텐션 설치 알림 컴포넌트
export default class DialogExtensionComponent extends Component {
  constructor(props) {
    super(props);
    this.openviduExtensionUrl =
      "https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold";
    // isInstalled: boolean;

    this.state = {
      isInstalled: false,
    };
    this.goToChromePage = this.goToChromePage.bind(this);
    this.onNoClick = this.onNoClick.bind(this);
    this.refreshBrowser = this.refreshBrowser.bind(this);
  }
  // componentWillReceiveProps: Props 이후에 동작하는 리액트 컴포넌트 생명주기함수
  componentWillReceiveProps(props) {}

  // componentDidMount: 컴포넌트가 마운트 된 이후에 동작하는 리액트 컴포넌트 생명주기함수
  componentDidMount() {}

  // onNoClick?: 클릭 취소 함수
  onNoClick() {
    // this.cancel.emit();
    this.props.cancelClicked();
  }

  // goToChromePage: 크롬 익스텐션 설치 페이지로 이동
  goToChromePage() {
    window.open(this.openviduExtensionUrl);
    this.setState({ isInstalled: true });
  }

  // refreshBrowser: 브라우저 재시작 함수
  refreshBrowser() {
    window.location.reload();
  }

  // render: 렌더링을 담당하는 함수
  render() {
    return (
      <div>
        {this.props && this.props.showDialog ? (
          <div id="dialogExtension">
            <Card id="card">
              <CardContent>
                <Typography color="textSecondary">Hello</Typography>
                <Typography color="textSecondary">
                  You need install this chrome extension and refresh the browser
                  for can share your screen.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.onNoClick}>
                  Cancel
                </Button>

                <Button size="small" onClick={this.goToChromePage}>
                  Install
                </Button>
                {this.state.isInstalled ? (
                  <Button size="small" onClick={this.refreshBrowser}>
                    Refresh
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </div>
        ) : null}
      </div>
    );
  }
}
