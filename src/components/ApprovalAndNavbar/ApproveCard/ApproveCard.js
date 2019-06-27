import React, { Component } from "react";
import classes from "../LandingBody.css";

import { Redirect } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    };
  }

  render() {
    const { linkClick } = this.props;
    return (
      <div class={`card text-center ${classes["card-main-style"]}`}>
        {/* <img
          class="card-img-top"
          src="https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{this.props.name}</h5>

          <a
            href={this.props["app-link"]}
            class="btn btn-primary"
            onClick={e => linkClick(e, this.props["app-link"])}
          >
            Go to link
          </a>
        </div> */}

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
          <img class="card-img-bottom" src="..." alt="Card image cap" />
        </div>
      </div>
    );
  }
}

export default AppCard;
