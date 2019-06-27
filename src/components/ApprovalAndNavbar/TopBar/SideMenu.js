import React, { Component } from "react";
import classes from "./TopBar.css";

import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";


const SideMenu = props => {
  // console.log(props.menuStatus);
  const { menuStatus, menuPosition } = props;
  let noSideMenu = "noSideMenuNav";
  let showSideMenu = "showSideMenuNav";

  return (
    <ul
      className={`navbar-nav ${
        menuStatus ? classes[showSideMenu] : classes[noSideMenu]
      }`}
      id={classes["sideMenu"]}
    >
      <li class="nav-item active">
       <Link to="/"><a class="nav-link" href="#">
          Home 
        </a></Link>
      </li>
      <li class="nav-item">
      <Link to="/approvals">  <a class="nav-link" href="#">
          Approvals
        </a></Link>
      </li>
      <li class="nav-item">
       <Link to="/placeholder1"><a class="nav-link" href="#">
          Placeholder
        </a></Link> 
      </li>
      <li class="nav-item">
       <Link to="/placeholder2"><a class="nav-link disabled" href="#">
          Placeholder
        </a>
        </Link> 
      </li>
    </ul>
  );
};

export default SideMenu;
