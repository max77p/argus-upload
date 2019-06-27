import React from 'react'

import {Route,Redirect} from 'react-router-dom';


function PrivateRoute({ component: Component, authenticated, signOut, ...rest }) {
  // console.log(authenticated);
  return (
    <Route
      {...rest}
      render={(props) => authenticated ?(
      <Component {...props} authenticated={authenticated} signOut={signOut}/> ):(<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
      }
    />
  )
};


export default PrivateRoute;