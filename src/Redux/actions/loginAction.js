import axios from "axios";


let localStore = {
  saveData: function(name, item) {
    localStorage.setItem(name, item);
  }
};
export const resetOnSuccess = () => {
  return {
    type: "RESETONSUCCESS"
  };
};

export const authStart = () => {
  return {
    type: "USERSTART"
  };
};

export const confirmMFA = val => {
  // console.log(val);
  return {
    type: "CONFIRMMFA",
    payload: val
  };
};

export const authSuccess = val => {
  console.log(val);
  localStore.saveData("user", val.response.user);
  localStore.saveData("user-val", JSON.stringify(val.response));
  localStore.saveData("testing", null);
  return {
    type: "USERSUCCESS",
    payload: val
  };
};

export const sendAuthSuccessAgain = val => {
  console.log(val);
  return {
    type: "USERSUCCESS",
    payload: { response: val }
  };
};

export const changePass = val => {
  return {
    type: "CHANGEPASS",
    payload: val
  };
};
export const passChanged = val => {
  // console.log(val);
  return {
    type: "PASSCHANGED",
    payload: val
  };
};

export const sendNewPass = val => {
  console.log(val);
  return function(dispatch) {
    dispatch(authStart());
    return axios({
      method: "post",
      url: "/main/login/auth/sendNewPass",
      data: val
    })
      .then(function(response) {
        console.log(response);
        if (response.data.statusCode === 400) {
          dispatch(authFail(response.data.message));
        } else {
          // dispatch(confirmMFA({response:response.data})
          dispatch(passChanged({ response: response.data }));
        }
      })
      .catch(function(err) {
        // console.log(err);
      });
  };
};

export const authFail = val => {
  // console.log(val);
  return {
    type: "USERFAIL",
    payload: val
  };
};

export const sendMFA = val => {
  console.log(val);
  return function(dispatch) {
    return axios({
      method: "post",
      url: "/main/login/auth/sendmfa",
      data: {
        value: val
      }
    })
      .then(function(response) {
        // console.log(response);
        if (response.data.accessToken) {
          dispatch(authCheck({ response: response.data }));
        } else {
          dispatch(authFail("INCORRECT AUTHENTICATION CODE"));
        }
      })
      .catch(function(err) {
        // console.log(err)
        dispatch(authFail(err.response));
      });
  };
};

export const api = val => {
  console.log(val);
  return function(dispatch) {
    dispatch(authStart());
    return axios({
      method: "post",
      url: "/main/login/auth/authenticateUser",
      data: {
        value: val
      }
    })
      .then(function(response) {
        console.log(response);
        if (response.data.code) {
          dispatch(authFail(response.data.message));
          return;
        } else {
          console.log(response);
          dispatch(authCheck({ user: val.user, response: response.data }));
          return;
        }
      })
      .catch(function(err) {
        console.log(err);
        dispatch(authFail(err.response));
      });
  };
};

export const authCheck = val => {
  //check if user needs to change pass or not and direct to appropriate route
  console.log(val);
  return function(dispatch) {
    if (val.response.changePass) {
      dispatch(changePass(val));
    } else if (val.response.MFA === "MFA") {
      dispatch(confirmMFA(val));
    } else {
      dispatch(authSuccess(val));
    }
  };
};
