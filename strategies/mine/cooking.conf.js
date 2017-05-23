var cooking = require('cooking');
var path = require('path');

cooking.set({
  entry: {
    app: './index.js',
    vendor: ['talib']
  },
  dist: './dist',

  // development
  devServer: {
    hostname: '127.0.0.1',
    port: 8080,
    publicPath: '/'
  },

  // production
  clean: true,
  hash: true,
  chunk: 'vendor',
  publicPath: './',
  assetsPath: 'static',
  sourceMap: true,
  extractCSS: true,
  urlLoaderLimit: 10000,
  postcss: [],

  extends: ['talib']
  //extends: ['react', 'lint', 'less']
});

module.exports = cooking.resolve();
