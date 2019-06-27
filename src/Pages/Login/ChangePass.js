import React, { Component } from "react";
import logo from "../../assets/images/test.jpg";
import * as actions from "../../Redux/actions/loginAction";
import classes from "./AuthStyle.css";
import { connect } from "react-redux";

class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      isChanging: false,
      confirmPassword: "",
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    console.log("hello from changepass")
  }

  validateForm(e) {
    return (
      this.state.newPassword.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.newPassword === this.state.confirmPassword &&
      this.state.checked===true
    );
  }

  handleCheckBoxClick() {
    this.setState(prevState=>({
        ...prevState,
        checked:!prevState.checked
    }))
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var statusMsg = document.getElementById("errMsg");
    statusMsg.innerHTML = " ";
    if (this.validateForm()) {
    //   console.log("everything good");
    }
    else if(!this.state.checked){
        statusMsg.innerHTML = "Please accept the End-user agreement before proceeding";
        return false;
    }
    else {
      // console.log("Your password does not match");
      statusMsg.innerHTML = "Your password does not match";
      return false;
    }
   
    // console.log(this.state.newPassword);
    this.props.sendNewPass({
      user: this.props.username,
      newPass: this.state.newPassword,
      session: this.props.session
    });
    this.setState(prevState => ({
      ...prevState,
      newPassword: "",
      confirmPassword: ""
    }));
  }

  render() {
    const { error } = this.props;


    let form = null;

    if (error) {
      form = <p className="text-center custom-message">{error}</p>;
    } else {
      form = (
        <p className="text-center custom-message">
          We have detected this is your first time logging in. Please change
          your password
        </p>
      );
    }
    return (
      <div className={[classes["auth-wrapper"],classes["auth-fadeInDown"]].join(" ")}>
        <div id={classes["auth-form-content"]}>
          <div className={[classes["auth-fadeIn"],classes["auth-first"],classes["auth-changepass-logo"]].join(" ")}>
            <img src={logo} id={classes["auth-icon"]} alt="User Icon" />
          </div>
          {form}
          <p id="errMsg"/>
          <form onSubmit={this.handleSubmit}>
            <input
              type="password"
              id="auth-password"
              className={[classes["auth-fadeIn"],classes["auth-second"]].join(" ")}
              name="newPassword"
              placeholder="New Password"
              onChange={this.handleChange}
              value={this.state.newPassword}
            />
            <input
              type="password"
              id="auth-password"
              className={[classes["auth-fadeIn"],classes["auth-third"]].join(" ")}
              name="confirmPassword"
              placeholder="Repeat Password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
            />
            <input
              type="submit"
              className={[classes["auth-fadeIn"],classes["auth-fourth"],classes["auth-changepass-submit"]].join(" ")}
              value="Change Password"
            />
          </form>
          <div id={classes["auth-form-footer"]}>
            <div class="form-check form-check-inline">
            <a class="auth-check-label" for="inlineCheckbox">
                I Accept
              </a>
              <input
                class="auth-check-input"
                type="checkbox"
                id="inlineCheckbox"
                onChange={this.handleCheckBoxClick}
                value={this.state.checked}
              />
              
            </div>
            <a
              className={classes["auth-underline-hover"]}
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/document/d/e/2PACX-1vQrT4j3pMP461pQFUuE-lfdQ2cOCVwGTmJa2nlOD7saWqymHVVrWhSIwaxkQ8kJUOxjju1nPbNZw8Vp/pub"
            >
              END-USER LICENSE AGREEMENT
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    changePass: state.loginR.changePass,
    // filename: state.afterUpload.fileName,
    // statusOk: state.afterUpload.s3positive,
    // statusErr: state.afterUpload.s3negative,
    email: state.loginR.user,
    acToken: state.loginR.acToken,
    idToken: state.loginR.idToken,
    // uploadProgress: state.afterUpload.uploadProgress,
    // fileTypeError: state.afterUpload.fileTypeError,
    // signedOut: state.afterUpload.signOut,
    username: state.loginR.user,
    session: state.loginR.session,
    error: state.loginR.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendNewPass: val => dispatch(actions.sendNewPass(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePass);
