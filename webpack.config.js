const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin')

const outputDirectory = "dist";

module.exports = {
  entry: {
    client: './src/client/index.js',
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    // publicPath: '/',
    filename: 'bundle.js'
  },
  target: 'node',
//   node: {
//     // Need this when working with express, otherwise the build fails
//     __dirname: false,   // if you don't put this is, __dirname
//     __filename: false,  // and __filename return blank or /
//   },
//   externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    //   {
    //     // Loads the javacript into html template provided.
    //     // Entry point is set below in HtmlWebPackPlugin in Plugins 
    //     test: /\.html$/,
    //     use: [{loader: "html-loader"}]
    //   }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    })
  ]
}