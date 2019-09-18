import React from "react";
import styled from "styled-components";

const CupSettings = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    font-size: 32px;
    padding: 5px;
    text-align: center;
    border: 1px solid black;
    outline: 0;
  }
  .cup-num-input {
    display: flex;
    width: 45%;
  }
  .inc,
  .dec {
    width: 100%;
    background: gray;
    height: 20px;
    font-size: 28px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    span {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid black;
      clear: both;
      left: 50%;
      top: 50%;
      transform: translate(-50%);
    }
  }
  .dec {
    span {
      border-bottom: 0;
      border-top: 5px solid black;
    }
  }
  .cups-option {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

function CupInput(props) {
  <input
    type="number"
    defaultValue={props.nbCups}
    min="1"
    max="8"
    onChange={props.onChange}
  ></input>;
}

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.increaseCup = this.increaseCup.bind(this);
    this.decreaseCup = this.decreaseCup.bind(this);
  }

  increaseCup(e) {
    e.stopPropagation();
    this.props.incNbCups();
    return false;
  }

  decreaseCup(e) {
    e.stopPropagation();
    this.props.decNbCups();
    return false;
  }

  render() {
    return (
      <div>
        <h5>Number of cups:</h5>
        <CupSettings>
          <div className="cup-num-input">
            <input
              type="number"
              value={this.props.nbCups}
              min="1"
              max="8"
              onChange={this.props.handleCupNb}
            />
          </div>
          <div className="cups-option">
            <div className="inc" onClick={this.increaseCup}>
              <span></span>
            </div>
            <div className="dec" onClick={this.decreaseCup}>
              <span></span>
            </div>
          </div>
        </CupSettings>
        <button className="actionButton" onClick={this.props.onStart}>
          Start
        </button>
      </div>
    );
  }
}
