const MainUserRouter=require("express").Router();

// MainUserRouter.route("/activate").get(require("./activate")).post(require("./activate"));
MainUserRouter.use("/auth",require("./portal"));
// MainUserRouter.use("/register",require("./register"));



module.exports=MainUserRouter;