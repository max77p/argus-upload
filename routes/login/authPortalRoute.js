const express = require("express");
const router = express.Router();
require("dotenv").config();
var multer = require("multer");
var upload = multer();
const parse = require("csv-parse");
// global.fetch = require("node-fetch");
const testmod = require("../loginMapCreator");
var jdeAlgo = require("../login/jdeLambdaParser");
var partnerCheck = require("../login/partnerCheck");

var AWS = require("aws-sdk");

AWS.config.update({
  region: 'ca-central-1'
});

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
var cognitoidentity = new AWS.CognitoIdentity();

router.post("/authenticateuser", (req, res) => {
  console.log("server");
  // console.log(process.env.IdentityPoolId);
  // console.log(testmod.showstuff())
  // console.log("----------")
  const val = req.body;
  const user = val.value.user;
  console.log(val)
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

  cognitoidentityserviceprovider.initiateAuth(loginParams, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.json(err);
    } else {
      //   console.log(data); // successful response
      if (data.ChallengeName === process.env.Challenge_NEW_PASS) {
        res.json({
          changePass: "changepass",
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
        AWS.config.credentials=new AWS.CognitoIdentityCredentials(testmod.createLoginMap(process.env.IdentityPoolId,process.env.CognitoIdp,idToken,user,process.env.Region))


        // AWS.config.credentials.get(function(err) {
        //   if (!err) {
        //     let accessKeyId, secretAccessKey, sessionToken;
        //     // console.log(Object.keys(AWS.config.credentials.data.Credentials));
        //     // console.log("-----before check-----")
        //     // console.log(AWS.config.credentials);
        //     // console.log(AWS.config.credentials.data)
        //     accessKeyId = AWS.config.credentials.accessKeyId;
        //     secretAccessKey = AWS.config.credentials.secretAccessKey;
        //     sessionToken = AWS.config.credentials.sessionToken;
        //     console.log("session token")
        //     console.log(sessionToken);
        //   } else {
        //     console.log("errored on auth");
        //     console.log(err);
        //   }
        // });
        res.json({
          accessToken,
          idToken,
          user: val.value.user
        });
      }
    }
  });
});

router.post("/sendnewpass", (req, res) => {
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
  const user = req.body.value.user;
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
      AWS.config.credentials=new AWS.CognitoIdentityCredentials(testmod.createLoginMap(process.env.IdentityPoolId,process.env.CognitoIdp,idToken,user,process.env.Region))
      // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      //   IdentityPoolId: process.env.IdentityPoolId,
      //   Logins: {
      //     [process.env.CognitoIdp]: idToken
      //   },
      //   LoginId: val.value.user,
      //   region: process.env.Region
      // });

      res.json({
        accessToken,
        idToken,
        user: req.body.value.user
      });
    }
  });
});

