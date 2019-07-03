require('dotenv').config();
var AWS = require("aws-sdk");
AWS.config.update({
    region: 'ca-central-1'
});

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
var cognitoidentity = new AWS.CognitoIdentity();

// var loginParams = {
//     AuthFlow: 'USER_PASSWORD_AUTH',
//     /* required */
//     ClientId: process.env.ClientId,
//     /* required */
//     AuthParameters: {
//         'USERNAME': "shanindrakumar@gmail.com",
//         'PASSWORD': "Portal2)"
//     }
// };

var loginParams = {
    AuthFlow: "USER_PASSWORD_AUTH",
    /* required */
    ClientId: process.env.ClientId,
    /* required */
    AuthParameters: {
      USERNAME: "shanindrakumar@gmail.com",
      PASSWORD: "Portal2)"
    }
  };
// console.log(AWS.config.credentials.accessKeyId);

cognitoidentityserviceprovider.initiateAuth(loginParams, function (err, data) {
    console.log("started")
    if (err) {
        // console.log(err, err.stack); // an error occurred
        console.log("first error")
        console.log(err)
    } else {
        // console.log(data);           // successful response
        if (data.ChallengeName === process.env.Challenge_NEW_PASS) {
           console.log("changepass")
        } else if (data.ChallengeName === process.env.Challenge_MFA) {
            // console.log(data);
         console.log("mfa required")
        } else {

            const accessToken = data.AuthenticationResult.AccessToken;
            // Add the User's Id Token to the Cognito credentials login map.
            const idToken = data.AuthenticationResult.IdToken;
            // console.log(data.AuthenticationResult);
            // if (idToken === testtoken) {
            //     // console.log("matches");
            // }
                var params3 = {
          IdentityPoolId: process.env.IdentityPoolId /* required */
        };
        cognitoidentity.getIdentityPoolRoles(params3, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: process.env.IdentityPoolId,
                Logins: {
                    [process.env.CognitoIdp]: idToken
                },
                LoginId: "shanindrakumar@gmail.com",
                region: process.env.Region
            });

            AWS.config.credentials.get(function (err) {
                if (!err) {
                    var accessKeyId, secretAccessKey, sessionToken;
                    // console.log(Object.keys(AWS.config.credentials.data.Credentials));
                    // console.log("-----before check-----")
                    // console.log(AWS.config.credentials);
                    // console.log(AWS.config.credentials.data)
                    accessKeyId = AWS.config.credentials.accessKeyId;
                    
                    secretAccessKey = AWS.config.credentials.secretAccessKey;
                    console.log("secret is")
                    console.log(secretAccessKey)
                    sessionToken = AWS.config.credentials.sessionToken;
                }
            })
        }
    }
});