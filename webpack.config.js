const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'smask.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