router.post("/logoutuser", (req, res) => {
  var x = JSON.parse(req.body.value.uservalTemp);
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

// router.post("/coverter/csvjson", upload.single("csv"), (req, res) => {
//   //---------gets the file from client side and convert to json
//   // console.log("csv");

//   const sampleFile = req.file.buffer.toString("utf8");
//   // console.log(sampleFile);
//   parse(
//     sampleFile,
//     {
//       columns: true
//     },
//     function(err, data) {
//       let dataReturnedFromAlgo = jdeAlgo.storeData(data);
//       // console.log(dataReturnedFromAlgo)
//       if (!dataReturnedFromAlgo) {
//         // console.log('Please follow header guidelines');
//         res.json("Please follow header guidelines");
//       } else {
//         //  console.log(x);
//         res.json(dataReturnedFromAlgo);
//       }
//       // console.log(x);
//     }
//   );
// });

// //-------------------for creating a object from email attachment in json
// router.post("/transfer/checks3", function(req, res, next) {
//   console.log("transfer started");

//   var mainParams = req.body.val;

//   //   console.log(AWS.config.credentials);
//   // console.log("run next");
//   console.log(mainParams);
//   // const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
//   var tokenForSpecificUser = {
//     AccessToken: `${mainParams.acToken}` /* required */
//   };
//   cognitoidentityserviceprovider.getUser(tokenForSpecificUser, function(
//     err1,
//     data1
//   ) {
//     if (err1) {
//       //GET USER FAILED
//       console.log("error on check");
//       console.log(err1);
//       res.json("noAuth");
//     } else {
//       //GET USER SUCCESS
//       console.log("get user results");
//       console.log(data1);

//       runNext(mainParams, req.body.jsonReadyForS3);
//     }
//   });

//   function runNext(elem, userData) {
//     //get the creds of the user using token

//     // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     //     IdentityPoolId: process.env.IdentityPoolId,
//     //     Logins: {
//     //         [process.env.CognitoIdp]: testmod.storeData.token
//     //     },
//     //     LoginId: testmod.storeData.user,
//     //     region: process.env.Region
//     // });
//     // Credentials will be available when this function is called.
//     AWS.config.credentials.get(function(err) {
//       if (!err) {
//         let accessKeyId, secretAccessKey, sessionToken;
//         // console.log(Object.keys(AWS.config.credentials.data.Credentials));
//         // console.log("-----before check-----")
//         // console.log(AWS.config.credentials);
//         // console.log(AWS.config.credentials.data)
//         accessKeyId = AWS.config.credentials.accessKeyId;
//         secretAccessKey = AWS.config.credentials.secretAccessKey;
//         sessionToken = AWS.config.credentials.sessionToken;
//         console.log("for uploading secret")
//         console.log(secretAccessKey)
//         let creds = {
//           accessKeyId: `${accessKeyId}`,
//           secretAccessKey: `${secretAccessKey}`,
//           sessionToken: `${sessionToken}`
//         };
//         // var creds = new AWS.Credentials({
//         //     accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, sessionToken: sessionToken
//         //   });
//         // console.log("mid creds");
//         // console.log(creds);
//         let s3 = new AWS.S3({
//           creds,
//           signatureVersion: "v4"
//         });

//         let name = elem.fileName;
//         const fileFormat = name.split(".")[0];
//         const partnerNameFromFile = fileFormat.split("_");
//         let jsonName = name.substr(0, name.lastIndexOf(".")) + ".JSON";

//         /*
//          * Check Partner id is in system using the csv saved in s3. This csv must be up to date
//          */
//         let checkPartnerCode = {
//           Bucket: process.env.Main_Bucket,
//           Key: `RCL/Partner-List/${process.env.Partner_ID}`
//         };

//         let paramsForArchivedObject = {
//           Bucket: process.env.Main_Bucket,
//           Key: `RCL/Archive/Users/${elem.email}/${jsonName}`
//         };
//         let checkUserObjectInActive = {
//           Bucket: process.env.Main_Bucket,
//           Key: `RCL/Active/Users/${elem.email}/${jsonName}`
//         };
//         let checkUserEmailInActive = {
//           Bucket: process.env.Main_Bucket,
//           Key: `RCL/Active/Users/${elem.email}/`
//         };

//         // var test = '';--------------------------commented out code which is algorithm to check if partner code exists using file uploaded in s3 to "Partner-List"
//         s3.getObject(checkPartnerCode, function(partnerErr, partnerData) {
//           console.log("starting getobject");
//           if (partnerErr) {
//             // console.log(partnerErr);
//             res.json(partnerErr);
//           } else {
//             partnerCheck.readFile(
//               partnerData.Body,
//               userData,
//               partnerNameFromFile[0],
//               checkPartnerExists
//             );

//             function checkPartnerExists(el) {
//               switch (el) {
//                 case "Partner exists":
//                   // console.log("yes");
//                   stepToUpload();
//                   break;
//                 case "Partner does not exist":
//                   res.json("unauthorized-Partner");
//                   return false;
//                 default:
//                 //nothing
//               }
//             }
//           }
//         });

//         stepToUpload = () => {
//           s3.headObject(checkUserEmailInActive, function(
//             noEmailError,
//             checkEmailData
//           ) {
//             if (noEmailError) {
//               // console.log("noemail");
//               // console.log(noEmailError);
//               res.json("noEmail"); //---if email doesn't exist throw the error back saying email doesn't exist if not check if file exists inside email
//             } else {
//               //if email exists, then check if object exists in Active, if not then make sure its not in Archive either before allowing upload
//               s3.headObject(checkUserObjectInActive, function(
//                 noActiveObjErr,
//                 checkActiveObj
//               ) {
//                 if (noActiveObjErr) {
//                   s3.headObject(paramsForArchivedObject, function(
//                     noArchiveObjErr,
//                     checkArchiveObj
//                   ) {
//                     if (noArchiveObjErr) {
//                       res.json("noFile");
//                     }
//                     //---if file exists in archive object throw error to user--
//                     else {
//                       //file exists in Archive;
//                       res.json("fileExists");
//                     }
//                   });
//                 } else {
//                   //---if file exists in active object throw error to user--
//                   //file exists in Active;
//                   // console.log("fileExists");
//                   res.json("fileExists");
//                 }
//               });
//               //-------------------------------------------------------------------------------------//
//             }
//           });
//         };
//       } else {
//         console.log("errored on creds");
//         console.log(err);
//       }
//     });
//   } //----------end of runNext()
// }); //-------------------for creating a object from email attachment in json

// //-------------------for creating a object from email attachment in json
// router.post("/transfer/sendtos3", function(req, res, next) {
//   // const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
//   // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   //     IdentityPoolId: process.env.IdentityPoolId,
//   //     Logins: {
//   //         [process.env.CognitoIdp]: req.body.val.idToken
//   //     },
//   //     LoginId: req.body.val.email,
//   //     region: process.env.Region
//   // });
//   let forDoingPutInS3 = req.body.val;
//   console.log("-----on upload-----");
//   AWS.config.credentials.get(function(err) {
//     if (err) {
//       res.json(err);
//     } else {
//       // console.log(AWS.config.credentials.data)
//       let accessKeyId = AWS.config.credentials.accessKeyId;
//       let secretAccessKey = AWS.config.credentials.secretAccessKey;
//       let sessionToken = AWS.config.credentials.sessionToken;
//       // let identityId = AWS.config.credentials.identityId;
//       let creds = {
//         accessKeyId: `${accessKeyId}`,
//         secretAccessKey: `${secretAccessKey}`,
//         sessionToken: `${sessionToken}`
//       };
//       // console.log("last creds");
//       // console.log(creds)
//       let s3 = new AWS.S3({
//         creds,
//         signatureVersion: "v4"
//       });
//       const putObjectData = {
//         Bucket: process.env.Main_Bucket,
//         Key: `RCL/Active/Users/${req.body.val.email}/${req.body.jsonName}`,
//         Body: JSON.stringify(req.body.jsonReadyForS3),
//         ServerSideEncryption: process.env.Encryption
//       };
//       s3.putObject(putObjectData, async (err2, data2) => {
//         if (err2) {
//           //This happens if error in putobject occurs
//           // var paramsLogout = {
//           //     AccessToken: `${forDoingPutInS3.acToken}` /* required */
//           // };
//           cognitoidentityserviceprovider.globalSignOut(paramsLogout, function(
//             errout1,
//             dataout1
//           ) {
//             if (errout1) {
//               //if logout failure occurs
//               // res.json({
//               //     putData: errout1,
//               //     signOut: false
//               // });
//             } else {
//               //logout success!
//               // res.json({
//               //     putData: dataout1,
//               //     signOut: true
//               // });
//             }
//           });
//           res.json(err2);
//         } else {
//           //after put object sign out the user
//           let paramsLogout = {
//             AccessToken: `${forDoingPutInS3.acToken}` /* required */
//           };
//           cognitoidentityserviceprovider.globalSignOut(paramsLogout, function(
//             err3,
//             data3
//           ) {
//             if (err3) {
//               //if logout failure occurs
//               res.json({
//                 putData: err3,
//                 signOut: false
//               });
//             } else {
//               //logout success!
//               res.json({
//                 putData: data2,
//                 signOut: true
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// });

module.exports = router;
