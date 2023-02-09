import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ButtonBasic from "../components/common/ButtonBasic";
// import Card from "../components/common/Card";
import ProfileImg from "../components/common/ProfileImg";
// import introductionImg1 from "../assets/img/introduction_img1.png";
import introductionImg1 from "assets/img/introduction_img1.png";
import defaultprofileImg from "assets/img/userDefaultImg.png";
import * as Icons from "../components/common/Icons";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { aW } from "@fullcalendar/core/internal-common";

const BlankSpace = styled.div`
  height: 7.383vw;
`;

const Wrapper = styled.div`
  /* display: table; */
  /* justify-content: center; */
  /* width: 50vw; */
  margin: 0 auto;
  height: 103.472vw;
  width: 55.556vw;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Btn = styled.button`
  /* margin: 0 32px; */
  border-radius: 0.347vw;
  border: none;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border-radius: 4px;
  padding: 0.556vw 1.111vw;
  margin: 1.111vw 1.667vw 0vw 0vw;
  width: 8.667vw;
  height: 3.473vw;
  font-size: 1.111vw;
`;

const Card = styled.img`
  display: grid;
  grid-template-rows: 21.84vw 12.91vw;
  border-radius: 1.12vw;
  width: 22.083vw;
  height: 29.167vw;
  margin-right: 2.778vw;
`;

const Profile = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50px;
  margin-right: 50px;
`;

const StudyDetail = styled.div`
  display: flex;
  margin-bottom: 24px;
  /* justify-content: flex-start; */
`;

const TextBig = styled.div`
  display: flex;
  align-items: center;
  /* font-size: 1.667vw; */
  font-size: 32;
  font-weight: bold;
  padding-bottom: 1.111vw;
`;

const TextBigBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const TextSmallBox = styled.div`
  width: 317.995px;
  display: flex;
  margin-bottom: 1.111vw;
`;

const Text = styled.div`
  font-size: 12;
  font-weight: bold;
  margin-bottom: 1.389vw;
`;

const TextSmall = styled.div`
  margin-left: 3.472vw;
`;

const StudyData = styled.div``;

const Introduce = styled.div`
  margin-top: 24px;
`;

const Area = styled.div`
  justify-content: center;
  /* border: 1px solid black; */
  background-color: #ededed;
  height: 20.25vw;
  width: 50.667vw;
  margin-bottom: 2vw;
`;
interface Data {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    id: number;
    name: string; //스터디 이름
    startDate: string; //스터디 시작 일자
    endDate: string; //스터디 종료 일자
    time: string; //스터디 시간
    imgPath: string; //스터디 대표 이미지
    currrentPerson: number; //스터디 현재 가입 인원
    maxPerson: number; //스터디 최대 가입 인원
    viewCount: number; //스터디 조회수
    type: {
      id: number; //스터디 유형 식별자
      name: string; //스터디 유형 이름
    };
    comments: [
      {
        user: {
          id: number; //댓글 작성자 식별자
          imgPath: string; //프로필
          nickname: string; //댓글 작성자 닉네임
        };
        content: string; //댓글 내용
        replies: [
          //답글리스트
          {
            user: {
              id: number; //대댓글 작성자 식별자
              imgPath: string; //프로필
              nickname: string; //대댓글 작성자 닉네임
            };
            content: string; //대댓글 내용
          },
        ];
      },
    ];
  };
}

function StudyDetailPages() {
  // const profileImgUrl = props.studyInfo.studyLeader.profileImageUrl;
  // const studyImgUrl = props.studyInfo.imageUrl;
  const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;

  const token = localStorage.getItem("kakao-token");
  // const [list, setList] = useState<studyDetailData[] | null>(null);

  const StudyDataApi = async () => {
    console.log("실행");

    try {
      const response = await fetch(`${BASE_URL}/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log("data : ", response);
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error);
    }

    // console.log("받아온 data : ", response);
  };
  const { data: detailStudy } = useQuery<Data>("StudyDataApi", () =>
    StudyDataApi(),
  );
  console.log("detailStudy", detailStudy);

  const formData = new FormData();
  //-----------------------------------------------\
  //-----------------------------------------------
  // 여기부터 스터디가입 post
  // const [userid, setUserid] = useState<number>(0);
  // const [usernickname, setUsernickname] = useState("");
  // const [useremail, setUseremail] = useState("");
  // const [userimg, setUserimg] = useState("");
  // const [userdeleted, setUserdeleted] = useState<number>(0);

  // const data = {
  //   id: userid, // 유저 식별자
  //   nickname: usernickname, // 닉네임
  //   email: useremail, // 이메일
  //   imagePath: userimg, // 프로필 이미지
  //   isDeleted: userdeleted,
  // };
  // console.log("TTTTTT");

  var base64Payload = token?.split(".")[1];
  if (base64Payload !== undefined) {
    var payload = Buffer.from(base64Payload, "base64");
    var result = JSON.parse(payload.toString());
    console.log("result", result);
  }

  const studyJoinApi = async () => {
    await axios
      .post(`${BASE_URL}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const data = det;
  return (
    <div>
      <Wrapper>
        <BlankSpace />
        <Text>
          <Icons.CaretLeft />
          {/* <arrowl /> */}
          목록으로
        </Text>
        <Top>
          <TextBig>{detailStudy?.result.name}</TextBig>
          <Link to={{ pathname: `/studies/1` }}>
            <Btn color="#F5C82E">참여하기</Btn>
          </Link>
        </Top>
        <StudyDetail>
          <Card src={detailStudy?.result.imgPath} id="item1" />
          <TextBigBox>
            <TextSmallBox>
              <ProfileImg
                imgUrl={
                  detailStudy?.result.imgPath !== "/root"
                    ? detailStudy?.result.imgPath
                    : defaultprofileImg
                }
                width="48.379px"
                height="48.379px"
              />
              {/* <TextBig>{detailStudy?.result.}</TextBig> */}
            </TextSmallBox>
            <TextSmallBox>
              <Text>모집 유형 </Text>
              <TextSmall>{detailStudy?.result.type.name}</TextSmall>
            </TextSmallBox>
            <TextSmallBox>
              <Text>모집 인원 </Text>
              <TextSmall>{detailStudy?.result.maxPerson}명</TextSmall>
            </TextSmallBox>
            <TextSmallBox>
              <Text>예상 기간 </Text>
              <TextSmall>
                {detailStudy?.result.startDate} ~ {detailStudy?.result.endDate}
              </TextSmall>
            </TextSmallBox>
            <TextSmallBox>
              <Text>스터디 시간</Text>
              <TextSmall>{detailStudy?.result.time}</TextSmall>
            </TextSmallBox>
          </TextBigBox>
        </StudyDetail>
        <hr />
        <Introduce>
          <Text>스터디 소개</Text>
          <Area></Area>
        </Introduce>
        <Text>댓글</Text>
      </Wrapper>
    </div>
  );
}

export default StudyDetailPages;
