import React, { Component } from "react";
import classes from "./Portfolio.css";
// import logo from "../../assets/images/riocan-vendorportal-logo.png";

import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import PageTemplate from "../../components/PageTemplate/PageTempate";
import LandingBody from "../../components/ApprovalAndNavbar/ConsolidatedApproveCards";


const Portfolio = props => {
    let title=(<h2 className={classes["title-resume-style"]}>Portfolio</h2>)
    let items=(
        <div className="row">
            <div className="col-md-4">
               <p>hello</p> 
            </div>
            <div className="col-md-4">
            <p>hello</p> 
            </div>
            <div className="col-md-4">
            <p>hello</p> 
            </div>
        </div>
    )

  return (
  <PageTemplate pageTitle={title} bodyData={<LandingBody/>}/>
  );
};

export default Portfolio;