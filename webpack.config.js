// import path from "path"
// const __dirname = path.resolve(path.dirname(''))

export default {
  entry: './src/index.js',
  output: {
    filename: "smask.js",
    // path: path.resolve(__dirname, "dist"),
    library: {
      type: "module"
    }
  },
  experiments: {
    outputModule: true,
  }
}
