const parse = require("csv-parse");
const fs = require("fs");
var readFile = function(eldata, userData, partnerNameFromFile, callback) {
  var result = [];

  parse(eldata, {
    columns: true
  })
    .on("data", function(data) {
      Object.keys(data).map(function(key, index) {
        // console.log(data[key])
        result.push(data[key]);
      });
      // result = inresult;
      // console.log(result);
    })
    .on("end", function() {
      // console.log("tetsts");
      // console.log(result);
      passVerifier(result, userData, partnerNameFromFile, callback);
    });
};

//first check if all partner codes are the same in list of array of json objects
//then check if the unique partner code from json data matches allowed partner id
function passVerifier(result, userData, partnerNameFromFile, callback) {
  // console.log(userData.originalData)
  // var getFirstPartnerID = userData['originalData'][0]['Partner Code'].toUpperCase();
  var getFirstPartnerID = partnerNameFromFile;
  // console.log(`first partnerid:${getFirstPartnerID}`)
  var firstTest = {
    val: "",
    status: null
  };
  if (result.includes(partnerNameFromFile.toUpperCase())) {
    try {
      Object.values(userData["originalData"]).forEach(obj => {
        // console.log(obj['Code'].toUpperCase())
        if (obj["Code"].toUpperCase() !== getFirstPartnerID) {
          //if mismatch do this
          // console.log("no match");
          firstTest.val = obj["Code"].toUpperCase();
          firstTest.status = false;
          throw "unauthorized";
        } else {
          //if match do this
          // console.log("match");
          firstTest.val = getFirstPartnerID;
          firstTest.status = true;
        }
      });
    } catch (e) {
      if (e === "unauthorized") {
        // console.log("not exist")
        callback("Partner does not exist");
        return false;
      }
    }
    // console.log("exist")
    callback("Partner exists");
  } else {
    callback("Partner does not exist");
  }
}

module.exports = {
  readFile
};
