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
import { Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ReactComponent as Reply } from "../assets/icon/Reply.svg";
import { ReactComponent as Crown } from "../assets/icon/Crown.svg";
import { theme } from "theme";
import {
  writeDetailCommentApi,
  writeDetailReplyApi,
} from "apis/StudyDetailApi";

const BlankSpace = styled.div`
  height: 7.383vw;
`;

const Wrapper = styled.div`
  margin: 0 21.111vw;
  display: flex;
  flex-direction: column;
  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`;

const Top = styled.div`
  display: flex;
  flex: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.222vw;
`;
const Btn = styled.button`
  border-radius: 0.417vw;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;
  padding: 0.556vw 1.111vw;
  width: 8.667vw;
  height: 3.473vw;
  font-size: 1.111vw;
  font-weight: bold;
  box-shadow: 2.002px 2.002px 2.002px
    ${(props) => props.theme.blackColorOpacity4};
`;

const Card = styled.img`
  /* display: grid;
  grid-template-rows: 21.84vw 12.91vw; */
  /* border: 0.994px solid black; */
  box-shadow: 0 0 1.111vw 0.694vw ${(props) => props.theme.blackColorOpacity3};
  border-radius: 0.556vw;
  width: 22.083vw;
  height: 29.167vw;
  margin-right: 2.778vw;
`;

const Profile = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 3.472vw;
  margin-right: 3.472vw;
`;

const StudyDetail = styled.div`
  display: flex;
  margin-bottom: 3.889vw;
  flex-direction: row;
  padding-bottom: 3.889vw;
  border-bottom: 0.994px solid ${(props) => props.theme.blackColorOpacity4};
  justify-content: space-between;
  /* justify-content: flex-start; */
`;

const TextBig = styled.div`
  display: flex;
  align-items: center;
  /* font-size: 1.667vw; */
  font-size: 2.778vw;
  font-weight: bold;
  /* padding-bottom: 1.111vw; */
  margin-bottom: 1.667vw;
`;

const TextBigBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const TextSmallBox = styled.div`
  width: 400.997px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2.222vw;

  p {
    font-size: 1.389vw;
    font-weight: bold;
    margin: 0 1.111vw;
  }
`;

const Text = styled.div`
  font-size: 1.111vw;
  font-weight: bold;
  /* margin-bottom: 1.389vw; */
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    margin-left: 1.111vw;
  }
`;

const TextName = styled(Text)`
  width: 25%;
`;

const TextSmall = styled.div`
  margin-left: 3.472vw;
  font-size: 1.111vw;
  /* width: 99.994px; */
`;

const StudyData = styled.div``;

const Introduce = styled.div`
  margin-top: 1.667vw;
  margin-bottom: 3.889vw;
  padding: 0 1.667vw;

  p {
    font-size: 1.667vw;
    font-weight: bold;
  }
`;

const Area = styled.div`
  justify-content: center;
  /* border: 0.994px solid black; */
  background-color: #ededed;
  height: 20.25vw;
  width: 50.667vw;
  margin-bottom: 2vw;
  padding: 2vw 2vw;
`;

// 댓글
const CommentHeader = styled.div`
  font-size: 1.111vw;
  font-weight: bold;
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.111vw 0vw;
  justify-content: space-evenly;
`;

const TextInput = styled.input`
  width: 85%;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  padding: 0.417vw 1.111vw;
  border-radius: 3.472vw;
  font-size: 0.972vw;
`;

const WriteBtn = styled.button`
  border: none;
  padding: 0.347vw 0.972vw;
  cursor: pointer;
  border-radius: 0.278vw;
  background-color: ${(props) => props.theme.mainColor};
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  font-size: 0.972vw;
`;

const CommentList = styled.div`
  margin-top: 1.111vw;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.667vw 0;
`;

const CommentTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.556vw;

  p {
    color: ${(props) => props.theme.blackColorOpacity2};
    font-size: 0.833vw;
  }
`;

const WriterName = styled.div`
  padding-left: 1.111vw;
  font-size: 1.111vw;
  font-weight: bold;
  margin-right: 1.667vw;
`;

const CommentContent = styled.div`
  padding-left: 2.778vw;
  display: flex;
  flex-direction: row;
  line-height: 1.667vw;
  margin-bottom: 0.556vw;
`;

const CommentTxt = styled.input`
  font-size: 0.972vw;
  width: 100%;
  border: none;
  outline: none;
`;

