import React from "react";
import styled from "styled-components";

const Header = styled.header`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: gray;
  color: white;
  padding: 0.5rem;
`;

const BrandWithLogo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  .gameLogo {
    width: 30px;
    margin-left: 10px;
  }
`;

const HighScore = styled.h5`
  margin: 0;
`;

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  getHighScore() {
    return localStorage.getItem("highScore") || 0;
  }
  render() {
    const { imgSrc } = this.props;
    return (
      <Header>
        <BrandWithLogo>
          <div>Coffee game</div>
          <img src={imgSrc} alt="caffee" className="gameLogo" />
        </BrandWithLogo>
        <HighScore>Highest Score: {this.getHighScore()}s</HighScore>
      </Header>
    );
  }
}
