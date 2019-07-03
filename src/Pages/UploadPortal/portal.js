import React, { Component } from "react";
import logo from "../../assets/Images/riocan-vendorportal-logo.png";
import * as actions from "../../Redux/actions/fileaction";
import { connect } from 'react-redux';
import Input from "./input";
import checkFile from "./formatChecker";

import * as style from "./portalStyle.css";

class UploadPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
      upload: null,
      formData: null
    }
    this.uploadFile = this.uploadFile.bind(this);
    this.submitFile = this.submitFile.bind(this);
    this.checkErrorStatusHandler = this.checkErrorStatusHandler.bind(this);
  }

  uploadFile(e) {
    e.preventDefault();
    
    const statusMsg = document.getElementById("status0");
    const statusIcon = document.getElementById("portal-icon-status");

   const upload = e.target.files;
    if (!upload.length) {
      statusMsg.innerHTML = "Please choose a file";
      statusIcon.innerHTML = " "
      return false;
    }
    const file = upload[0]; //this is the actual file data
    const formData = new FormData();
    formData.append("csv", file);
    const fileName = file.name; //this is the filename

    const fileType = fileName.split('.').pop();
    if (fileType.toLowerCase() !== "csv") {
      statusMsg.innerHTML = "Incorrect file. Please only upload CSV or contact RioCan administrator for assistance";
      statusIcon.innerHTML = `<i class="fas fa-times-circle portal-status-error"></i>`
      return false;
    }
    var resultOfCheck = checkFile(fileName);
    // console.log(resultOfCheck);

    // {/*---check file naming standard, month and year must match current if not throw error---*/ }
    if (resultOfCheck.length) {
      this.props.checkIfFileCorrect({ status: true, error: resultOfCheck });
      this.props.resetOnError('fileTypeErrorReset');
      return false;
    }
    else {
      this.props.checkIfFileCorrect({ status: false, error: null });
      this.props.resetOnError('fileTypeErrorReset');
    }
    // console.log("does this work?")
    this.setState(prevState => ({
      ...prevState,
      fileName: fileName,
      formData: formData,
      upload: upload
    }))
  }

  submitFile(e, fileName, formData, upload, email, acToken, idToken) {
    e.preventDefault();
    // console.log(upload);
    if (!upload) {
      return alert('Please choose a file to upload first.');
    }
    this.props.uploadFile({ fileName, formData, email, acToken, idToken });
    this.setState(prevState => ({
      ...prevState,
      fileName: null,
      upload: null,
      formData: null
    }))
  }

  checkErrorStatusHandler(statusErr) {
    // console.log(statusErr);
    var statusMsg = document.getElementById("status0");
    // var statusMsg1 = document.getElementById("status1");
    // var statusMsg2 = document.getElementById("status2");
    var statusIcon = document.getElementById("portal-icon-status");
    statusMsg.innerHTML = '';
    statusIcon.innerHTML ='';
   
    switch (statusErr.data) {
      case 'fileExists':
        return (
          statusMsg.innerHTML = "Duplicate file not allowed, contact RioCan Business partner",
          statusIcon.innerHTML = `<i class="fas fa-times-circle portal-status-error"></i>`
        )
      case 'noEmail':
        return (
          statusMsg.innerHTML = "Not authorized please contact RioCan business partner",
          statusIcon.innerHTML = `<i class="fas fa-times-circle portal-status-error"></i>`
        )
      case 'noAuth':
        return (
          statusMsg.innerHTML = "User signed out already. Please sign in and try again",
          statusIcon.innerHTML = `<i class="fas fa-times-circle portal-status-error"></i>`
        )
        case 'unauthorized-Partner':
        return(
          statusMsg.innerHTML = "Partner not authorized",
          statusIcon.innerHTML = `<i class="fas fa-times-circle portal-status-error"></i>`
        )
        case 'Please follow header guidelines':
        document.getElementById("my-file-selector").value = "";
        return(
          statusMsg.innerHTML = `${statusErr.data}`,
          statusIcon.innerHTML = `<i class="fas fa-times-circle portal-status-error"></i>`
        )
        default:
        //nothing
    }
  }

  render() {
    // {/*----the props returned here is from server redux---- */ }
    const { statusOk, statusErr, uploadProgress, email, acToken, idToken, fileTypeError, signedOut } = this.props;
  
    // {/*----temporary hold of filename, form data and uploaded file---- */ }
    const { fileName, formData, upload } = this.state;

    var statusMsg = document.getElementById("status0");
    var statusMsg1 = document.getElementById("status1");
    var statusMsg2 = document.getElementById("status2");
    var statusIcon = document.getElementById("portal-icon-status");

    let showUploadBtn = null;
    let showBrowseBtn = (
      <div>
        <h6 id="portal-status-update">Choose your file to upload</h6>
        <Input change={this.uploadFile.bind(this)} fileName={this.state.fileName} />
      </div>
    )
    

    if (fileTypeError && fileTypeError.status) {
      statusMsg.innerHTML = " ";
      statusMsg1.innerHTML = " ";
      statusMsg2.innerHTML = " ";
      for (var i = 0; i < fileTypeError.error.length; i++) {
        // console.log("yes");
        var newMsg = document.getElementById(`status${i}`);
        newMsg.innerHTML = `${fileTypeError.error[i]}`
      }

      statusIcon.innerHTML = `<i class="fas fa-times-circle portal-status-error"></i>`
    }
    // {/*---show the upload button if file is chosen, otherwise don't show it--- */ }
    else if (upload && upload !== null) {
      statusMsg.innerHTML = " ";
      statusMsg1.innerHTML = " ";
      statusMsg2.innerHTML = " ";
      statusIcon.innerHTML = " ";
      showUploadBtn = (
        <div class={style["portal-upload-button"]}>
          <input type="submit" class="btn btn-primary portal-upload-file" value="Upload" />
        </div>
      )
    }
    else {
      showUploadBtn = null;
    }


    // {/*---show the different statuses once upload button is clicked--- */ }
    if (uploadProgress) {
      //during upload progress
      statusMsg.innerHTML = "Please wait"
      statusIcon.innerHTML = `<i class="fas fa-spinner fa-spin portal-status-spinner"></i>`
      // {/*---hide the browse button if upload is ok, otherwise show it--- */ }
      showBrowseBtn = null
    }
    else if (statusErr) {
      //email not found
      this.checkErrorStatusHandler(statusErr);
    }
    else if (statusOk) {
      //after upload success msg
      statusMsg.innerHTML = "Success"
      statusIcon.innerHTML = `<i class="fas fa-check-circle portal-status-spinner"></i>`
      // {/*---hide the browse button if upload is ok, otherwise show it--- */ }
      showBrowseBtn = (
        <div class="portal-upload-button">
          <p>File uploaded successfully. You may close the application now</p>
          {signedOut ? <p>You have been signed out</p> : <p>Signing out Error please contact administrator</p>}
        </div>
      )
    }


    return (
      <div className={`${style["portal-auth-wrapper"]} ${style["auth-fadeInDown"]}`} >
        <div id={style["portal-auth-form-content"]}>

          <div className={`${style["auth-fadeIn"]} ${style["auth-first"]} ${style["portal-logoDiv-style"]}`}><img alt="User Icon" src={logo} id={style["auth-portal-logo"]}/></div>


           <div className="container">
            <div class={`jumbotron ${style["portal-jumbotron-style"]}`}>
            
              <h1 class={`display-4 ${style["portal-description-textMain"]}`}>RioCan Living </h1>
              <p class={`lead ${style["portal-description-textSecond"]}`}>Partner File Upload.</p>
              <hr class={`my-4 ${style["portal-description-text"]}`}></hr>
              <div class={`row ${style["portal-row-style"]}`}>
                <div class="col-sm-8">
                  <form id={style["portal-form-email-verify"]} onSubmit={(e) => this.submitFile(e, fileName, formData, upload, email, acToken, idToken)}>
                    {showBrowseBtn}
                    {showUploadBtn}
                  </form>
                </div>
                <div class={`col-sm-4 ${style["portal-status-col"]}`}>
                  <div class={style["portal-status-message"]}>
                    <h6 id="status0"></h6>
                    <h6 id="status1"></h6>
                    <h6 id="status2"></h6>
                    <div id="portal-icon-status"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    filename: state.uploadR.fileName,
    statusOk: state.uploadR.s3positive,
    statusErr: state.uploadR.s3negative,
    email: state.loginR.user,
    acToken: state.loginR.acToken,
    idToken: state.loginR.idToken,
    uploadProgress: state.uploadR.uploadProgress,
    fileTypeError: state.uploadR.fileTypeError,
    signedOut: state.uploadR.signOut
  }
}
const mapDispatchToProps = dispatch => {
  return {
    uploadFile: (val) => dispatch(actions.uploadFile(val)),
    checkIfFileCorrect: (val) => dispatch(actions.checkIfFileCorrect(val)),
    resetOnError: () => dispatch(actions.resetOnError()),
    resetOnSuccess: () => dispatch(actions.resetOnSuccess())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadPortal);
