/* This config file is only for transpiling the Express server file.
 * You need webpack-node-externals to transpile an express file
 * but if you use it on your regular React bundle, then all the
 * node modules your app needs to function get stripped out.
 *
 * Note: that prod and dev mode are set in npm scripts.
 */
const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = (env, argv) => {
  console.log(argv.mode)
  const SERVER_PATH =
    argv.mode === "production" ? "./server-prod.js" : "./server-dev.js";

  return {
    entry: {
      server: SERVER_PATH
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].bundle.js",
      chunkFilename: "[name].bundle.js",
      publicPath: "/"
    },
    mode: argv.mode,
    target: "node",
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    // devServer: {
    //   port: 3000,
    //   open: true,
    //   proxy: {
    //     "/": {
    //       target: "http://localhost:8080"
    //     }
    //   },
    //   historyApiFallback: true
    // },
  };
};
