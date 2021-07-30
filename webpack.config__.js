const path = require("path");
// import CopyPlugin from "copy-webpack-plugin";
// import HtmlWebpackPlugin from "html-webpack-plugin"

module.exports = {
  target: "web",
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "smask.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
    // clean: true
    // publicPath: "",
  },
  experiments: {
    outputModule: true,
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: [
      path.resolve(__dirname, "docs"),
      path.resolve(__dirname, "dist"),
    ],
    // publicPath: "/",
    port: 8000,
    watchContentBase: true,
    compress: true,
    liveReload: false,
    hot: true,
    // hotOnly: true,
  },
  // plugins: [
  //   new CopyPlugin({
  //     patterns: [
  //       {
  //         from: path.resolve(__dirname, "dist", "smask.js"),
  //         to: path.resolve(__dirname, "docs"),
  //       },
  //     ],
  //   }),
  // ],
};
