var path = require('path')
var webpack = require('webpack')

var CUSTOMER_PATH = path.join(__dirname,'public/javascript/customer')
var MOBILE_PATH = path.join(__dirname,'public/javascript/mobile')
var ADMIN_PATH = path.join(__dirname,'public/javascript/admin')
var NODE_MODULE_PATH = path.join(__dirname,'node_modules')

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

if(isProduction()){
  plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: false
        }
      })
  )
}

module.exports = {
  devtool: isProduction()?false:'source-map',
  entry: {
    customer: [path.resolve(CUSTOMER_PATH, 'index.js')],
    // mobile: [path.resolve(MOBILE_PATH, 'index.js')],
    // admin: path.resolve(ADMIN_PATH, 'index.js'),
    //vendors: ['react', 'moment']
  },
  output: {
    path: path.join(__dirname, 'public/javascript/dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/assets/'
  },
  plugins: plugins,

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        loader: 'style!css!sass'
      }
    ]
  },
  externals: {
    'moment': 'moment',
    'react': 'React',
    'babel-polyfill': 'true'
  },
  resolve: {
    alias: {
      'redux': path.resolve(NODE_MODULE_PATH,"redux/dist/redux.min.js"),
      'react-dom': path.resolve(NODE_MODULE_PATH,"react-dom/dist/react-dom.min.js"),
      'react-redux': path.resolve(NODE_MODULE_PATH,"react-redux/dist/react-redux.min.js")
    }
  }
}
