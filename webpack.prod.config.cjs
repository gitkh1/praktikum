/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const configCommon = require('./webpack.common.config.cjs');

module.exports = merge(configCommon, {
  mode: 'production',
  plugins: [
    new CssMinimizerPlugin(),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
});