const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-left: 2.222vw;
  p {
    margin: 0;
    color: #c0c0c0;
  }
`;

const ComUpdateBtn = styled.button`
  cursor: pointer;
  font-size: 0.833vw;
  background-color: transparent;
  border: none;
  color: #c0c0c0;
`;

const ComDeleteBtn = styled(ComUpdateBtn)`
  margin: 0;
`;

const ComReplyBtn = styled(ComDeleteBtn)``;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3.75vw;
  margin-top: 1.111vw;
  position: relative;
`;

const ReplySubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 1.111vw;
`;

const StyledReplyIcon = styled(Reply)`
  transform: rotate(180deg);
`;

const ReplyBox = styled.div`
  width: 100%;
  margin-left: 1.667vw;
  background-color: #efefef;
  box-shadow: 2px 2px 2px ${(props) => props.theme.blackColorOpacity};
  padding: 1.111vw;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-radius: 1.111vw;
  p {
    font-size: 1.111vw;
    font-weight: bold;
    margin: 0;
    margin-bottom: 0.972vw;
  }
`;

const ReplyInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ReplyInput = styled.input`
  width: 85%;
  margin-right: 1.111vw;
  border: 1px solid ${(props) => props.theme.blackColorOpacity};
  padding: 0.417vw 1.111vw;
  border-radius: 3.472vw;
  font-size: 0.972vw;
  height: auto;
