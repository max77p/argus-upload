const express = require("express");
const router = express.Router();
require("dotenv").config();
var AWS = require("aws-sdk");
AWS.config.update({
  region: "ca-central-1"
});
// var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

router.post("/authenticateUser", (req, res) => {
  const val = req.body;
  var loginParams = {
    AuthFlow: "USER_PASSWORD_AUTH",
    /* required */
    ClientId: process.env.ClientId,
    /* required */
    AuthParameters: {
      USERNAME: val.value.user,
      PASSWORD: val.value.pass
    }
  };
  // console.log(AWS.config.credentials.accessKeyId);

  cognitoidentityserviceprovider.initiateAuth(loginParams, function(err, data) {
    if (err) {
      // console.log(err, err.stack); // an error occurred
      res.json(err);
    } else {
      //   console.log(data); // successful response
      if (data.ChallengeName === process.env.Challenge_NEW_PASS) {
        res.json({
          changePass: "changePass",
          session: data.Session
        });
      } else if (data.ChallengeName === process.env.Challenge_MFA) {
        console.log(data);
        res.json({
          MFA: "MFA",
          session: data.Session,
          user: val.value.user
        });
      } else {
        const accessToken = data.AuthenticationResult.AccessToken;
        // Add the User's Id Token to the Cognito credentials login map.
        const idToken = data.AuthenticationResult.IdToken;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.IdentityPoolId,
          Logins: {
            [process.env.CognitoIdp]: idToken
          },
          LoginId: val.value.user,
          region: process.env.Region
        });
        res.json({
          accessToken,
          idToken,
          user: val.value.user
        });
      }
    }
  });
});

router.post("/sendNewPass", (req, res) => {
  const newPassParams = {
    ChallengeName: process.env.Challenge_NEW_PASS,
    /* required */
    ClientId: process.env.ClientId,
    /* required */
    ChallengeResponses: {
      USERNAME: `${req.body.user}`,
      NEW_PASSWORD: `${req.body.newPass}`
      /* '<StringType>': ... */
    },
    Session: req.body.session
  };
  cognitoidentityserviceprovider.respondToAuthChallenge(newPassParams, function(
    err,
    data
  ) {
    if (err) {
      //   console.log(err, err.stack); // an error occurred
      res.json(err);
    } else {
      //   console.log(data); // successful response
      if (data.ChallengeName === process.env.Challenge_MFA) {
        console.log(data);
        res.json({
          MFA: "MFA",
          session: data.Session,
          user: req.body.user
        });
      } else {
        const accessToken = data.AuthenticationResult.AccessToken;

        // Add the User's Id Token to the Cognito credentials login map.
        const idToken = data.AuthenticationResult.IdToken;
        res.json({
          accessToken,
          idToken,
          user: req.body.user
        });
      }
    }
  });
});

//--------------SEND MFA CODE ONCE RECEIVED-------------------//
router.post("/sendmfa", (req, res) => {
  const val = req.body;
  // console.log(val.value.user);
  // console.log(val.value.MFA)
  // const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  const mfaParams = {
    ChallengeName: process.env.Challenge_MFA,
    /* required */
    ClientId: process.env.ClientId,
    /* required */
    ChallengeResponses: {
      USERNAME: `${req.body.value.user}`,
      SMS_MFA_CODE: `${val.value.MFA}`
      /* '<StringType>': ... */
    },
    Session: req.body.value.session
  };
  cognitoidentityserviceprovider.respondToAuthChallenge(mfaParams, function(
    err,
    data
  ) {
    if (err) {
      // console.log(err, err.stack); // an error occurred
      res.json(err);
    } else {
      // console.log(data);           // successful response

      const accessToken = data.AuthenticationResult.AccessToken;
      const idToken = data.AuthenticationResult.IdToken;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.IdentityPoolId,
        Logins: {
          [process.env.CognitoIdp]: idToken
        },
        LoginId: val.value.user,
        region: process.env.Region
      });
      res.json({
        accessToken,
        idToken,
        user: req.body.value.user
      });
    }
  });
});

router.post("/logoutuser", (req, res) => {
  var x=JSON.parse(req.body.value.uservalTemp);
  console.log(x);
  var paramsLogout = {
    AccessToken: `${x.accessToken}` /* required */
  };
  cognitoidentityserviceprovider.globalSignOut(paramsLogout, function(
    err,
    data
  ) {
    if (err) {
      //if logout failure occurs
      res.json({
        putData: err,
        signOut: false
      });
    } else {
      //logout success!
      res.json({
        putData: data,
        signOut: true
      });
    }
  });
});

module.exports = router;
