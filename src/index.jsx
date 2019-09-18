import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Game from "./game";

// Service worker
import * as serviceWorker from "./serviceWorker";

const StyledText = styled.p`
  color: darkgoldenrod;
  text-decoration: underline;
`;
function Settings() {
  return (
    <div>
      <h5>Number of cups:</h5>
      <input type="number" value="1" min="1" max="8"></input>
      <button>Start</button>
    </div>
  );
}
const App = () => (
  <div>
    <h1>React parcel starter</h1>
    <StyledText>This text is styled with styled components :)</StyledText>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  //dev mode
  ReactDOM.render(<Game />, document.getElementById("root"));
  module.hot.accept();
} else {
  // production mode
  serviceWorker.register();
}
