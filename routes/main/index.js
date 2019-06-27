const MainRouter=require('express').Router();

MainRouter.use("/user",require("./user"));
MainRouter.use("/login",require("./login"));
MainRouter.use("/contactowner",require("./contact"))

module.exports=MainRouter;
