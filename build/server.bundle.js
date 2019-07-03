/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = function (app) {\n  app.use(\"/main\", __webpack_require__(/*! ./main */ \"./routes/main/index.js\"));\n};\n\n//# sourceURL=webpack:///./routes/index.js?");

/***/ }),

/***/ "./routes/loginMapCreator.js":
/*!***********************************!*\
  !*** ./routes/loginMapCreator.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nfunction createLoginMap(identpoolid, cognitoidp, token, user, region) {\n  return {\n    IdentityPoolId: identpoolid,\n    Logins: _defineProperty({}, cognitoidp, token),\n    LoginId: user,\n    region: region\n  };\n}\n\nstoreData = {\n  token: null,\n  user: null\n};\n\nfunction showstuff() {\n  console.log(process.env.IdentityPoolId);\n}\n\nmodule.exports = {\n  createLoginMap: createLoginMap,\n  storeData: storeData,\n  showstuff: showstuff\n};\n\n//# sourceURL=webpack:///./routes/loginMapCreator.js?");

/***/ }),

/***/ "./routes/main/contact/contact.js":
/*!****************************************!*\
  !*** ./routes/main/contact/contact.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar mailer = __webpack_require__(/*! ./sendMail */ \"./routes/main/contact/sendMail.js\");\n\nvar AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nAWS.config.update({\n  region: \"us-east-1\"\n});\nrouter.post(\"/sendinfo\", function (req, res, next) {\n  // console.log(req.body)\n  return mailer.sendMail(\"\".concat(process.env.Contact_Email), [\"\".concat(process.env.Contact_Email)], req.body).then(function () {\n    return res.send(req.body);\n  }).catch(next);\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/main/contact/contact.js?");

/***/ }),

/***/ "./routes/main/contact/index.js":
/*!**************************************!*\
  !*** ./routes/main/contact/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MainLoginRouter = __webpack_require__(/*! express */ \"express\").Router(); // MainUserRouter.route(\"/activate\").get(require(\"./activate\")).post(require(\"./activate\"));\n\n\nMainLoginRouter.use(\"/auth\", __webpack_require__(/*! ./contact */ \"./routes/main/contact/contact.js\"));\nmodule.exports = MainLoginRouter;\n\n//# sourceURL=webpack:///./routes/main/contact/index.js?");

/***/ }),

/***/ "./routes/main/contact/sendMail.js":
/*!*****************************************!*\
  !*** ./routes/main/contact/sendMail.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nAWS.config.update({\n  region: \"us-east-1\"\n});\n\nvar htmlTemplate = function htmlTemplate(data) {\n  return \"\\n    <p><strong>Name:</strong> \".concat(data.name, \"</p>\\n    <p><strong>Email:</strong> <a href=\\\"mailto:\").concat(data.email, \"\\\">\").concat(data.email, \"</a></p>\\n    <p><strong>Message:</strong> \").concat(data.message, \"</p>\\n  \");\n};\n\nmodule.exports.sendMail = function (sender, receivers, data) {\n  console.log(data);\n  var params = {\n    Destination: {\n      ToAddresses: receivers\n    },\n    Message: {\n      Subject: {\n        Charset: \"UTF-8\",\n        Data: \"Website Enquiry\"\n      },\n      Body: {\n        Html: {\n          Charset: \"UTF-8\",\n          Data: htmlTemplate(data)\n        }\n      }\n    },\n    Source: sender\n  };\n  var sendPromise = new AWS.SES().sendEmail(params).promise();\n  return sendPromise.then(function (data) {\n    return data;\n  }).catch(function (err) {\n    throw new Error(err);\n  });\n};\n\n//# sourceURL=webpack:///./routes/main/contact/sendMail.js?");

/***/ }),

