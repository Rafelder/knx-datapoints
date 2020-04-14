const path = require('path');

module.exports = {
  entry: './lib/dpt.js',
  output: {
    filename: 'knx-datapoints.js',
    path: path.resolve(__dirname, 'dist'),
  },
};