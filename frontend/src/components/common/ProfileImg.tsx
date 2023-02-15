import img from "../../assets/img/userDefaultImg.png";
import styled from "styled-components";
import { useEffect, useState } from "react";
const Img = styled.img.attrs((props) => ({ src: props.src }))<ImgProps>`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  border-radius: 50px;
  @media screen and (min-width: 1680px) {
    width: ${(props) => String(props.W)}px;
    height: ${(props) => String(props.H)}px;
  }
  /* src: url("C:/Users/SSAFY/Desktop/SSAFY/frontend/smile/src/assets/components/common/profile_default.png"); */
`;

interface ImgProps {
  src?: string;
  w?: string;
  h?: string;
  W?: number;
  H?: number;
}

interface IProfileImgProps {
  imgUrl?: string;
  width?: string;
  height?: string;
}

function ProfileImg(props: IProfileImgProps) {
  const [W, setW] = useState<number>(0);
  const [H, setH] = useState<number>(0);
  useEffect(() => {
    if (props.width?.slice(-2) === "vw") {
      setW(Number(props.width?.slice(0, -2)) / 0.104);
      setH(Number(props.height?.slice(0, -2)) / 0.104);
    } else {
      setW(Number(props.width?.slice(0, -2)));
      setH(Number(props.height?.slice(0, -2)));
    }
  }, []);

  return (
    <div>
      {/* <Img src={require(`${props.imgUrl}`).default} /> */}
      <Img src={props.imgUrl} w={props.width} h={props.height} W={W} H={H} />
    </div>
  );
}

ProfileImg.defaultProps = {
  imgUrl: img,
};

export default ProfileImg;
