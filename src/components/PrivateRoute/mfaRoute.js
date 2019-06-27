import React from 'react';
import {Route,Redirect} from 'react-router-dom';

function MFAChangeRoute({ component: Component, multiFactor, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => multiFactor?(
      <Component {...props} /> ):(<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
      }
    />
  )
};
export default MFAChangeRoute;