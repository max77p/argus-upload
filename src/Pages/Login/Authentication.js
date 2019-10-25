import React, { Component } from "react";
import * as style from "./authStyle.css";
import logo from "../../assets/Images/riocan-vendorportal-logo.png";
import * as actions from "../../redux/actions/loginAction";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value
    });
  }

  validateForm() {
    return (
      this.state.oldPassword.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    //val.user has the email
    this.props.userinfo({ user: this.state.user, pass: this.state.pass });
    this.setState(prevState => ({
      ...prevState,
      user: "",
      pass: ""
    }));
  }

  render() {
    const { loggedIn, changePass, multiFactor } = this.props;
    // console.log(this.props.error.message);
    // console.log(loggedIn);

    let form = (
      <div id={style["auth-form-content"]}>
        <div className={`${style["auth-fadeIn"]} ${style["auth-first"]}`}>
          <img src={logo} id={style["auth-icon"]} alt="User Icon" />
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id={style["auth-login"]}
            className={`${style["auth-fadeIn"]} ${style["auth-second"]}`}
            name="user"
            placeholder="yours@example.com"
            onChange={this.handleChange}
            value={this.state.user}
          />
          <input
            type="password"
            id={style["auth-password"]}
            className={`${style["auth-fadeIn"]} ${style["auth-third"]}`}
            name="pass"
            placeholder="your password"
            onChange={this.handleChange}
            value={this.state.pass}
          />
          <input
            type="submit"
            className={`${style["auth-fadeIn"]} ${style["auth-fourth"]}`}
            value="Log In"
          />
        </form>
        <div id={style["auth-form-footer"]}>
          <a
            className={style["auth-underline-hover"]}
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/e/2PACX-1vQrT4j3pMP461pQFUuE-lfdQ2cOCVwGTmJa2nlOD7saWqymHVVrWhSIwaxkQ8kJUOxjju1nPbNZw8Vp/pub"
          >
            END-USER LICENSE AGREEMENT
          </a>
        </div>
      </div>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    if (multiFactor) {
      return <Redirect to={{ pathname: "/mfa" }} />;
      // console.log("yes");
    } else if (this.props.loggedIn) {
      return <Redirect to={{ pathname: "/portal" }} />;
    } else if (changePass === "changepass") {
      return <Redirect to={{ pathname: "/changepass" }} />;
    }

    return <div className={`${style["auth-wrapper"]} ${style["auth-fadeInDown"]}`}>{form}</div>;
  }
}

const mapStateToProps = state => {
  // console.log(state);
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
const mapDispatchToProps = dispatch => {
  return {
    userinfo: val => dispatch(actions.api(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
