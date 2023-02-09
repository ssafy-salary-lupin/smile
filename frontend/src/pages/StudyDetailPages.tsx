import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ButtonBasic from "../components/common/ButtonBasic";
// import Card from "../components/common/Card";
import ProfileImg from "../components/common/ProfileImg";
// import introductionImg1 from "../assets/img/introduction_img1.png";
import introductionImg1 from "assets/img/introduction_img1.png";

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
  margin-bottom: 3.333vw;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Btn = styled(ButtonBasic)``;

const Card = styled.img`
  display: grid;
  grid-template-rows: 21.84vw 12.91vw;
  border-radius: 1.12vw;
  width: 22.083vw;
  height: 29.167vw;
  margin-right: 2.778vw;
`;

const StudyDetail = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const TextBig = styled.div``;

const TextBigBox = styled.div``;

const TextSmallBox = styled.div`
  width: 317.995px;
  display: flex;
`;

const Text = styled.div`
  font-size: 12;
  font-weight: bold;
`;

const TextSmall = styled.div`
  /* height: 29.167vw; */
`;

const imgBox = styled.img``;

const StudyData = styled.div``;

const Introduce = styled.div``;

// interface studyDetailData {
//   studyInfo: {
//     id: 1;
//     name: "study name"; //스터디 이름
//     startDate: "2023.01.15"; //스터디 시작 일자
//     endDatee: "2023.01.19"; //스터디 종료 일자
//     time: "시간 미정"; //스터디 시간
//     imgPath: "/test/test/test"; //스터디 대표 이미지
//     currrentPerson: "4"; //스터디 현재 가입 인원
//     maxPerson: "6"; //스터디 최대 가입 인원
//     viewCount: "50"; //스터디 조회수
//     type: {
//       id: 1; //스터디 유형 식별자
//       name: "asdf"; //스터디 유형 이름
//     };
//     comments: [
//       {
//         user: {
//           id: 1; //댓글 작성자 식별자
//           imgPath: "/root"; //프로필
//           nickname: "adsf1"; //댓글 작성자 닉네임
//         };
//         content: "test content"; //댓글 내용
//         replies: [
//           //답글리스트
//           {
//             user: {
//               id: 1; //대댓글 작성자 식별자
//               imgPath: "/root"; //프로필
//               nickname: "adsf"; //대댓글 작성자 닉네임
//             };
//             content: "test reply content"; //대댓글 내용
//           },
//         ];
//       },
//     ];
//   };
// }

function StudyDetailPages() {
  return (
    <div>
      <Wrapper>
        <BlankSpace />
        <Text>목록으로</Text>
        <Top>
          <TextBig>OO 자격증 스터디</TextBig>
          <button>참여하기</button>
        </Top>
        <StudyDetail>
          <Card src={introductionImg1} id="item1" />
          <TextBigBox>
            <TextSmallBox>
              <TextBig>이싸피</TextBig>
            </TextSmallBox>
            <TextSmallBox>
              <Text>모집 유형</Text>
              <TextSmall>자격증 스터디</TextSmall>
            </TextSmallBox>
            <TextSmallBox>
              <Text>모집 인원</Text>
              <TextSmall>6명</TextSmall>
            </TextSmallBox>
            <TextSmallBox>
              <Text>예상 기간</Text>
              <TextSmall></TextSmall>
            </TextSmallBox>
            <TextSmallBox>
              <Text>모집 유형</Text>
              <TextSmall>자격증 스터디</TextSmall>
            </TextSmallBox>
          </TextBigBox>
        </StudyDetail>
        <hr />
        <Introduce>
          <span>스터디 소개</span>
        </Introduce>

        <span>댓글</span>
      </Wrapper>
    </div>
  );
}

export default StudyDetailPages;
