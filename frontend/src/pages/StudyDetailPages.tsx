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
import { Link, useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ReactComponent as Reply } from "../assets/icon/Reply.svg";
import { ReactComponent as Crown } from "../assets/icon/Crown.svg";
import defaultStudyImg from "assets/img/card_photo_1.png";
import { theme } from "theme";
import {
  commentDeleteApi,
  commentUpdateApi,
  replyDeleteApi,
  replyUpdateApi,
  StudyDataApi,
  studyJoinApi,
  writeDetailCommentApi,
  writeDetailReplyApi,
} from "apis/StudyDetailApi";
import { InputProps } from "components/study-manage/StudyManageBoardDetail";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { UserIdState } from "atoms/UserInfoAtom";
import { LoginAlert } from "components/common/LoginAlert";

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
  box-shadow: 0 0 1.111vw 0.694vw ${(props) => props.theme.blackColorOpacity3};
  border-radius: 0.556vw;
  width: 22.083vw;
  height: 29.167vw;
  margin-right: 2.778vw;
  background-color: white;
  object-fit: contain;
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
  overflow-y: scroll;
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

const CommentTxt = styled.input<InputProps>`
  font-size: 0.972vw;
  width: 100%;
  border: none;
  outline: none;
  /* border: 1px solid ${(props) => props.theme.blackColorOpacity}; */
  padding: 0.417vw 1.111vw;
  border-radius: 3.472vw;
  border: ${(props) => (!props.editState ? "none" : `1px solid black`)};
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

export interface Data {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    id: number;
    name: string; //스터디 이름
    startDate: string; //스터디 시작 일자
    endDate: string; //스터디 종료 일자
    time: string; //스터디 시간
    imagePath: string; //스터디 대표 이미지
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
          imagePath: string; //프로필
          nickname: string; //댓글 작성자 닉네임
        };
        content: string; //댓글 내용
        replies: [
          //답글리스트
          {
            user: {
              id: number; //대댓글 작성자 식별자
              imagePath: string; //프로필
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
  const userId = useRecoilValue(UserIdState);

  const token = localStorage.getItem("kakao-token");
  // const [list, setList] = useState<studyDetailData[] | null>(null);

  const { id } = useParams<Params>();
  const { data: detailStudy, refetch } = useQuery<Data>(
    "detailStudy",
    async () => await StudyDataApi(id),
  );

  // 스터디 참여 하기=========================================================
  const history = useHistory();
  const onJoin = async () => {
    if (token !== null) {
      var decoded: any = jwt_decode(token);
    } else {
      console.log("none");
    }

    const data = {};

    await studyJoinApi(decoded?.userId, detailInfo?.result.id, data);

    history.push("");
  };

  // 댓글 관련==========================================================================
  // 댓글작성
  const [comment, setComment] = useState("");

  const writeComment = async () => {
    const data = {
      content: comment,
    };

    await writeDetailCommentApi(data, id);

    await setComment("");
    refetch();
  };

  // 대댓글 작성
  const [selectedId, setSelectedId] = useState(null);
  const openReplyInput = async (parentId: any) => {
    // 선택한 댓글에 해당하는 애만 답글창 열게 하기
    await setSelectedId(parentId);
  };

  const [reply, setReply] = useState<string>();
  const writeReply = async (parentId: any) => {
    const data = {
      content: reply,
    };

    await writeDetailReplyApi(data, parentId, id);
    await setSelectedId(null);
    refetch();
  };

  // 댓글 수정
  const [selectedUpdateId, setSelectedUpdateId] = useState(null);
  const [commentForUpdate, setCommentForUpdate] = useState<string>();
  const updateComment = (commentId: any, currentContent: string) => {
    setSelectedUpdateId(commentId);
    setCommentForUpdate(currentContent);
  };
  const onUpdateComment = async (commentId: any) => {
    const data = {
      content: commentForUpdate,
    };
    await commentUpdateApi(data, commentId, id);
    await setSelectedUpdateId(null);
    refetch();
  };

  // 댓글 삭제
  const deleteComment = async (commentId: any) => {
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await commentDeleteApi(commentId, id);
        await refetch();
        Swal.fire("삭제완료!", "", "success");
      }
    });
    // if (window.confirm("댓글을 삭제하시겠습니까?")) {
    //   await commentDeleteApi(commentId);
    //   await refetch();
    // }
  };

  // 대댓글 삭제
  const deleteReply = async (commentId: any, replyId: any) => {
    Swal.fire({
      title: "대댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await replyDeleteApi(commentId, replyId, id);
        await refetch();
        Swal.fire("삭제완료!", "", "success");
      }
    });

    // if (window.confirm("대댓글을 삭제하시겠습니까?")) {
    //   await replyDeleteApi(commentId, replyId);
    //   await refetch();
    // }
  };

  // 대댓글 수정
  const [selectedUpdateReplyId, setSelectedUpdateReplyId] = useState(null);
  const [replyForUpdate, setReplyForUpdate] = useState<string>();
  const updateReply = (replyId: any, currentContent: string) => {
    setSelectedUpdateReplyId(replyId);
    setReplyForUpdate(currentContent);
  };
  const onUpdateReply = async (commentId: any, replyId: any) => {
    const data = {
      content: replyForUpdate,
    };
    await replyUpdateApi(data, commentId, replyId, id);
    await setSelectedUpdateReplyId(null);
    refetch();
  };

  // 로그인 알람
  useEffect(() => {
    LoginAlert();
  }, []);

  const [detailInfo, setDetailInfo] = useState<Data>();
  useEffect(() => {
    async function stateSet() {
      await setDetailInfo(detailStudy);
    }
    stateSet();
  }, [detailStudy]);

  return (
    <Wrapper>
      <BlankSpace />
      <Text>
        <Icons.CaretLeft width="1.667vw" />
        <Link to={{ pathname: `/studies/search` }}>
          <p>목록으로</p>
        </Link>
      </Text>
      <Top>
        <TextBig>{detailInfo?.result.name}</TextBig>
        <Link to={{ pathname: `/studies/${detailInfo?.result.id}/home` }}>
          <Btn onClick={onJoin}>참여하기</Btn>
        </Link>
      </Top>
      <StudyDetail>
        <Card
          src={
            detailInfo?.result.imagePath.includes("/root")
              ? defaultStudyImg
              : detailInfo?.result.imagePath
          }
        />
        {/* <Card
          src={
            detailInfo?.result.imgPath.includes("/root")
              ? defaultStudyImg
              : detailInfo?.result.imgPath
          }
        /> */}
        {/* <Card src={detailInfo?.result.imgPath} id="item1" /> */}
        <TextBigBox>
          <TextSmallBox>
            <ProfileImg
              imgUrl={
                detailInfo?.result.leader.imagePath !== null &&
                detailInfo?.result.leader.imagePath !== "/root"
                  ? detailInfo?.result.leader.imagePath
                  : defaultprofileImg
              }
              width="5vw"
              height="5vw"
            />
            <p>{detailInfo?.result.leader.nickname}</p>
            <Crown fill={theme.mainColor} width="1.389vw" />
          </TextSmallBox>
          <TextSmallBox>
            <TextName>모집 유형 </TextName>
            <TextSmall>{detailInfo?.result.type.name}</TextSmall>
          </TextSmallBox>
          <TextSmallBox>
            <TextName>모집 인원 </TextName>
            <TextSmall>{detailInfo?.result.maxPerson}명</TextSmall>
          </TextSmallBox>
          <TextSmallBox>
            <TextName>예상 기간 </TextName>
            <TextSmall>
              {detailInfo?.result.startDate} ~ {detailInfo?.result.endDate}
            </TextSmall>
          </TextSmallBox>
          <TextSmallBox>
            <TextName>스터디 시간</TextName>
            <TextSmall>{detailInfo?.result.time}</TextSmall>
          </TextSmallBox>
        </TextBigBox>
      </StudyDetail>
      <Introduce>
        <p>스터디 소개</p>
        <Area>{detailInfo?.result.description}</Area>
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
        {detailInfo?.result.comments.map((el, index) => {
          return (
            <CommentBox key={index}>
              <CommentTop>
                <ProfileImg width="2.222vw" imgUrl={el.user.imagePath} />
                <WriterName>{el.user.nickname}</WriterName>
              </CommentTop>
              <CommentContent>
                {selectedUpdateId === el.id ? (
                  <CommentTxt
                    editState={true}
                    value={commentForUpdate}
                    onChange={(el) => setCommentForUpdate(el.target.value)}
                  ></CommentTxt>
                ) : (
                  <CommentTxt
                    value={el.content}
                    readOnly
                    editState={false}
                  ></CommentTxt>
                )}
              </CommentContent>
              <CommentFooter>
                <ComReplyBtn onClick={() => openReplyInput(el.id)}>
                  답변
                </ComReplyBtn>

                {userId === el.user.id ? (
                  <>
                    <p>·</p>
                    {selectedUpdateId !== el.id ? (
                      <ComUpdateBtn
                        onClick={() => updateComment(el.id, el.content)}
                      >
                        수정
                      </ComUpdateBtn>
                    ) : (
                      <ComUpdateBtn onClick={() => onUpdateComment(el.id)}>
                        수정
                      </ComUpdateBtn>
                    )}
                    <p>·</p>
                    <ComDeleteBtn onClick={() => deleteComment(el.id)}>
                      삭제
                    </ComDeleteBtn>
                  </>
                ) : null}
              </CommentFooter>
              {/* 답변 */}
              {el.replies.length > 0 &&
                el.replies.map((rep, index) => {
                  return (
                    <ReplyWrapper key={index}>
                      {/* <StyledReplyIcon fill={theme.mainColor} width="1.389vw" /> */}
                      <ReplySubWrapper>
                        <CommentTop>
                          <ProfileImg
                            width="2.222vw"
                            imgUrl={rep.user.imagePath}
                          />
                          <WriterName>{rep.user.nickname}</WriterName>
                        </CommentTop>
                        <CommentContent>
                          {selectedUpdateReplyId === rep.id ? (
                            <CommentTxt
                              editState={true}
                              value={replyForUpdate}
                              onChange={(el) =>
                                setReplyForUpdate(el.target.value)
                              }
                            ></CommentTxt>
                          ) : (
                            <CommentTxt
                              value={rep.content}
                              readOnly
                              editState={false}
                            ></CommentTxt>
                          )}
                        </CommentContent>
                        <CommentFooter>
                          {userId === rep.user.id ? (
                            <>
                              {selectedUpdateReplyId === rep.id ? (
                                <ComUpdateBtn
                                  onClick={() => onUpdateReply(el.id, rep.id)}
                                >
                                  수정
                                </ComUpdateBtn>
                              ) : (
                                <ComUpdateBtn
                                  onClick={() =>
                                    updateReply(rep.id, rep.content)
                                  }
                                >
                                  수정
                                </ComUpdateBtn>
                              )}
                              <p>·</p>
                              <ComDeleteBtn
                                onClick={() => deleteReply(el.id, rep.id)}
                              >
                                삭제
                              </ComDeleteBtn>
                            </>
                          ) : null}
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