/***/ "./routes/main/index.js":
/*!******************************!*\
  !*** ./routes/main/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MainRouter = __webpack_require__(/*! express */ \"express\").Router(); // MainRouter.use(\"/portal\",require(\"./portal\"));\n\n\nMainRouter.use(\"/login\", __webpack_require__(/*! ./login */ \"./routes/main/login/index.js\"));\nMainRouter.use(\"/contactowner\", __webpack_require__(/*! ./contact */ \"./routes/main/contact/index.js\"));\nmodule.exports = MainRouter; // const routes = require('express').Router();\n// const login = require('./login');\n// routes.use('/login', login);\n// routes.get('/', (req, res) => {\n//   res.status(200).json({ message: 'Connected!' });\n// });\n// module.exports = routes;\n\n//# sourceURL=webpack:///./routes/main/index.js?");

/***/ }),

/***/ "./routes/main/login/authPortalRoute.js":
/*!**********************************************!*\
  !*** ./routes/main/login/authPortalRoute.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar upload = multer();\n\nvar parse = __webpack_require__(/*! csv-parse */ \"csv-parse\"); // global.fetch = require(\"node-fetch\");\n\n\nvar jdeAlgo = __webpack_require__(/*! ../login/jdeLambdaParser */ \"./routes/main/login/jdeLambdaParser.js\");\n\nvar partnerCheck = __webpack_require__(/*! ../login/partnerCheck */ \"./routes/main/login/partnerCheck.js\");\n\nvar AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nvar testmod = __webpack_require__(/*! ../../loginMapCreator */ \"./routes/loginMapCreator.js\");\n\nAWS.config.update({\n  region: 'ca-central-1'\n});\nvar cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();\nvar cognitoidentity = new AWS.CognitoIdentity();\nrouter.post(\"/authenticateuser\", function (req, res) {\n  console.log(\"server\");\n  console.log(process.env.IdentityPoolId); // console.log(testmod.showstuff())\n  // console.log(\"----------\")\n\n  var val = req.body;\n  var user = val.value.user;\n  console.log(val);\n  var loginParams = {\n    AuthFlow: \"USER_PASSWORD_AUTH\",\n\n    /* required */\n    ClientId: process.env.ClientId,\n\n    /* required */\n    AuthParameters: {\n      USERNAME: val.value.user,\n      PASSWORD: val.value.pass\n    }\n  };\n  cognitoidentityserviceprovider.initiateAuth(loginParams, function (err, data) {\n    if (err) {\n      console.log(err, err.stack); // an error occurred\n\n      res.json(err);\n    } else {\n      //   console.log(data); // successful response\n      if (data.ChallengeName === process.env.Challenge_NEW_PASS) {\n        res.json({\n          changePass: \"changepass\",\n          session: data.Session\n        });\n      } else if (data.ChallengeName === process.env.Challenge_MFA) {\n        console.log(data);\n        res.json({\n          MFA: \"MFA\",\n          session: data.Session,\n          user: val.value.user\n        });\n      } else {\n        var accessToken = data.AuthenticationResult.AccessToken; // Add the User's Id Token to the Cognito credentials login map.\n\n        var idToken = data.AuthenticationResult.IdToken;\n        console.log(idToken); // var testing=testmod.createLoginMap(process.env.IdentityPoolId,process.env.CognitoIdp,idToken,user,process.env.Region)\n\n        AWS.config.credentials = new AWS.CognitoIdentityCredentials({\n          IdentityPoolId: process.env.IdentityPoolId,\n          Logins: _defineProperty({}, process.env.CognitoIdp, idToken),\n          LoginId: val.value.user,\n          region: process.env.Region\n        });\n        AWS.config.credentials.get(function (err) {\n          if (!err) {\n            var accessKeyId, secretAccessKey, sessionToken; // console.log(Object.keys(AWS.config.credentials.data.Credentials));\n            // console.log(\"-----before check-----\")\n            // console.log(AWS.config.credentials);\n            // console.log(AWS.config.credentials.data)\n\n            accessKeyId = AWS.config.credentials.accessKeyId;\n            secretAccessKey = AWS.config.credentials.secretAccessKey;\n            sessionToken = AWS.config.credentials.sessionToken;\n            console.log(\"session token\");\n            console.log(sessionToken);\n          } else {\n            console.log(\"errored on auth\");\n            console.log(err);\n          }\n        }); // AWS.config.credentials = new AWS.CognitoIdentityCredentials({\n        //   IdentityPoolId: process.env.IdentityPoolId,\n        //   Logins: {\n        //     [process.env.CognitoIdp]: idToken\n        //   },\n        //   LoginId: val.value.user,\n        //   region: process.env.Region\n        // });\n\n        res.json({\n          accessToken: accessToken,\n          idToken: idToken,\n          user: val.value.user\n        });\n      }\n    }\n  });\n});\nrouter.post(\"/sendnewpass\", function (req, res) {\n  var newPassParams = {\n    ChallengeName: process.env.Challenge_NEW_PASS,\n\n    /* required */\n    ClientId: process.env.ClientId,\n\n    /* required */\n    ChallengeResponses: {\n      USERNAME: \"\".concat(req.body.user),\n      NEW_PASSWORD: \"\".concat(req.body.newPass)\n      /* '<StringType>': ... */\n\n    },\n    Session: req.body.session\n  };\n  cognitoidentityserviceprovider.respondToAuthChallenge(newPassParams, function (err, data) {\n    if (err) {\n      //   console.log(err, err.stack); // an error occurred\n      res.json(err);\n    } else {\n      //   console.log(data); // successful response\n      if (data.ChallengeName === process.env.Challenge_MFA) {\n        console.log(data);\n        res.json({\n          MFA: \"MFA\",\n          session: data.Session,\n          user: req.body.user\n        });\n      } else {\n        var accessToken = data.AuthenticationResult.AccessToken; // Add the User's Id Token to the Cognito credentials login map.\n\n        var idToken = data.AuthenticationResult.IdToken;\n        res.json({\n          accessToken: accessToken,\n          idToken: idToken,\n          user: req.body.user\n        });\n      }\n    }\n  });\n}); //--------------SEND MFA CODE ONCE RECEIVED-------------------//\n\nrouter.post(\"/sendmfa\", function (req, res) {\n  var val = req.body;\n  var user = req.body.value.user; // console.log(val.value.user);\n  // console.log(val.value.MFA)\n  // const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();\n\n  var mfaParams = {\n    ChallengeName: process.env.Challenge_MFA,\n\n    /* required */\n    ClientId: process.env.ClientId,\n\n    /* required */\n    ChallengeResponses: {\n      USERNAME: \"\".concat(req.body.value.user),\n      SMS_MFA_CODE: \"\".concat(val.value.MFA)\n      /* '<StringType>': ... */\n\n    },\n    Session: req.body.value.session\n  };\n  cognitoidentityserviceprovider.respondToAuthChallenge(mfaParams, function (err, data) {\n    if (err) {\n      // console.log(err, err.stack); // an error occurred\n      res.json(err);\n    } else {\n      // console.log(data);           // successful response\n      var accessToken = data.AuthenticationResult.AccessToken;\n      var idToken = data.AuthenticationResult.IdToken;\n      AWS.config.credentials = new AWS.CognitoIdentityCredentials(testmod.createLoginMap(idToken, user)); // AWS.config.credentials = new AWS.CognitoIdentityCredentials({\n      //   IdentityPoolId: process.env.IdentityPoolId,\n      //   Logins: {\n      //     [process.env.CognitoIdp]: idToken\n      //   },\n      //   LoginId: val.value.user,\n      //   region: process.env.Region\n      // });\n\n      res.json({\n        accessToken: accessToken,\n        idToken: idToken,\n        user: req.body.value.user\n      });\n    }\n  });\n});\nrouter.post(\"/logoutuser\", function (req, res) {\n  var x = JSON.parse(req.body.value.uservalTemp);\n  console.log(x);\n  var paramsLogout = {\n    AccessToken: \"\".concat(x.accessToken)\n    /* required */\n\n  };\n  cognitoidentityserviceprovider.globalSignOut(paramsLogout, function (err, data) {\n    if (err) {\n      //if logout failure occurs\n      res.json({\n        putData: err,\n        signOut: false\n      });\n    } else {\n      //logout success!\n      res.json({\n        putData: data,\n        signOut: true\n      });\n    }\n  });\n});\nrouter.post(\"/coverter/csvjson\", upload.single(\"csv\"), function (req, res) {\n  //---------gets the file from client side and convert to json\n  // console.log(\"csv\");\n  var sampleFile = req.file.buffer.toString(\"utf8\"); // console.log(sampleFile);\n\n  parse(sampleFile, {\n    columns: true\n  }, function (err, data) {\n    var dataReturnedFromAlgo = jdeAlgo.storeData(data); // console.log(dataReturnedFromAlgo)\n\n    if (!dataReturnedFromAlgo) {\n      // console.log('Please follow header guidelines');\n      res.json(\"Please follow header guidelines\");\n    } else {\n      //  console.log(x);\n      res.json(dataReturnedFromAlgo);\n    } // console.log(x);\n\n  });\n}); //-------------------for creating a object from email attachment in json\n\nrouter.post(\"/transfer/checks3\", function (req, res, next) {\n  console.log(\"transfer started\");\n  var mainParams = req.body.val; //   console.log(AWS.config.credentials);\n  // console.log(\"run next\");\n\n  console.log(mainParams); // const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();\n\n  var tokenForSpecificUser = {\n    AccessToken: \"\".concat(mainParams.acToken)\n    /* required */\n\n  };\n  cognitoidentityserviceprovider.getUser(tokenForSpecificUser, function (err1, data1) {\n    if (err1) {\n      //GET USER FAILED\n      console.log(\"error on check\");\n      console.log(err1);\n      res.json(\"noAuth\");\n    } else {\n      //GET USER SUCCESS\n      console.log(\"get user results\");\n      console.log(data1);\n      runNext(mainParams, req.body.jsonReadyForS3);\n    }\n  });\n\n  function runNext(elem, userData) {\n    //get the creds of the user using token\n    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({\n    //     IdentityPoolId: process.env.IdentityPoolId,\n    //     Logins: {\n    //         [process.env.CognitoIdp]: testmod.storeData.token\n    //     },\n    //     LoginId: testmod.storeData.user,\n    //     region: process.env.Region\n    // });\n    // Credentials will be available when this function is called.\n    AWS.config.credentials.get(function (err) {\n      if (!err) {\n        var accessKeyId, secretAccessKey, sessionToken; // console.log(Object.keys(AWS.config.credentials.data.Credentials));\n        // console.log(\"-----before check-----\")\n        // console.log(AWS.config.credentials);\n        // console.log(AWS.config.credentials.data)\n\n        accessKeyId = AWS.config.credentials.accessKeyId;\n        secretAccessKey = AWS.config.credentials.secretAccessKey;\n        sessionToken = AWS.config.credentials.sessionToken;\n        var creds = {\n          accessKeyId: \"\".concat(accessKeyId),\n          secretAccessKey: \"\".concat(secretAccessKey),\n          sessionToken: \"\".concat(sessionToken)\n        }; // var creds = new AWS.Credentials({\n        //     accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, sessionToken: sessionToken\n        //   });\n        // console.log(\"mid creds\");\n        // console.log(creds);\n\n        var s3 = new AWS.S3({\n          creds: creds,\n          signatureVersion: \"v4\"\n        });\n        var name = elem.fileName;\n        var fileFormat = name.split(\".\")[0];\n        var partnerNameFromFile = fileFormat.split(\"_\");\n        var jsonName = name.substr(0, name.lastIndexOf(\".\")) + \".JSON\";\n        /*\n         * Check Partner id is in system using the csv saved in s3. This csv must be up to date\n         */\n\n        var checkPartnerCode = {\n          Bucket: process.env.Main_Bucket,\n          Key: \"RCL/Partner-List/\".concat(process.env.Partner_ID)\n        };\n        var paramsForArchivedObject = {\n          Bucket: process.env.Main_Bucket,\n          Key: \"RCL/Archive/Users/\".concat(elem.email, \"/\").concat(jsonName)\n        };\n        var checkUserObjectInActive = {\n          Bucket: process.env.Main_Bucket,\n          Key: \"RCL/Active/Users/\".concat(elem.email, \"/\").concat(jsonName)\n        };\n        var checkUserEmailInActive = {\n          Bucket: process.env.Main_Bucket,\n          Key: \"RCL/Active/Users/\".concat(elem.email, \"/\")\n        }; // var test = '';--------------------------commented out code which is algorithm to check if partner code exists using file uploaded in s3 to \"Partner-List\"\n\n        s3.getObject(checkPartnerCode, function (partnerErr, partnerData) {\n          console.log(\"starting getobject\");\n\n          if (partnerErr) {\n            // console.log(partnerErr);\n            res.json(partnerErr);\n          } else {\n            var checkPartnerExists = function checkPartnerExists(el) {\n              switch (el) {\n                case \"Partner exists\":\n                  // console.log(\"yes\");\n                  stepToUpload();\n                  break;\n\n                case \"Partner does not exist\":\n                  res.json(\"unauthorized-Partner\");\n                  return false;\n\n                default: //nothing\n\n              }\n            };\n\n            partnerCheck.readFile(partnerData.Body, userData, partnerNameFromFile[0], checkPartnerExists);\n          }\n        });\n\n        stepToUpload = function stepToUpload() {\n          s3.headObject(checkUserEmailInActive, function (noEmailError, checkEmailData) {\n            if (noEmailError) {\n              // console.log(\"noemail\");\n              // console.log(noEmailError);\n              res.json(\"noEmail\"); //---if email doesn't exist throw the error back saying email doesn't exist if not check if file exists inside email\n            } else {\n              //if email exists, then check if object exists in Active, if not then make sure its not in Archive either before allowing upload\n              s3.headObject(checkUserObjectInActive, function (noActiveObjErr, checkActiveObj) {\n                if (noActiveObjErr) {\n                  s3.headObject(paramsForArchivedObject, function (noArchiveObjErr, checkArchiveObj) {\n                    if (noArchiveObjErr) {\n                      res.json(\"noFile\");\n                    } //---if file exists in archive object throw error to user--\n                    else {\n                        //file exists in Archive;\n                        res.json(\"fileExists\");\n                      }\n                  });\n                } else {\n                  //---if file exists in active object throw error to user--\n                  //file exists in Active;\n                  // console.log(\"fileExists\");\n                  res.json(\"fileExists\");\n                }\n              }); //-------------------------------------------------------------------------------------//\n            }\n          });\n        };\n      } else {\n        console.log(\"errored on creds\");\n        console.log(err);\n      }\n    });\n  } //----------end of runNext()\n\n}); //-------------------for creating a object from email attachment in json\n//-------------------for creating a object from email attachment in json\n\nrouter.post(\"/transfer/sendtos3\", function (req, res, next) {\n  // const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();\n  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({\n  //     IdentityPoolId: process.env.IdentityPoolId,\n  //     Logins: {\n  //         [process.env.CognitoIdp]: req.body.val.idToken\n  //     },\n  //     LoginId: req.body.val.email,\n  //     region: process.env.Region\n  // });\n  var forDoingPutInS3 = req.body.val;\n  console.log(\"-----on upload-----\");\n  AWS.config.credentials.get(function (err) {\n    if (err) {\n      res.json(err);\n    } else {\n      // console.log(AWS.config.credentials.data)\n      var accessKeyId = AWS.config.credentials.accessKeyId;\n      var secretAccessKey = AWS.config.credentials.secretAccessKey;\n      var sessionToken = AWS.config.credentials.sessionToken; // let identityId = AWS.config.credentials.identityId;\n\n      var creds = {\n        accessKeyId: \"\".concat(accessKeyId),\n        secretAccessKey: \"\".concat(secretAccessKey),\n        sessionToken: \"\".concat(sessionToken)\n      }; // console.log(\"last creds\");\n      // console.log(creds)\n\n      var s3 = new AWS.S3({\n        creds: creds,\n        signatureVersion: \"v4\"\n      });\n      var putObjectData = {\n        Bucket: process.env.Main_Bucket,\n        Key: \"RCL/Active/Users/\".concat(req.body.val.email, \"/\").concat(req.body.jsonName),\n        Body: JSON.stringify(req.body.jsonReadyForS3),\n        ServerSideEncryption: process.env.Encryption\n      };\n      s3.putObject(putObjectData,\n      /*#__PURE__*/\n      function () {\n        var _ref = _asyncToGenerator(\n        /*#__PURE__*/\n        regeneratorRuntime.mark(function _callee(err2, data2) {\n          var _paramsLogout;\n\n          return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  if (err2) {\n                    //This happens if error in putobject occurs\n                    // var paramsLogout = {\n                    //     AccessToken: `${forDoingPutInS3.acToken}` /* required */\n                    // };\n                    cognitoidentityserviceprovider.globalSignOut(paramsLogout, function (errout1, dataout1) {\n                      if (errout1) {//if logout failure occurs\n                        // res.json({\n                        //     putData: errout1,\n                        //     signOut: false\n                        // });\n                      } else {//logout success!\n                          // res.json({\n                          //     putData: dataout1,\n                          //     signOut: true\n                          // });\n                        }\n                    });\n                    res.json(err2);\n                  } else {\n                    //after put object sign out the user\n                    _paramsLogout = {\n                      AccessToken: \"\".concat(forDoingPutInS3.acToken)\n                      /* required */\n\n                    };\n                    cognitoidentityserviceprovider.globalSignOut(_paramsLogout, function (err3, data3) {\n                      if (err3) {\n                        //if logout failure occurs\n                        res.json({\n                          putData: err3,\n                          signOut: false\n                        });\n                      } else {\n                        //logout success!\n                        res.json({\n                          putData: data2,\n                          signOut: true\n                        });\n                      }\n                    });\n                  }\n\n                case 1:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee);\n        }));\n\n        return function (_x, _x2) {\n          return _ref.apply(this, arguments);\n        };\n      }());\n    }\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/main/login/authPortalRoute.js?");

