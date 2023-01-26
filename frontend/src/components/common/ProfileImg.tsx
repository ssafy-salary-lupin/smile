import img from "../../assets/img/userDefaultImg.png";
import styled from "styled-components";
const Img = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50px;
  /* src: url("C:/Users/SSAFY/Desktop/SSAFY/frontend/smile/src/assets/components/common/profile_default.png"); */
`;

interface IProfileImgProps {
  imgUrl: string;
  width?: string;
  height?: string;
}

function ProfileImg(props: IProfileImgProps) {
  return (
    <div>
      {/* <Img src={require(`${props.imgUrl}`).default} /> */}
      <Img src={props.imgUrl} width={props.width} height={props.height} />
    </div>
  );
}

ProfileImg.defaultProps = {
  imgUrl: img,
};

export default ProfileImg;
