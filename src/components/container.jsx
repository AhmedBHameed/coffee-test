import React from "react";

export default class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, children } = this.props;
    return (
      <div className={`container${!!className ? ` ${className}` : ""}`}>
        {children}
      </div>
    );
  }
}
