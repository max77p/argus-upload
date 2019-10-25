import React from 'react';
import {Route,Redirect} from 'react-router-dom';

function PasswordChangeRoute({ component: Component, authenticated, ...rest }) {
  // console.log(authenticated);
  return (
    <Route
      {...rest}
      render={(props) => authenticated==="changepass" ?(
      <Component {...props} /> ):(<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
      }
    />
  )
};
export default PasswordChangeRoute;