/***/ }),

/***/ "./routes/main/login/index.js":
/*!************************************!*\
  !*** ./routes/main/login/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MainLoginRouter = __webpack_require__(/*! express */ \"express\").Router(); // MainUserRouter.route(\"/activate\").get(require(\"./activate\")).post(require(\"./activate\"));\n\n\nMainLoginRouter.get(\"/auth\", __webpack_require__(/*! ./authPortalRoute */ \"./routes/main/login/authPortalRoute.js\"));\nmodule.exports = MainLoginRouter;\n\n//# sourceURL=webpack:///./routes/main/login/index.js?");

/***/ }),

/***/ "./routes/main/login/jdeLambdaParser.js":
/*!**********************************************!*\
  !*** ./routes/main/login/jdeLambdaParser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar colID = {\n  ACCOUNT: 20,\n  DESCRIPTION: 21,\n  AMOUNT: 22,\n  CODE: 23,\n  YEAR: 24,\n  MONTH: 25,\n  ID: 26\n};\nvar headID = {// \"Partner Code\": 16\n  // \"Year\": 20,\n  // \"Month\": 22,\n  // \"Transaction Date\":24\n};\n\nvar storeData = function storeData(el) {\n  var finalForJDE = [];\n  var headerCheck = [];\n  var originalData;\n  originalData = el;\n  var grid = [];\n\n  var row = function row(val) {\n    this.gridColumnEvents = val;\n  };\n\n  var i = 0;\n  /*\n   -------------------- CHECK HEADER BEFORE CONTINUING -------------------\n    */\n\n  headerCheck = Object.entries(originalData[0]).map(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        key = _ref2[0],\n        value = _ref2[1];\n\n    // console.log(key);\n    if (key.toUpperCase() in colID) {\n      // console.log(\"exists\");\n      return true;\n    } else {\n      // console.log(\"error\");\n      return false;\n    }\n  });\n\n  if (headerCheck.includes(false)) {\n    // callback(\"Please follow header guidelines\");\n    return false;\n  } else {\n    while (i < originalData.length) {\n      //organize the json data into gridcolumn objects\n      var result = Object.entries(originalData[i]).map(function (_ref3) {\n        var _ref4 = _slicedToArray(_ref3, 2),\n            key = _ref4[0],\n            value = _ref4[1];\n\n        return {\n          value: value,\n          command: \"SetGridCellValue\",\n          columnID: colID[key.toUpperCase().trim()]\n        };\n      });\n      grid.push(result);\n      i++;\n    }\n\n    for (var k = 0; k < grid.length;) {\n      var x = new row(grid[k]);\n      finalForJDE.push(x);\n      k++;\n    }\n\n    return {\n      finalForJDE: finalForJDE,\n      originalData: originalData\n    };\n  }\n};\n\nmodule.exports = {\n  storeData: storeData\n};\n\n//# sourceURL=webpack:///./routes/main/login/jdeLambdaParser.js?");

/***/ }),

