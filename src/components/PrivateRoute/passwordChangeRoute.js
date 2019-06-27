import React from "react";
import { Route, Redirect } from "react-router-dom";

const PasswordChangeRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  // console.log(rest);
  // console.log(authenticated);
  // let form = null;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === "changePass" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PasswordChangeRoute;
