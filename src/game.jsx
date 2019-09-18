import React from "react";
import Cup from "./components/cup.jsx";
import Settings from "./components/settings.jsx";
import Description from "./components/description.jsx";
import styled from "styled-components";
import "./stylesheet/game.css";

// Assets
import cup_too_full from "./assets/cup_too_full.png";

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CupFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const NavBar = styled.header`
  display: flex;
  width: 100%;
  background: gray;
  color: white;
  padding: 0.5rem;
  .gameLogo {
    width: 25px;
    margin-left: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  padding: 15px;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const GameOver = styled.h2`
  color: red;
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
    this.handleGameOver = this.handleGameOver.bind(this);
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

    console.log(newVal);
  }

  renderSettings() {
    return (
      <Row>
        <Settings
          nbCups={this.state.nbCups}
          incNbCups={this.state.incNbCups}
          decNbCups={this.state.decNbCups}
          handleCupNb={this.updateNbCups}
          onStart={this.handleStart}
        />
      </Row>
    );
  }

  gameActions() {
    const { gameover } = this.state;
    return (
      <React.Fragment>
        {gameover && (
          <ColumnFlex className="columnFlex">
            <GameOver>GAME OVER</GameOver>
            <button className="actionButton" onClick={this.handleStart}>
              Retry
            </button>
            <button
              className="actionButton"
              onClick={() =>
                this.setState({ gameTime: false, descriptionTime: false })
              }
            >
              Change settings
            </button>
          </ColumnFlex>
        )}
        {!gameover && (
          <button className="actionButton">
            {this.state.gameTime ? "Pause" : "Play"}
          </button>
        )}
      </React.Fragment>
    );
  }

  handleGameOver() {
    this.setState({ gameover: true });
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

  renderCups() {
    let cups = [];
    for (var i = 0; i < this.state.nbCups; i++) {
      cups.push(
        <Cup
          handleGameOver={this.handleGameOver}
          defaultTimeout={this.state.defaultTimeout}
        />
      );
    }
    return <CupFlex>{cups}</CupFlex>;
  }

  render() {
    const { gameTime, descriptionTime, restartGame } = this.state;

    return (
      <section className="pageContainer">
        <NavBar>
          <div className="headerWrapper_brand">Coffee game</div>
          <div className="headerWrapper_logo">
            <img src={cup_too_full} alt="caffee" className="gameLogo" />
          </div>
        </NavBar>
        <Row>
          {gameTime && (
            <ColumnFlex>
              {restartGame && this.renderCups()}
              {this.gameActions()}
            </ColumnFlex>
          )}
          {descriptionTime && this.renderDescription()}
          {!gameTime && !descriptionTime && this.renderSettings()}
        </Row>
      </section>
    );
  }
}
