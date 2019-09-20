import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Game from "./game";

const StyledText = styled.p`
  color: darkgoldenrod;
  text-decoration: underline;
`;
const App = () => (
  <div>
    <h1>React parcel starter</h1>
    <StyledText>This text is styled with styled components :)</StyledText>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

function registerSW() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      try {
        navigator.serviceWorker
          .register("./sw.js")
          .then(function(registration) {
            console.log(
              "SW successfully registered on scope",
              registration.scope
            );
          })
          .catch(function(err) {
            console.error("Something went wrong with SW!!", err);
          });
      } catch (e) {
        console.error("SW registration failed!", e);
      }
    });
  }
}

if (module.hot) {
  //dev mode
  ReactDOM.render(<Game />, document.getElementById("root"));
  module.hot.accept();
} else {
  // production mode
  registerSW();
}
