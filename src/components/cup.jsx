import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import cup_empty from "../assets/cup_empty.png";
import cup_fill_1 from "../assets/cup_fill_1.png";
import cup_fill_2 from "../assets/cup_fill_2.png";
import cup_full from "../assets/cup_full.png";
import cup_too_full from "../assets/cup_too_full.png";

const CupWrapper = styled.div`
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CupButton = styled.button`
  background: transparent;
  border: 0;
`;

const TimerWrapper = styled.span`
  font-size: 40px;
  color: blue;
`;

export default class Cup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetNumber: 0,
      coeff: this.props.defaultTimeout | 1000,
      timeout: this.initTimeout(),
      timer: 0,
      stepTimer: 0,
      assetArray: [cup_empty, cup_fill_1, cup_fill_2, cup_fill_2, cup_too_full],
      overflow: false
    };
    this.chrono = setInterval(
      () =>
        this.setState({
          timer: this.state.timer + 0.01,
          stepTimer: this.state.stepTimer + 0.01
        }),
      10
    );
    this.setTimeout();
    this.emptyCup = this.emptyCup.bind(this);
    this.fillCup = this.fillCup.bind(this);
  }

  componentDidMount() {
    this.DOMElement = ReactDOM.findDOMNode(this);
    this.DOMElement.addEventListener("gameOver", this.props.handleGameOver);
  }

  componentWillReceiveProps() {
    // I can control pause and play using this cycle
    console.log(this.props);
  }

  pauseOrPlayGame() {
    //   I test the program with pause and play here but i could not finish it in time!!
    // setTimeout(() => {
    // 	this.pauseTimer();
    //   }, 1500);
    //   setTimeout(() => {
    // 	this.chrono = setInterval(
    // 	  () =>
    // 		this.setState({
    // 		  timer: this.state.timer + 0.01,
    // 		  stepTimer: this.state.stepTimer + 0.01
    // 		}),
    // 	  10
    // 	);
    // 	this.setTimeout();
    //   }, 3000);
  }

  initTimeout() {
    return Math.random() * this.props.defaultTimeout;
  }

  getTimeout() {
    return Math.random() * this.state.coeff;
  }

  pauseTimer() {
    clearTimeout(this.stepChrono);
    clearInterval(this.chrono);
    this.setState({ timeout: this.state.timeout - this.stepChrono });
  }

  fillCup() {
    if (this.state.assetNumber + 1 == this.state.assetArray.length) {
      this.setState({ overflow: true });
      clearInterval(this.chrono);
      this.DOMElement.dispatchEvent(new Event("gameOver"));
    } else {
      this.setState({
        assetNumber: this.state.assetNumber + 1,
        coeff: this.state.coeff - Math.random() * 500,
        timeout: this.getTimeout()
      });
      this.setState({ stepTimer: 0 });
      this.setTimeout();
    }
  }

  emptyCup() {
    if (!this.state.overflow)
      this.setState({
        assetNumber: 0,
        coeff: this.props.defaultTimeout,
        timeout: this.initTimeout()
      });
  }

  setTimeout() {
    this.stepChrono = setTimeout(() => this.fillCup(), this.state.timeout);
  }

  render() {
    return (
      <CupWrapper>
        <CupButton onClick={this.emptyCup}>
          <img src={this.state.assetArray[this.state.assetNumber]} />
        </CupButton>
        <TimerWrapper>{Math.round(this.state.timer * 100) / 100}s</TimerWrapper>
      </CupWrapper>
    );
  }
}
