import styled from "styled-components";
import "../../assets/css/index.css";

// const Btn = styled.div`
//   justify-content: space-between;
//   padding: 1.5rem;
// `;

const YellowBtn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: var(--clr-primary-1);
  color: white;
  border: 0;
  margin: 1rem 1.5rem 0rem 0rem;
`;

const BlueBtn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: var(--clr-primary-2);
  color: white;
  border: 0;
`;

function ButtonBasic() {
  return (
    <div>
      <YellowBtn>확인</YellowBtn>
      <BlueBtn>취소</BlueBtn>
    </div>
  );
}
export default ButtonBasic;
