var AWS = require("aws-sdk");

function checkPartnerCode(Main_Bucket, Partner_ID) {
  return {
    Bucket: Main_Bucket,
    Key: `RCL/Partner-List/${Partner_ID}`
  };
}

function checkUserObjectInArchive(Main_Bucket, email, jsonName) {
  return {
    Bucket: Main_Bucket,
    Key: `RCL/Archive/Users/${email}/${jsonName}`
  };
}

function checkUserObjectInActive(Main_Bucket, email, jsonName) {
  return {
    Bucket: Main_Bucket,
    Key: `RCL/Active/Users/${email}/${jsonName}`
  };
}
function checkUserEmailInActive(Main_Bucket, email) {
  return {
    Bucket: Main_Bucket,
    Key: `RCL/Active/Users/${email}/`
  };
}

function putObjectData(
  Main_Bucket,
  email,
  jsonName,
  jsonReadyForS3,
  Encryption
) {
  return {
    Bucket: Main_Bucket,
    Key: `RCL/Active/Users/${email}/${jsonName}`,
    Body: JSON.stringify(jsonReadyForS3),
    ServerSideEncryption:Encryption
  };
}

function temporaryCredCreator(accessKeyId, secretAccessKey, sessionToken) {
  return {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken
  };
}

function s3CredObject(creds) {
  return {
    creds,
    signatureVersion: "v4"
  };
}

let storeTemp = {
  creds: null,
  s3: null
};

function getTempCreds(callback) {
  AWS.config.credentials.get(function(err) {
    if (!err) {
      let creds = temporaryCredCreator(
        AWS.config.credentials.accessKeyId,
        AWS.config.credentials.secretAccessKey,
        AWS.config.credentials.sessionToken
      );
      let s3 = new AWS.S3(s3CredObject(creds));

      callback(s3);
    } else {
      console.log("errored on creds");
      console.log(err);
    }
  });
}

module.exports = {
  checkPartnerCode,
  checkUserObjectInActive,
  checkUserObjectInArchive,
  checkUserEmailInActive,
  putObjectData,
  temporaryCredCreator,
  s3CredObject,
  storeTemp,
  getTempCreds
};
