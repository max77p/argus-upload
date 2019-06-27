const MainLoginRouter=require("express").Router();

// MainUserRouter.route("/activate").get(require("./activate")).post(require("./activate"));

MainLoginRouter.use("/auth",require("./authPortalRoute"));




module.exports=MainLoginRouter;