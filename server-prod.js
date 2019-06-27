const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./routes")(app);


//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/api", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Mongo is connected");
  })
  .catch(err => {
    console.log(err);
    console.log("\x1b[31m\x1b[1m MongoDB Not Connected");
  });
app.listen(port, () => console.log("Listening on port 8080!"));