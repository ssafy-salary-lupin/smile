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

  @media screen and (min-width: 1280px) {
    grid-template-rows: 209.664px 123.936px;
    border-radius: 10.752px;
    width: 285.005px;
    height: 352.8px;
  }

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

  @media screen and (min-width: 1280px) {
    grid-template-rows: 37.632px 40.32px 44.352px;
    padding: 6.72px 13.334px;
  }
`;

const SkeletonHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    :nth-child(1) {
      width: 7vw;
      height: 2vw;
      @media screen and (min-width: 1280px) {
        width: 67.498px;
        height: 16.128px;
      }
    }
    :nth-child(2) {
      width: 5vw;
      height: 2vw;
      @media screen and (min-width: 1280px) {
        width: 48px;
        height: 16.128px;
      }
    }
  }
`;

const SkeletonSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: -0.4vw;
  div {
    :nth-child(1) {
      width: 10vw;
      height: 1.68vw;
      @media screen and (min-width: 1280px) {
        width: 128px;
        height: 16.128px;
      }
    }
    :nth-child(2) {
      width: 10vw;
      height: 1.68vw;
      margin-bottom: 0.5vw;
      @media screen and (min-width: 1280px) {
        width: 96px;
        height: 16.128px;
        margin-bottom: 4.8px;
      }
    }
  }
`;

const SkeletonFooter = styled.section`
  display: flex;
  align-items: center;
  /* margin-bottom: 0.4vw;
  margin-right: -0.8vw;
  margin-left: -0.2vw; */
  margin: 0 -0.8vw -0.2vw 0.4vw;
  section {
    display: flex;
    flex-direction: column;
    margin-left: 1vw;
    height: 4vw;
    justify-content: space-around;
    @media screen and (min-width: 1280px) {
      margin-left: 9.6px;
      height: 38.4px;
    }
    div {
      :nth-child(1) {
        width: 5vw;
        height: 1.68vw;
        @media screen and (min-width: 1280px) {
          width: 48px;
          height: 16.128px;
        }
      }
      :nth-child(2) {
        width: 7vw;
        height: 1.68vw;
        @media screen and (min-width: 1280px) {
          width: 105.005px;
          height: 16.128px;
        }
      }
    }
  }
`;

const SkeletonImg = styled.div`
  border-radius: 1.12vw 1.12vw 0px 0px !important;
  width: 29.68vw;
  height: 21.84vw;
  @media screen and (min-width: 1280px) {
    border-radius: 10.752px 10.752px 0vw 0vw !important;
    width: 285.677px;

    height: 210.664px;
  }
  /* position: relative;
  top: -0.24vw;
  left: 0.07vw; */
`;

const SkeletonText = styled.div`
  /* margin-bottom: 0.5rem; */
  /* height: 1rem; */
`;

const SkeletonProfile = styled.div`
  width: 3.5vw;
  height: 3.5vw;
  border-radius: 50px !important;
  /* @media screen and (min-width: 1680px) {
    width: 50px;
    height: 50px;
    border-radius: 3.472vw !important;
    margin-left: 3px;
    margin-bottom: 3px;
  } */
  @media screen and (min-width: 1280px) {
    width: 35px;
    height: 35px;
    border-radius: 37.498px !important;
    margin-left: 2.997px;
    margin-bottom: 0.576px;
  }
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
