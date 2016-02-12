var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

require('es6-promise').polyfill();

var config = {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      './src/entry.jsx'
    ],
    vendor: [
      'react',
      'lodash',
      'superagent'
    ]
  },
  output: {
    path: './build',
    filename: "bundle.js"
  },
  eslint: {
    configFile: './.eslintrc'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel?experimental'], exclude: /node_modules/},
      { test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/},
      { test: /\.json$/, loader: 'json' },
      { test: /\.yml$/, loader: 'json!yaml' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
