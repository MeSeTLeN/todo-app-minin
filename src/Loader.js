import React, { Component, Fragment } from "react";

export default class Loader extends Component {
  render() {
    return (
      <Fragment>
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Fragment>
    );
  }
}