/***/ "./routes/main/login/partnerCheck.js":
/*!*******************************************!*\
  !*** ./routes/main/login/partnerCheck.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var parse = __webpack_require__(/*! csv-parse */ \"csv-parse\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar readFile = function readFile(eldata, userData, partnerNameFromFile, callback) {\n  var result = [];\n  parse(eldata, {\n    columns: true\n  }).on(\"data\", function (data) {\n    Object.keys(data).map(function (key, index) {\n      // console.log(data[key])\n      result.push(data[key]);\n    }); // result = inresult;\n    // console.log(result);\n  }).on(\"end\", function () {\n    // console.log(\"tetsts\");\n    // console.log(result);\n    passVerifier(result, userData, partnerNameFromFile, callback);\n  });\n}; //first check if all partner codes are the same in list of array of json objects\n//then check if the unique partner code from json data matches allowed partner id\n\n\nfunction passVerifier(result, userData, partnerNameFromFile, callback) {\n  // console.log(userData.originalData)\n  // var getFirstPartnerID = userData['originalData'][0]['Partner Code'].toUpperCase();\n  var getFirstPartnerID = partnerNameFromFile; // console.log(`first partnerid:${getFirstPartnerID}`)\n\n  var firstTest = {\n    val: \"\",\n    status: null\n  };\n\n  if (result.includes(partnerNameFromFile.toUpperCase())) {\n    try {\n      Object.values(userData[\"originalData\"]).forEach(function (obj) {\n        // console.log(obj['Partner Code'].toUpperCase())\n        if (obj[\"Partner Code\"].toUpperCase() !== getFirstPartnerID) {\n          //if mismatch do this\n          // console.log(\"no match\");\n          firstTest.val = obj[\"Partner Code\"].toUpperCase();\n          firstTest.status = false;\n          throw \"unauthorized\";\n        } else {\n          //if match do this\n          // console.log(\"match\");\n          firstTest.val = getFirstPartnerID;\n          firstTest.status = true;\n        }\n      });\n    } catch (e) {\n      if (e === \"unauthorized\") {\n        callback(\"Partner does not exist\");\n        return false;\n      }\n    }\n\n    callback(\"Partner exists\");\n  } else {\n    callback(\"Partner does not exist\");\n  }\n}\n\nmodule.exports = {\n  readFile: readFile\n};\n\n//# sourceURL=webpack:///./routes/main/login/partnerCheck.js?");

