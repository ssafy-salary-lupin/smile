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
  /* @media screen and (min-width: 1680px) {
    grid-template-rows: 314.496px 185.904px;
    border-radius: 16.128px;
    width: 427.392px;
    height: 529.2px;
  } */
  @media screen and (min-width: 1280px) {
    grid-template-rows: 279.552px 165.248px;
    border-radius: 14.336px;
    width: 380px;
    height: 470.4px;
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
  /* @media screen and (min-width: 1680px) {
    grid-template-rows: 56.448px 60.48px 66.528px;
    padding: 10.08px 20px;
  } */
  @media screen and (min-width: 1280px) {
    grid-template-rows: 50.176px 53.76px 59.136px;
    padding: 8.96px 17.779px;
  }
`;

const SkeletonHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    :nth-child(1) {
      width: 7vw;
      height: 1.68vw;
      /* @media screen and (min-width: 1680px) {
        width: 100.8px;
        height: 24.192px;
      } */
      @media screen and (min-width: 1280px) {
        width: 89.6px;
        height: 21.504px;
      }
    }
    :nth-child(2) {
      width: 5vw;
      height: 1.68vw;
      /* @media screen and (min-width: 1680px) {
        width: 72px;
        height: 24.192px;
      } */
      @media screen and (min-width: 1280px) {
        width: 64px;
        height: 21.504px;
      }
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
      /* @media screen and (min-width: 1680px) {
        width: 100.8px;
        height: 24.192px;
      } */
      @media screen and (min-width: 1280px) {
        width: 89.6px;
        height: 21.504px;
      }
    }
    :nth-child(2) {
      width: 5vw;
      height: 1.68vw;
      margin-bottom: 0.5vw;
      /* @media screen and (min-width: 1680px) {
        width: 72px;
        height: 24.192px;
        margin-bottom: 7.2px;
      } */
      @media screen and (min-width: 1280px) {
        width: 64px;
        height: 21.504px;
        margin-bottom: 6.4px;
      }
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
    /* @media screen and (min-width: 1680px) {
      margin-left: 14.4px;
      height: 57.6px;
    } */
    @media screen and (min-width: 1280px) {
      margin-left: 12.8px;
      height: 51.2px;
    }
    div {
      :nth-child(1) {
        width: 5vw;
        height: 1.68vw;
        /* @media screen and (min-width: 1680px) {
          width: 72px;
          height: 24.192px;
        } */
        @media screen and (min-width: 1280px) {
          width: 64px;
          height: 21.504px;
        }
      }
      :nth-child(2) {
        width: 7vw;
        height: 1.68vw;
        /* @media screen and (min-width: 1680px) {
          width: 100.8px;
          height: 24.192px;
        } */
        @media screen and (min-width: 1280px) {
          width: 89.6px;
          height: 21.504px;
        }
      }
    }
  }
`;

const SkeletonImg = styled.div`
  border-radius: 1.12vw 1.12vw 0px 0px !important;
  width: 29.68vw;
  height: 21.84vw;
  /* @media screen and (min-width: 1680px) {
    border-radius: 16.128px 16.128px 0vw 0vw !important;
    width: 427.392px;
    height: 314.496px;
  } */
  @media screen and (min-width: 1280px) {
    border-radius: 1.12vw 1.12vw 0px 0px !important;
    width: 379.904px;
    height: 279.552px;
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
  width: 3.36vw;
  height: 3.36vw;
  border-radius: 50px !important;
  /* @media screen and (min-width: 1680px) {
    width: 50px;
    height: 50px;
    border-radius: 3.472vw !important;
    margin-left: 3px;
    margin-bottom: 3px;
  } */
  @media screen and (min-width: 1280px) {
    width: 44.442px;
    height: 44.442px;
    border-radius: 3.906vw !important;
    margin-left: 2.662px;
    margin-bottom: 2.662px;
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
