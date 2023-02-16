import ProfileImg from "components/common/ProfileImg";
import styled from "styled-components";
import { ReactComponent as Crown } from "assets/icon/Crown.svg";
import { useState } from "react";
import UserModal from "./UserModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1.12vw;
  width: 21.667vw;
  height: 24.861vw;
  margin-bottom: 2.222vw;
  margin: 0px 20px;
  border: solid 1px #e6e8ec;
  box-shadow: 0 5px 5px -5px ${(props) => props.theme.subColor};
`;

const UserNameSpace = styled.div`
  display: flex;
`;

const UserName = styled.div`
  padding-top: 10px;
  margin-bottom: 2.222vw;
`;

const BtnBox = styled.div``;

const BlueBtn = styled.button`
  cursor: pointer;
  box-shadow: 0 5px 5px -5px #333;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  font-size: x-small;
  background-color: ${(props) => props.theme.pointColor};
  border: ${(props) => props.theme.pointColor};
  color: white;
  margin-left: 10px;
`;

const YellowBtn = styled.button`
  cursor: pointer;
  box-shadow: 0 5px 5px -5px #333;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  font-size: x-small;
  border: ${(props) => props.theme.pointColor};
  background-color: ${(props) => props.theme.mainColor};
`;

interface UserInfoType {
  user: {
    id: number; //사용자 식별자
    nickname: string; //사용자 닉네임
    email: string; //사용자 이메일
    imgPath: string; //사용자 프로필 사진 url
    leader: boolean; //스터디장 유무
  };
}

function UserCard(props: UserInfoType) {
  const [openMandate, setOpenMandate] = useState<boolean>(false);
  const [openDrop, setOpenDrop] = useState<boolean>(false);

  const openMandateModal = () => {
    setOpenMandate(!openMandate);
  };
  const openDropModal = () => {
    setOpenDrop(!openDrop);
  };
  return (
    <>
      <Container>
        <ProfileImg
          imgUrl={props.user.imgPath}
          width="5.208vw"
          height="5.208vw"
        />
        <UserNameSpace>
          <UserName>{props.user.nickname}</UserName>
          {props.user.leader === true ? (
            <Crown fill="#F5C82E" width="1.389vw" />
          ) : null}
        </UserNameSpace>
        <hr />
        {!props.user.leader && (
          <BtnBox>
            <YellowBtn onClick={openMandateModal}>위임</YellowBtn>
            <BlueBtn onClick={openDropModal}>강퇴</BlueBtn>
          </BtnBox>
        )}
      </Container>
      {openMandate && (
        <UserModal
          setModalOpen={setOpenMandate}
          flag={true}
          userId={props.user.id}
        />
      )}
      {openDrop && (
        <UserModal
          setModalOpen={setOpenDrop}
          flag={false}
          userId={props.user.id}
        />
      )}
    </>
  );
}

export default UserCard;
