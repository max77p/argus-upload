module.exports=function(app){
    app.use("/login",require("./login"))
    app.use("/portal",require("./portal"))
}

// const routes = require('express').Router();
// const login = require('./login');

// routes.use('/login', login);


// routes.get('/test', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
// });

// module.exports = routes;