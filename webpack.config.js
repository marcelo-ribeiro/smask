import path from "path"
const __dirname = path.resolve(path.dirname(''))
import CopyPlugin from "copy-webpack-plugin";

export default {
  entry: './src/index.js',
  output: {
    filename: "smask.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module"
    },
    clean: true
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "dist", "smask.js"), to: path.resolve(__dirname, "docs") }
      ],
    }),
  ]
}
