import React from "react";
import styled from "styled-components";

export default class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.saveDescriptionSetting = this.saveDescriptionSetting.bind(this);
  }

  saveDescriptionSetting() {
    this.state.checked = !this.state.checked;
    localStorage.setItem("noDescription", "" + this.state.checked);
  }

  render() {
    return (
      <React.Fragment>
        <h3>How to play the coffee game:</h3>
        <p>
          The cups will fill from time to time. You can drink them empty by
          clicking on a cup. Try to drink all cups before they get too full. The
          speed of the filling process will increase after time.
        </p>
        <div>
          <input
            type="checkbox"
            defaultValue={false}
            onChange={this.saveDescriptionSetting}
          />
          <span>Don't show this description again</span>
        </div>
        <button
          className="actionButton txt-center"
          onClick={this.props.onStart}
        >
          Start
        </button>
      </React.Fragment>
    );
  }
}
