const express = require("express");
const router = express.Router();
require("dotenv").config();
var multer = require("multer");
var upload = multer();
const parse = require("csv-parse");
// global.fetch = require('node-fetch');
var jdeAlgo = require("../login/jdeLambdaParser");
var partnerCheck = require("../login/partnerCheck");
let constructor = require("../constructors");
// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
AWS.config.update({
  region: "ca-central-1"
});
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

router.post("/coverter/csvjson", upload.single("csv"), (req, res) => {
  //---------gets the file from client side and convert to json
  // console.log("csv");
  const sampleFile = req.file.buffer.toString("utf8");
  // console.log(sampleFile);
  parse(
    sampleFile,
    {
      columns: true
    },
    function(err, data) {
      let dataReturnedFromAlgo = jdeAlgo.storeData(data);
      // console.log(dataReturnedFromAlgo)
      if (!dataReturnedFromAlgo) {
        // console.log('Please follow header guidelines');
        res.json("Please follow header guidelines");
      } else {
        //  console.log(x);
        res.json(dataReturnedFromAlgo);
      }
    }
  );
});

//-------------------for creating a object from email attachment in json
router.post("/transfer/checks3", function(req, res, next) {
  console.log("transfer started");
  let mainParams = req.body.val;

  let tokenForSpecificUser = {
    AccessToken: `${mainParams.acToken}` /* required */
  };
  cognitoidentityserviceprovider.getUser(tokenForSpecificUser, function(
    err1,
    data1
  ) {
    if (err1) {
      //GET USER FAILED
      console.log("error on check");
      console.log(err1);
      res.json("noAuth");
    } else {
      //GET USER SUCCESS
      console.log("get user results");
      console.log(data1);

      runNext(mainParams, req.body.jsonReadyForS3);
    }
  });

  function runNext(elem, userData) {
    let name = elem.fileName;
    const fileFormat = name.split(".")[0];
    const partnerNameFromFile = fileFormat.split("_");
    let jsonName = name.substr(0, name.lastIndexOf(".")) + ".JSON";

    // Temporary credentials will be available when this function is called.
    constructor.getTempCreds(s3CheckActions);
    /*
     * Check Partner id is in system using the csv saved in s3. This csv must be up to date
     */
    let checkPartnerCode = constructor.checkPartnerCode(
      process.env.Main_Bucket,
      process.env.Partner_ID
    );
    let checkUserObjectInArchive = constructor.checkUserObjectInArchive(
      process.env.Main_Bucket,
      elem.email,
      jsonName
    );
    let checkUserObjectInActive = constructor.checkUserObjectInActive(
      process.env.Main_Bucket,
      elem.email,
      jsonName
    );
    let checkUserEmailInActive = constructor.checkUserEmailInActive(
      process.env.Main_Bucket,
      elem.email
    );
    function s3CheckActions(s3) {
      // var test = '';--------------------------commented out code which is algorithm to check if partner code exists using file uploaded in s3 to "Partner-List"
      s3.getObject(checkPartnerCode, function(partnerErr, partnerData) {
        console.log("starting getobject");
        if (partnerErr) {
          res.json(partnerErr);
        } else {
          partnerCheck.readFile(
            partnerData.Body,
            userData,
            partnerNameFromFile[0],
            checkPartnerExists_Callback
          );

          function checkPartnerExists_Callback(el) {
            switch (el) {
              case "Partner exists":
                // console.log("yes");
                stepToUpload();
                break;
              case "Partner does not exist":
                res.json("unauthorized-Partner");
                return false;
              default:
              //nothing
            }
          }
        }
      });

      stepToUpload = () => {
        s3.headObject(checkUserEmailInActive, function(
          noEmailError,
          checkEmailData
        ) {
          if (noEmailError) {
            // console.log("noemail");
            console.log(noEmailError);
            res.json("noEmail"); //---if email doesn't exist throw the error back saying email doesn't exist if not check if file exists inside email
          } else {
            //if email exists, then check if object exists in Active, if not then make sure its not in Archive either before allowing upload
            s3.headObject(checkUserObjectInActive, function(
              noActiveObjExists,
              checkActiveObj
            ) {
              if (noActiveObjExists) {
                s3.headObject(checkUserObjectInArchive, function(
                  noArchiveObjExists,
                  archiveObjData
                ) {
                  if (noArchiveObjExists) {
                    res.json("noFile");
                  }
                  //---if file exists in archive object throw error to user--
                  else {
                    //file exists in Archive;
                    res.json("fileExists");
                  }
                });
              } else {
                //---if file exists in active object throw error to user--
                //file exists in Active;
                // console.log("fileExists");
                res.json("fileExists");
              }
            });
          }
        });
      };
    }
  } //----------end of runNext()
}); //-------------------for creating a object from email attachment in json

//-------------------for creating a object from email attachment in json
router.post("/transfer/sendtos3", function(req, res, next) {
  let forDoingPutInS3 = req.body.val;
  console.log("-----on upload-----");
  // Temporary credentials will be available when this function is called.
  constructor.getTempCreds(s3InputActions);

  const putObjectData = {
    Bucket: process.env.Main_Bucket,
    Key: `RCL/Active/Users/${req.body.val.email}/${req.body.jsonName}`,
    Body: JSON.stringify(req.body.jsonReadyForS3),
    ServerSideEncryption: process.env.Encryption
  };

  function s3InputActions(s3) {
    s3.putObject(putObjectData, async (err2, data2) => {
      if (err2) {
        //This happens if error in putobject occurs
        var paramsLogout = {
          AccessToken: `${forDoingPutInS3.acToken}` /* required */
        };
        console.log("cant upload");
        console.log(err2);
        cognitoidentityserviceprovider.globalSignOut(paramsLogout, function(
          errout1,
          dataout1
        ) {
          if (errout1) {
            //if logout failure occurs
            // res.json({
            //     putData: errout1,
            //     signOut: false
            // });
          } else {
            //logout success!
            console.log("logout after error success");
            // res.json({
            //     putData: dataout1,
            //     signOut: true
            // });
          }
        });
        res.json(err2);
      } else {
        //after put object sign out the user
        let paramsLogout = {
          AccessToken: `${forDoingPutInS3.acToken}` /* required */
        };
        cognitoidentityserviceprovider.globalSignOut(paramsLogout, function(
          err3,
          data3
        ) {
          if (err3) {
            //if logout failure occurs
            res.json({
              putData: err3,
              signOut: false
            });
          } else {
            //logout success!
            res.json({
              putData: data2,
              signOut: true
            });
          }
        });
      }
    });
  }
});

module.exports = router;
