import React, { Component } from "react";
import classes from "./LandingBody.css";
import logo from "../../assets/images/test.jpg";
import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import ApproveCard from "./ApproveCard/ApproveCard";
class LandingBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, param) {
    e.preventDefault();
    console.log(param);
    window.open(param, "_blank");
    console.log("test");
  }

  render() {

    return (
      <div id={classes["approval-main-container"]}>
        <div class={`${classes["appcard-col-style"]}`}>
          <ApproveCard
          // app-link=""
          // name="coming soon"
          // linkClick={this.handleSubmit}
          />
        </div>
        <div class={`${classes["appcard-col-style"]}`}>
          <ApproveCard
          // app-link="#"
          // name="coming soon"
          // linkClick={this.handleSubmit}
          />
        </div>
        <div class={`${classes["appcard-col-style"]}`}>
          <ApproveCard
          // app-link="#"
          // name="coming soon"
          // linkClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default LandingBody;
