import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./index.css";
import * as actions from "./Redux/actions/loginAction";
import * as logoutActions from "./Redux/actions/logoutAction";
import * as contactActions from "./Redux/actions/contactAction";
import Authentication from "./Pages/Login/Authentication";
import HomePage from "./Pages/HomePage/HomePage";
import TopBar from "./components/ApprovalAndNavbar/TopBar/TopBar";

import PasswordChangeRoute from "./components/PrivateRoute/passwordChangeRoute";
import ChangePass from "./Pages/Login/ChangePass";
import PrivateRoute from "./components/PrivateRoute/authenticatedRoute";
import MFAChangeRoute from "./components/PrivateRoute/mfaRoute";
import MultiFactor from "./Pages/Login/multiFactor";

import PortfolioPage from "./Pages/Portfolio/Portfolio";
import ContactPage from "./Pages/Contact/Contact";
// const AsyncPizza = React.lazy(() => import("./containers/Pizza"));
// const AsyncChangePass=React.lazy(()=>import("./Pages/Login/ChangePass"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: "",
      toggleMenu: false,
      menuPosition: false,
      clientName: "",
      clientEmail: "",
      clientMessage: "",
      nameFieldEmpty: false,
      emailFieldEmpty: false
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleMenuOpenAndClose = this.handleMenuOpenAndClose.bind(this);
    this.handleMenuOutsideClick = this.handleMenuOutsideClick.bind(this);
   
    
  }

  handleResize = e => {
    const windowSize = window.innerWidth;
    if (e.type === "resize") {
      this.setState(prevState => ({
        ...prevState,
        toggleMenu: false
      }));
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  componentWillMount() {
    const loggedInUser = localStorage.getItem("user");
    const loggedInUserVal = localStorage.getItem("user-val");
    console.log(JSON.parse(loggedInUserVal));

    if (!this.props.loggendIn) {
      if (loggedInUser && loggedInUserVal) {
        this.props.sendAuthSuccessAgain(JSON.parse(loggedInUserVal));
      } else {
        return;
        // console.log("not logged in");
        // <Redirect to={{ pathname: "/"}} />
      }
    }
  }

  handleSignOut(e) {
    e.preventDefault();
    if (this.props.loggedIn) {
      console.log("sign out");
      this.props.logOutUser();
    }
  }

  handleMenuOpenAndClose(e) {
    // e.preventDefault();
    // console.log(e.target.className);
    // console.log("menu");
    if (e.target.id === "menuOn" || e.target.className === "sideMenu") {
      this.setState(prevState => ({
        ...prevState,
        toggleMenu: true
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        toggleMenu: false
      }));
    }
  }

  handleMenuOutsideClick(e) {
    e.preventDefault();
    console.log("outside click");
    console.log(e.target.className);
    if (e.target.id !== "menuOn" || e.target.id !== "sideMenuNav") {
      this.setState(prevState => ({
        ...prevState,
        toggleMenu: false
      }));
    }
  }

 

  



  render() {
    return (
      <div onClick={this.handleMenuOpenAndClose}>
        <TopBar
          signOut={this.handleSignOut}
          toggleMenu={this.handleMenuOpenAndClose}
          menuStatus={this.state.toggleMenu}
        />
        <Switch>
          {/* <PasswordChangeRoute
            authenticated={this.props.changePass}
            exact
            path="/auth/changePass"
            component={ChangePass}
          />
          <Route exact path="/" component={Authentication} /> */}
          {/* <PrivateRoute
          authenticated={this.props.loggedIn}
          signOut={this.handleSignOut}
          exact
          path="/auth/landingzone"
          component={LandingPage}
        /> */}
          {/* <MFAChangeRoute
            multiFactor={this.props.multiFactor}
            exact
            path="/auth/mfa"
            component={MultiFactor}
          /> */}
          <Route
            path="/"
            authenticated={this.props.loggedIn}
            exact
            render={() => (
              <HomePage
                menuStatus={this.state.toggleMenu}
                // toggleMenuOutside={this.handleMenuOutsideClick}
              />
            )}
          />
        </Switch>
      </div>
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
    sendAuthSuccessAgain: val => dispatch(actions.sendAuthSuccessAgain(val)),
    logOutUser: () => dispatch(logoutActions.logOutUser()),
    sendToOwner: val => dispatch(contactActions.sendToOwner(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
