/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require('webpack-merge');
const configCommon = require("./webpack.common.config.cjs");
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = merge(configCommon, {
  mode: 'development',
  devServer: {
    open: true,
    watchFiles: path.join(__dirname, 'src'),
    hot: true,
    host: "localhost",
    port: 3000,
  },
  plugins: [
    new CircularDependencyPlugin(),
  ]
});

