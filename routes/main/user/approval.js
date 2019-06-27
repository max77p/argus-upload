// app.get("/api/getUsername", (req, res) =>
//   res.send({ username: os.userInfo().username })
// );
const Product = require("../../../models/products");
const express = require("express");
const router = express.Router();
const os = require("os");
router.get("/test", (req, res) =>
  // Product.find({}, function(error, found) {
  //   // Throw any errors to the console
  //   if (error) {
  //     console.log(error);
  //   }
  //   // If there are no errors, send the data to the browser as json
  //   else {
  //     res.send({ username: os.userInfo().username })
  //   }
  // })

  res.send("hello")
);

router.post("/post", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
