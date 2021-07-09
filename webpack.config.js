import path from "path"
const __dirname = path.resolve(path.dirname(''))
import CopyPlugin from "copy-webpack-plugin";
// import HtmlWebpackPlugin from "html-webpack-plugin"

export default {
  target: 'web',
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: "smask.js",
    path: path.resolve(__dirname, "docs"),
    library: {
      type: "module"
    },
    // clean: true
  },
  experiments: {
    outputModule: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    publicPath: '/docs/',
    port: 8000,
    watchContentBase: true,
    compress: true,
    liveReload: false,
    hot: true,
    hotOnly: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "docs", "smask.js"), to: path.resolve(__dirname, "dist") }
      ],
    }),
  ]
}
