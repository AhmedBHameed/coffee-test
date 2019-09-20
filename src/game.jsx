import React from "react";
import Settings from "./components/settings.jsx";
import Description from "./components/description.jsx";
import styled from "styled-components";
import "./stylesheet/game.css";

// Components
import Container from "./components/container";
import FlexWrapper from "./components/flex-wrapper";
import NavBar from "./components/nav-bar";
import GameWrapper from "./components/game-wapper";

// Assets
import cup_too_full from "./assets/cup_too_full.png";

const FlexBox = styled(FlexWrapper)`
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const FlexBoxWrapper = styled(FlexWrapper)`
  flex-direction: column;
  margin: 0;
`;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restartGame: true,
      nbCups: 1,
      incNbCups: () => {
        this.setState({
          nbCups:
            this.state.nbCups < 8 ? ++this.state.nbCups : this.state.nbCups
        });
      },
      decNbCups: () => {
        this.setState({
          nbCups:
            this.state.nbCups > 1 ? --this.state.nbCups : this.state.nbCups
        });
      },
      noDescription: false,
      descriptionTime: false,
      gameTime: false,
      defaultTimeout: 2000,
      gameover: false
    };
    this.handleStart = this.handleStart.bind(this);
    this.updateNbCups = this.updateNbCups.bind(this);

    this.setGameOver = this.setGameOver.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  updateNbCups(e) {
    e.preventDefault();
    let newVal = +e.target.value.charAt(1);
    if (newVal > 8) {
      newVal = 8;
    }
    if (newVal < 1) {
      newVal = 1;
    }
    this.setState({ nbCups: newVal });
  }

  renderSettings() {
    return (
      <Settings
        nbCups={this.state.nbCups}
        incNbCups={this.state.incNbCups}
        decNbCups={this.state.decNbCups}
        handleCupNb={this.updateNbCups}
        onStart={this.handleStart}
      />
    );
  }

  renderDescription() {
    return (
      <div className="">
        <Description
          gameIsNext={true}
          onStart={e => this.handleStart(e, true)}
        />
      </div>
    );
  }

  handleStart(e, gameTime) {
    this.state.gameover = false;
    gameTime || localStorage.getItem("noDescription") == "true"
      ? this.setState({ gameTime: true, descriptionTime: false })
      : this.setState({ gameTime: false, descriptionTime: true });
    this.restart(false);
    setTimeout(() => {
      this.restart(true);
    }, 0);
  }

  restart(bool) {
    this.setState({
      restartGame: bool
    });
  }

  setGameOver(gameoverState) {
    this.setState({
      gameover: gameoverState
    });
  }
  setSettings() {
    this.setState({ gameTime: false, descriptionTime: false });
  }

  render() {
    const {
      gameTime,
      descriptionTime,
      restartGame,
      defaultTimeout,
      gameover,
      nbCups,
      highestScore
    } = this.state;

    return (
      <FlexBoxWrapper>
        <NavBar imgSrc={cup_too_full} gameover={gameover} />
        <Container>
          <FlexBox>
            {gameTime &&
              (restartGame && (
                <GameWrapper
                  nbCups={nbCups}
                  gameover={gameover}
                  gameTime={gameTime}
                  descriptionTime={descriptionTime}
                  defaultTimeout={defaultTimeout}
                  setGameOver={this.setGameOver}
                  setSettings={this.setSettings}
                  handleStart={this.handleStart}
                  setHighestScore={this.setHighestScore}
                />
              ))}
            {descriptionTime && this.renderDescription()}
            {!gameTime && !descriptionTime && this.renderSettings()}
          </FlexBox>
        </Container>
      </FlexBoxWrapper>
    );
  }
}
