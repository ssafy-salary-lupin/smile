import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 350px;
`;

const Box = styled.div`
  background-color: blue;
  width: 50px;
  height: 100px;
  margin: 0 25px;
`;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      <Wrapper>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <Box>
            <h3>1</h3>
          </Box>
          <Box>
            <h3>2</h3>
          </Box>
          <Box>
            <h3>3</h3>
          </Box>
          <Box>
            <h3>4</h3>
          </Box>
          <Box>
            <h3>5</h3>
          </Box>
          <Box>
            <h3>6</h3>
          </Box>
        </Slider>
      </Wrapper>
    );
  }
}
