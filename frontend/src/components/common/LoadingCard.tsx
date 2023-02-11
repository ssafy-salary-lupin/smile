import styled, { keyframes } from "styled-components";

const load = keyframes`
  100%{
    background-position: -100% 0;
  }
`;

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-rows: 21.84vw 12.91vw;
  border-radius: 1.12vw;
  width: 29.68vw;
  height: 36.75vw;
  border: solid 1px #e6e8ec;
  /* box-shadow: 0px 0px 1.12vw ${(props) => props.theme.subColor}; */

  /* margin: 0; */
  /* margin-top: 2.8vw; */
  /* margin-bottom: 2.222vw; */
  /* margin-left: 0.9vw; */
  /* width: 100%; */
  /* height: 100%; */
  background: var(--bg-color);
  div {
    /* margin: 0; */
    background: linear-gradient(
      120deg,
      #e5e5e5 30%,
      #f0f0f0 38%,
      #f0f0f0 40%,
      #e5e5e5 48%
    );
    border-radius: 1rem;
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: ${load} 1s infinite;
  }
`;

const SkeletonItem = styled.section`
  display: grid;
  grid-template-rows: 3.92vw 4.2vw 4.62vw;
  padding: 0.7vw 1.68vw;
`;

const SkeletonHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    :nth-child(1) {
      width: 7vw;
      height: 1.68vw;
    }
    :nth-child(2) {
      width: 5vw;
      height: 1.68vw;
    }
  }
`;

const SkeletonSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    :nth-child(1) {
      width: 7vw;
      height: 1.68vw;
    }
    :nth-child(2) {
      width: 5vw;
      height: 1.68vw;
      margin-bottom: 0.5vw;
    }
  }
`;

const SkeletonFooter = styled.section`
  display: flex;
  align-items: center;
  section {
    display: flex;
    flex-direction: column;
    margin-left: 1vw;
    height: 4vw;
    justify-content: space-around;
    div {
      :nth-child(1) {
        width: 5vw;
        height: 1.68vw;
      }
      :nth-child(2) {
        width: 7vw;
        height: 1.68vw;
      }
    }
  }
`;

const SkeletonImg = styled.div`
  border-radius: 1.12vw 1.12vw 0px 0px !important;
  width: 29.68vw;
  height: 21.84vw;
  /* position: relative;
  top: -0.24vw;
  left: 0.07vw; */
`;

const SkeletonText = styled.div`
  /* margin-bottom: 0.5rem; */
  /* height: 1rem; */
`;

const SkeletonProfile = styled.div`
  width: 3.36vw;
  height: 3.36vw;
  border-radius: 50px !important;
`;

export default function LoadingCard() {
  return (
    <SkeletonContainer id="skeleton">
      <SkeletonImg />
      <SkeletonItem>
        <SkeletonHeader>
          <SkeletonText />
          <SkeletonText />
        </SkeletonHeader>
        <SkeletonSection>
          <SkeletonText />
          <SkeletonText />
        </SkeletonSection>
        <SkeletonFooter>
          <SkeletonProfile />
          <section>
            <SkeletonText />
            <SkeletonText />
          </section>
        </SkeletonFooter>
      </SkeletonItem>
    </SkeletonContainer>
  );
}