`;

const ReplyBtn = styled(WriteBtn)``;

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
    description: string;
    type: {
      id: number; //스터디 유형 식별자
      name: string; //스터디 유형 이름
    };
    leader: {
      id: number;
      imagePath: null;
      nickname: string;
    };
    comments: [
      {
        id: number;
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
            id: number;
          },
        ];
      },
    ];
  };
}

type Params = {
  id: string;
};

function StudyDetailPages() {
  // const profileImgUrl = props.studyInfo.studyLeader.profileImageUrl;
  // const studyImgUrl = props.studyInfo.imageUrl;
  const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
  // const BASE_URL = `/be-api/studies`;

  const token = localStorage.getItem("kakao-token");
  // const [list, setList] = useState<studyDetailData[] | null>(null);

  const StudyDataApi = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYyMTMxMjcsImV4cCI6MTY3NjI5OTUyN30.pzeJeGfEAKGtMRBZBWgF8SiDXt34UpdcPZ7p3XG07XCUIiVioSDvbPymeXLPY2enQn1OOxxQ75VvX7hk6uWeNg`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error);
    }
  };
  const { id } = useParams<Params>();
  const { data: detailStudy, refetch } = useQuery<Data>("detailStudy", () =>
    StudyDataApi(id),
  );

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

  // var base64Payload = token?.split(".")[1];
  // if (base64Payload !== undefined) {
  //   var payload = Buffer.from(base64Payload, "base64");
  //   var result = JSON.parse(payload.toString());
  //   console.log("result", result);
  // }
  //token----------------------------

  if (token !== null) {
    var decoded: any = jwt_decode(token);
    // const decoded2: object = jwt_decode(token);
    console.log("decoded : ", decoded);
    console.log("decoded Id : ", decoded?.userId);
    // console.log("decoded Id: ", decoded);
  } else {
    console.log("none");
  }
  const studyJoinApi = async () => {
    await axios
      .post(
        `${BASE_URL}/users/${decoded?.userId}/studies/${detailStudy?.result.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(function (response) {
        // console.log(response.data);
        console.log("1");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 댓글 관련==========================================================================
  console.log("get : ", detailStudy);
  // 댓글작성
  const [comment, setComment] = useState("");

  const writeComment = async () => {
    const data = {
      content: comment,
    };

    await writeDetailCommentApi(data);

    setComment("");
    refetch();
  };

  // 대댓글 작성
  const [selectedId, setSelectedId] = useState(null);
  const openReplyInput = (parentId: any) => {
    // 선택한 댓글에 해당하는 애만 답글창 열게 하기
    setSelectedId(parentId);
  };

  const [reply, setReply] = useState<string>();
  const writeReply = async (parentId: any) => {
    const data = {
      content: reply,
    };

    writeDetailReplyApi(data, parentId);
    setSelectedId(null);
    refetch();
  };

  // 댓글 수정
  const updateComment = (commentId: any) => {};

  // 댓글 삭제
  const deleteComment = (commentId: any) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      // commentDeleteApi(boardId, commentId);
      // refetch();
    }
  };

  return (
    <Wrapper>
      <BlankSpace />
      <Text>
        <Icons.CaretLeft width="1.667vw" />
        <p>목록으로</p>
      </Text>
      <Top>
        <TextBig>{detailStudy?.result.name}</TextBig>
        <Link to={{ pathname: `/studies/${detailStudy?.result.id}/home` }}>
          <Btn onClick={studyJoinApi}>참여하기</Btn>
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
              width="5vw"
              height="5vw"
            />
            <p>{detailStudy?.result.leader.nickname}</p>
            <Crown fill={theme.mainColor} width="1.389vw" />
          </TextSmallBox>
          <TextSmallBox>
            <TextName>모집 유형 </TextName>
            <TextSmall>{detailStudy?.result.type.name}</TextSmall>
          </TextSmallBox>
          <TextSmallBox>
            <TextName>모집 인원 </TextName>
            <TextSmall>{detailStudy?.result.maxPerson}명</TextSmall>
          </TextSmallBox>
          <TextSmallBox>
            <TextName>예상 기간 </TextName>
            <TextSmall>
              {detailStudy?.result.startDate} ~ {detailStudy?.result.endDate}
            </TextSmall>
          </TextSmallBox>
          <TextSmallBox>
            <TextName>스터디 시간</TextName>
            <TextSmall>{detailStudy?.result.time}</TextSmall>
          </TextSmallBox>
        </TextBigBox>
      </StudyDetail>
      <Introduce>
        <p>스터디 소개</p>
        <Area>{detailStudy?.result.description}</Area>
      </Introduce>
      <CommentHeader>댓글</CommentHeader>
      <CommentInput>
        <TextInput
          value={comment}
          type="text"
          placeholder="댓글을 입력하세요."
          onChange={(el) => setComment(el.target.value)}
        />
        <WriteBtn onClick={writeComment}>작성</WriteBtn>
      </CommentInput>
      <CommentList>
        {detailStudy?.result.comments.map((el, index) => {
          return (
            <CommentBox key={index}>
              <CommentTop>
                <ProfileImg width="2.222vw" />
                <WriterName>{el.user.nickname}</WriterName>
              </CommentTop>
              <CommentContent>
                <CommentTxt value={el.content} readOnly></CommentTxt>
              </CommentContent>
              <CommentFooter>
                <ComReplyBtn onClick={() => openReplyInput(el.id)}>
                  답변
                </ComReplyBtn>
                <p>·</p>
                <ComUpdateBtn onClick={updateComment}>수정</ComUpdateBtn>
                <p>·</p>
                <ComDeleteBtn onClick={() => deleteComment(el.id)}>
                  삭제
                </ComDeleteBtn>
              </CommentFooter>
              {/* 답변 */}
              {el.replies.length > 0 &&
                el.replies.map((rep, index) => {
                  return (
                    <ReplyWrapper key={index}>
                      {/* <StyledReplyIcon fill={theme.mainColor} width="1.389vw" /> */}
                      <ReplySubWrapper>
                        <CommentTop>
                          <ProfileImg width="2.222vw" />
                          <WriterName>{rep.user.nickname}</WriterName>
                        </CommentTop>
                        <CommentContent>
                          <CommentTxt value={rep.content} readOnly></CommentTxt>
                        </CommentContent>
                        <CommentFooter>
                          <ComUpdateBtn onClick={updateComment}>
                            수정
                          </ComUpdateBtn>
                          <p>·</p>
                          <ComDeleteBtn onClick={() => deleteComment(el.id)}>
                            삭제
                          </ComDeleteBtn>
                        </CommentFooter>
                      </ReplySubWrapper>
                    </ReplyWrapper>
                  );
                })}
              {selectedId === el.id ? (
                <ReplyWrapper>
                  <StyledReplyIcon fill={theme.mainColor} width="1.389vw" />
                  <ReplyBox>
                    <p>답글</p>
                    <ReplyInputBox>
                      <ReplyInput
                        placeholder="답변을 입력하세요."
                        onChange={(el) => setReply(el.target.value)}
                      />
                      <ReplyBtn onClick={() => writeReply(el.id)}>
                        작성
                      </ReplyBtn>
                    </ReplyInputBox>
                  </ReplyBox>
                </ReplyWrapper>
              ) : null}
            </CommentBox>
          );
        })}
      </CommentList>
    </Wrapper>
  );
}

export default StudyDetailPages;
