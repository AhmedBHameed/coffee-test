import React from "react";
import styled from "styled-components";

// Component
import Cup from "./cup.jsx";
import FlexWrapper from "./flex-wrapper";

const CupFlex = styled(FlexWrapper)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const GameOver = styled.h2`
  color: red;
`;

const GamePaused = styled.h2`
  color: brown;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class GameWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamePause: false
    };

    this.pauseOrPlay = this.pauseOrPlay.bind(this);
  }

  pauseOrPlay() {
    this.setState({
      gamePause: !this.state.gamePause
    });
  }

  gameActions() {
    const { gameover, setSettings, handleStart } = this.props;
    const { gamePause } = this.state;
    return (
      <React.Fragment>
        <ColumnFlex className="columnFlex">
          {gamePause && <GamePaused>GAME PAUSED</GamePaused>}
          {gameover && (
            <React.Fragment>
              <GameOver>GAME OVER</GameOver>
              <button className="actionButton" onClick={handleStart}>
                Retry
              </button>
              <button className="actionButton" onClick={() => setSettings()}>
                Change settings
              </button>
            </React.Fragment>
          )}
        </ColumnFlex>
        {!gameover && (
          <button className="actionButton" onClick={this.pauseOrPlay}>
            {gamePause ? "Play" : "Pause"}
          </button>
        )}
      </React.Fragment>
    );
  }

  renderCups() {
    const { setGameOver, defaultTimeout, nbCups, gameover } = this.props;
    const { gamePause } = this.state;
    let cups = [];
    for (var i = 0; i < nbCups; i++) {
      cups.push(
        <Cup
          key={i.toString()}
          isGameover={gameover}
          gamePause={gamePause}
          handleGameOver={setGameOver}
          defaultTimeout={defaultTimeout}
        />
      );
    }
    return <CupFlex>{cups}</CupFlex>;
  }

  render() {
    return (
      <Content>
        {this.renderCups()}
        {this.gameActions()}
      </Content>
    );
  }
}
