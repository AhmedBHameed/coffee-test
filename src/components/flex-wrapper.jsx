import React from "react";

export default class FlexWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, children } = this.props;
    return <div className={`flex-box ${className}`}>{children}</div>;
  }
}
