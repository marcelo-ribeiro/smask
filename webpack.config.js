import path, { dirname } from "path";
import { fileURLToPath } from "url";
import CopyPlugin from "copy-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  target: "web",
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "smask.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
    clean: true,
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
    publicPath: "/dist/",
    port: 8000,
    watchContentBase: true,
    compress: true,
    liveReload: true,
    // hot: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "dist", "smask.js"),
          to: path.resolve(__dirname, "docs"),
        },
      ],
    }),
  ],
};
