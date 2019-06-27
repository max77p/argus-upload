import React, { Component } from "react";
import classes from "./Contact.css";
// import logo from "../../assets/images/riocan-vendorportal-logo.png";

import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import PageTemplate from "../../components/PageTemplate/PageTempate";

const Contact = props => {
  console.log(props)
let nameFieldEmptyError='';
if(props.nameFieldEmpty){
  nameFieldEmptyError=(<span className={classes["contact-error"]}>Please input name</span>)
}
else{
  nameFieldEmptyError=null
}
let emailFieldEmptyError='';
if(props.emailFieldEmpty){
  emailFieldEmptyError=(<span className={classes["contact-error"]}>Please check email</span>)
}
else{
  emailFieldEmptyError=null
}


  let title = <h2 className={classes["title-resume-style"]}>Contact</h2>;
  let items = (
    <div>
      <div className="row">
        <div className="col-sm">
          <p>Coming Soon</p>
        </div>
        <div className="col-sm">
          <div className={classes["block-title"]}>
            <h3>
              Contact<span> Form</span>
            </h3>
          </div>

          <form>
            <div class={`form-group ${classes["contact-form-group"]}`}>
              <i class={`fas fa-user ${classes["contact-user-icon"]}`} />
              <input
                type="name"
                class={`form-control ${classes["contact-form-input"]}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="clientName"
                placeholder="Full Name"
                onChange={props.handleClientChange}
                value={props.nameVal}
              />
              {nameFieldEmptyError}
            </div>
            <div class={`form-group ${classes["contact-form-group"]}`}>
              <i class={`fas fa-envelope ${classes["contact-user-icon"]}`} />
              <input
                type="email"
                class={`form-control ${classes["contact-form-input"]}`}
                id="exampleInputEmail1"
                name="clientEmail"
                placeholder="Email Address"
                onChange={props.handleClientChange}
                value={props.emailVal}
              />
              {emailFieldEmptyError}
            </div>

            <div class={`form-group ${classes["contact-form-group"]}`}>
              <i class={`fas fa-comment ${classes["contact-user-icon"]}`} />
              <textarea
                class={`form-control ${classes["contact-form-input"]}`}
                id="exampleFormControlTextarea1"
                rows="3"
                name="clientMessage"
                placeholder="Message for Me"
                onChange={props.handleClientChange}
                value={props.messageVal}
              />
            </div>
            <button type="submit" class={`btn btn-primary ${classes["contact-submit-btn"]}`} onClick={props.handleContactSubmit}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return <PageTemplate pageTitle={title} bodyData={items}/>;
};

export default Contact;
