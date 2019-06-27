import React, { Component } from "react";
import classes from "./NavigatorButtons.css";
import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";

const NavigatorButtons = props => (
  <div className={classes["navigator-main-container"]}>
    <div className={classes["navigator-button"]}>
      <i class="fas fa-arrow-circle-left" />
    </div>
    <div className={classes["navigator-button"]}>
      <i class="fas fa-arrow-circle-right" />
    </div>
  </div>
);

export default NavigatorButtons;
