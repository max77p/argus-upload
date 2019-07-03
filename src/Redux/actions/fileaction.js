import axios from "axios";

export const uploadFile = val => {
  console.log(val);
  //val.data.email and val.data.actoken
  return function(dispatch) {
    // console.log(val);
    return axios({
      method: "post",
      url: "/portal/auth/coverter/csvjson",
      data: val.formData
    }).then(function(response) {
        // console.log(response);
      if (response.data === "Please follow header guidelines") {
        dispatch(passPartnerErrorToUser(response));
      } else {
        // console.log(response);
        var jsonReadyForS3 = response.data;
        // console.log(jsonReadyForS3)
        //set params for s3
        var jsonName = val.fileName.substr(0, val.fileName.lastIndexOf(".")) + ".JSON";
        dispatch(checkAndSendToS3({ response, jsonName, val, jsonReadyForS3 }));
      }
    });
  };
};

export const checkAndSendToS3 = res => {
  // console.log(res);
  // console.log(res.val.email);
  // console.log(res.val);
  return dispatch => {
    dispatch(uploadProgress());
    axios({
      method: "post",
      url: "/portal/auth/transfer/checks3",
      data: res
    }).then(function(response) {
      // console.log(response);
      // if return value is found then do this, if not throw error
      if (response.data === "noFile") {
        // console.log("found");
        axios({
          method: "post",
          url: "/portal/auth/transfer/sendtos3",
          data: res
        }).then(function(data) {
          // console.log(data);
          dispatch(passSuccessToUser(data));
        });
      } else if (response.data === "unauthorized-Partner") {
        dispatch(passPartnerErrorToUser(response));
      } else {
        dispatch(passErrorToUser(response));
      }
    });
  };
};

export const checkIfFileCorrect = res => {
  return {
    type: "FILECHECK",
    payload: res
  };
};

export const passSuccessToUser = res => {
  return {
    type: "SENDSUCCESS",
    payload: res
  };
};
export const passPartnerErrorToUser = res => {
  return {
    type: "SENDPARTNERERROR",
    payload: res
  };
};

export const passErrorToUser = res => {
  return {
    type: "SENDERROR",
    payload: res
  };
};

export const uploadProgress = () => {
  return {
    type: "UPLOADPROGRESS"
  };
};

export const resetOnError = val => {
  return {
    type: "RESETONERROR",
    payload: val
  };
};

export const resetOnSuccess = () => {
  return {
    type: "RESETONSUCCESS"
  };
};
