import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as style from "./App.css";
import Authentication from "./Pages/Login/authentication";
import PrivateRoute from "./Pages/PrivateRoute/privateRoute";
import PasswordChangeRoute from "./Pages/PrivateRoute/passwordChangeRoute";
import MFAChangeRoute from "./Pages/PrivateRoute/mfaChangeRoute";

import Portal from "./Pages/UploadPortal/portal";
import ChangePass from "./Pages/Login/changePass";
import MultiFactor from "./Pages/Login/multiFactor";

class App extends Component {
  render() {
    return (
      <div className={style["app-main-container"]}>
        <Switch>
          <Route path="/login" component={Authentication} />
          <Route exact path="/" component={Authentication} />
          <PasswordChangeRoute
            authenticated={this.props.changePass}
            path="/changepass"
            component={ChangePass}
          />
          <MFAChangeRoute
            multiFactor={this.props.multiFactor}
            path="/mfa"
            component={MultiFactor}
          />
          <PrivateRoute
            authenticated={this.props.loggedIn}
            path="/portal"
            component={Portal}
          />
          {/* <Route path="/portal" component={Portal}/> */}
          {/* <Route path="/changePass" component={ChangePass}/> */}
          {/* <Route authenticated={this.props.changePass} path="/changePass" component={ChangePass} /> */}
          <Route path="*" component={Authentication} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.loginR);
  return {
    changePass: state.loginR.changePass,
    username: state.loginR.user,
    password: state.loginR.pass,
    acToken: state.loginR.acToken,
    idToken: state.loginR.idToken,
    loading: state.loginR.loading,
    loggedIn: state.loginR.loggedIn,
    error: state.loginR.error,
    multiFactor: state.loginR.mfa
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
