import React, { Component } from "react";
import classes from "./HomePage.css";
// import logo from "../../Images/riocan-vendorportal-logo.png"

import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";

import { connect } from "react-redux";
import LandingBody from "../../components/ApprovalAndNavbar/ConsolidatedApproveCards";
import NavigatorButtons from "../../components/NavigatorButtons/NavigatorButtons";
import PageTemplate from "../../components/PageTemplate/PageTempate";
import * as actions from "../../Redux/actions/testAction";
import ApproveCards from "../../components/ApprovalAndNavbar/ConsolidatedApproveCards";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
    this.handleBtnClick=this.handleBtnClick.bind(this)
    this.handlePostClick=this.handlePostClick.bind(this)
  }
  
  handleBtnClick(e) {
    e.preventDefault();
   this.props.testapi()
  }
handlePostClick(e){
  e.preventDefault();
  this.props.postapi();
}

  render() {
    let title=(<h2 className={classes["title-resume-style"]}>Approvals</h2>)
   
    const {menuStatus,toggleMenuOutside}=this.props
    return (
      <PageTemplate pageTitle={title} bodyData={[<ApproveCards/>]}/>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    changePass: state.loginR.changePass,
    username: state.loginR.user,
    password: state.loginR.pass,
    acToken: state.loginR.acToken,
    idToken: state.loginR.idToken,
    loading: state.loginR.loading,
    loggedIn: state.loginR.loggedIn,
    error: state.loginR.error,
    multiFactor: state.loginR.mfa,
    contactStatus: state.contactR.contactstatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    testapi: ()=> dispatch(actions.testapi()),
    postapi:()=>dispatch(actions.postapi())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
