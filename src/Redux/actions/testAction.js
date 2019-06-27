import axios from "axios";


export const testapi = () => {
    return function(dispatch) {
        return axios({
          method: "get",
          url: "/main/user/approval/test"
        })
          .then(function(response) {
            console.log(response);
           
          })
          .catch(function(err) {
            console.log(err);
          });
      };
};

export const postapi = (val) => {
    return function(dispatch) {
        return axios({
          method: "post",
          url: "/main/user/approval/post",
          data:val
        })
          .then(function(response) {
            console.log(response);
           
          })
          .catch(function(err) {
            console.log(err);
          });
      };
};