/***/ }),

/***/ "./server-dev.js":
/*!***********************!*\
  !*** ./server-dev.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar app = express();\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar port = process.env.PORT || 8080; // const routes= require('./routes/main');\n\napp.use(express.static(\"build\"));\napp.use(bodyParser.urlencoded({\n  extended: true\n}));\napp.use(bodyParser.json());\n\n__webpack_require__(/*! ./routes */ \"./routes/index.js\")(app); // app.use(\"/\",routes)\n\n\napp.get('*', function (req, res) {\n  res.sendFile(path.join(__dirname + '/index.html'));\n}); //connect to mongodb\n\nmongoose.connect(process.env.MONGODB_URI || \"mongodb://localhost/api\", {\n  useNewUrlParser: true\n}).then(function () {\n  console.log(\"Mongo is connected\");\n}).catch(function (err) {\n  console.log(err);\n  console.log(\"\\x1b[31m\\x1b[1m MongoDB Not Connected\");\n});\napp.listen(8080, function () {\n  return console.log(\"Listening on port 8080!\");\n});\n\n//# sourceURL=webpack:///./server-dev.js?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "csv-parse":
/*!****************************!*\
  !*** external "csv-parse" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"csv-parse\");\n\n//# sourceURL=webpack:///external_%22csv-parse%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });