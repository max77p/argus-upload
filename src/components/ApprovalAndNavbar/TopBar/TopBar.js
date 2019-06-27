import React, { Component } from "react";
import classes from "./TopBar.css";
import SideMenu from "./SideMenu";
// import logo from "../../assets/images/riocan-vendorportal-logo.png";

import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";

const TopBar = props => {
  const { authenticated, menuStatus,menuPosition } = props;

  let topBar = (
    <i class={`fas fa-user ${classes["topbar-user-offlineSign"]}`} />
  );

  if (authenticated) {
    topBar = (
      <i
        class={`fas fa-user ${classes["topbar-user-onlineSign"]}`}
        onClick={props.signOut}
      />
    );
  }

  return (
    <nav class={`navbar navbar-light bg-dark ${classes["topbar-main-style"]}`}>
      <a className={classes["topbar-menu-icon"]}><i id="menuOn" class="fas fa-bars"></i></a>
      
      <SideMenu menuStatus={menuStatus} menuPosition={menuPosition}/>
      <a class="" href="#">
        {/* <i class={`fas fa-user ${classes["topbar-user-sign"]}`}></i> */}
        {topBar}
      </a>
    </nav>
  );
};

export default TopBar;
