import axios from "axios";

export const logOutUser = () => {
  var userTemp = localStorage.getItem("user");
  var uservalTemp = localStorage.getItem("user-val");

  //   console.log(JSON.parse(uservalTemp))

  //   localStore.saveData("user-val", JSON.stringify(val.response));
  //   return {
  //     type: "LOGOUTUSER"
  //   };
  return function(dispatch) {
    return axios({
      method: "post",
      url: "/main/login/auth/logoutuser",
      data: {
        value: { userTemp, uservalTemp }
      }
    })
      .then(function(response) {
        console.log(response);

        if (response.data.signOut) {
          dispatch(sendLogoutSuccess({ response: response.data }));
        } else {
          console.log("already signed out");
          // dispatch(authFail("INCORRECT AUTHENTICATION CODE"));
        }
      })
      .catch(function(err) {
        console.log(err);
        //   dispatch(authFail(err.response));
      });
  };
};

export const sendLogoutSuccess = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-val");
  return {
    type: "LOGOUTUSER"
  };
};
