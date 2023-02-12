import styled from "styled-components";
// import ProfileImg from "../components/common/ProfileImg";
import ProfileImg from "../common/ProfileImg"
import defaultprofileImg from "assets/img/userDefaultImg.png";
import chatImg from "../../assets/img/chat_icon.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const Wrapper = styled.div`
  margin: 3.889vw 21.111vw;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.blackColor};
  }
`;

const UpContainer = styled.div`
display: flex;
justify-content: space-around;
margin-top: 2.8vw;
@media screen and (min-width: 1680px) {
  margin-top: 40.32px;
}
`

const Card = styled.div`
border-radius: 1.12vw;
width: 180px;
height: 240px;
margin-bottom: 2.222vw;
border: solid 1px #e6e8ec;
box-shadow: 0px 0px 1.12vw ${(props) => props.theme.subColor};`

const BtnSmall = styled.button``

const DownContainer = styled.div``

const RedBox  = styled.div`
height:200px;
border: solid 1px Red;
border-radius: 10px`

const Box = styled.div`
display: flex;
align-items: flex-starat;
justify-content: space-between;
padding: 10px;`


const TextBox  = styled.div`
height:100px;
`
const BigText = styled.div`
font-weight: bold;
font-size: large
// margine: 100px;
`

const Text = styled.div`
font-size: small`

const BtnBig = styled.button`
border: ${(props) => props.theme.mainColor} 1px;
width: 150px;
height: 30px;
border-radius: 5px;
font-size: small;
background-color: ${(props) => props.theme.mainColor};
`

interface Data {
  "study_users": [
		{
			"id": number; //사용자 식별자
			"nickname": string; //사용자 닉네임
			"email": string; //사용자 이메일
			"imagePath": string; //사용자 프로필 사진 url
			"isLeader": string; //스터디장 유무
		},
	]
}

//
function StudyManageMember() {

  const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
  const token = localStorage.getItem("kakao-token");
  
// // 스터디에 속한 유저 정보 가져오기
// const StudyUserApi = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/1/users`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     });

//     const data = await response.json();
//     console.log(data)
//     return data;
//   } catch (error: any) {
//     console.log(error);
//   }
// };
// // const { id } = useParams<Params>();
// const { data: userStudy } = useQuery<Data>("userStudy", () =>
// StudyUserApi(),);

// 위임

// 강퇴



  return (<Wrapper>
    <UpContainer>
      {/* {userStudy.map((index : any)=> (
      <Card key={index}>
      <ProfileImg
              imgUrl={
                // detailStudy?.result.imgPath !== "/root"
                //   ? detailStudy?.result.imgPath
                  // : defaultprofileImg
                  defaultprofileImg
              }
              width="6vw"
              height="6vw"
            />
      </Card>
      ))} */}
    </UpContainer>
    <DownContainer>
      <RedBox>
      <Box>
        <TextBox>
          <BigText>스터디원 모집</BigText>
          <Text>스터디원 모집 여부를 설정할 수 있습니다.</Text>
          <Text>설정하시겠습니까?</Text>
        </TextBox>
      <BtnBig>모집 시작</BtnBig>
      {/* <BtnBig>모집 마감</BtnBig> */}
      </Box>
      <Box>
        <TextBox>
          <BigText>스터디 종료</BigText>
          <Text>한번 종료하면 되돌릴 수 없습니다.</Text>
          <Text>삭제하시겠습니까?</Text>
        </TextBox>
      <BtnBig>스터디 종료하기</BtnBig>
      </Box>
      </RedBox>
    </DownContainer>
    </Wrapper>);
}

export default StudyManageMember;
