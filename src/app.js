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
          {/* <PasswordChangeRoute
            authenticated={this.props.changePass}
            path="/changePass"
            component={ChangePass}
          /> */}
          <MFAChangeRoute
            multiFactor={this.props.multiFactor}
            path="/mfa"
            component={MultiFactor}
          />
          {/* <PrivateRoute
            authenticated={this.props.loggedIn}
            path="/portal"
            component={Portal}
          /> */}
          <Route path="/portal" component={Portal}/>
          <Route path="/changePass" component={ChangePass}/>
          {/* <Route authenticated={this.props.changePass} path="/changePass" component={ChangePass} /> */}
          <Route path="*" component={Authentication} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.login);
  return {
    changePass: state.login.changePass,
    username: state.login.user,
    password: state.login.pass,
    acToken: state.login.acToken,
    idToken: state.login.idToken,
    loading: state.login.loading,
    loggedIn: state.login.loggedIn,
    error: state.login.error,
    multiFactor: state.login.mfa
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
