import React, { Component } from "react";
import classes from "./PageTemplate.css";
// import logo from "../../assets/images/riocan-vendorportal-logo.png";

import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";

const ResumePage = props => {
  
  return (
    <div className={`${classes["template-card-layout"]}`}>
      <div className={classes["innerLayout"]}>
        <div className={classes["page-header"]}>
            {props.pageTitle}
        </div>
        <div className={classes["page-content"]}>
          {/* {props.experience} */}
          {props.bodyData}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
