const express = require("express");
const router = express.Router();
require("dotenv").config();
const mailer = require("./sendMail");
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1"
});

router.post("/sendinfo", (req, res,next) => {
  // console.log(req.body)
  return mailer.sendMail(`${process.env.Contact_Email}`, [`${process.env.Contact_Email}`], req.body)
  .then(() => res.send(req.body))
  .catch(next);
});

module.exports = router;
