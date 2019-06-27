import axios from "axios";

export const sendToOwner = val => {
  // console.log(val);
  return function(dispatch) {
    return axios({
      method: "post",
      url: "/main/contactowner/auth/sendinfo",
      data: val
    })
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          dispatch(sendResponseToClient(response.status));
        } else {
          // dispatch(confirmMFA({response:response.data})
          dispatch(sendResponseToClient(response.status));
        }
      })
      .catch(function(err) {
        // dispatch(sendResponseToClient(err))
        console.log(err);
      });
  };
};

export const sendResponseToClient = (val) => {
  console.log(val)
  return {
    type: "CONTACTSTATUS",
    payload:val
  };
};

