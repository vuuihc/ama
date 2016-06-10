var path = require('path')
var webpack = require('webpack')

var MOBILE_PATH = path.join(__dirname,'public/javascript/mobile')

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
    mobile: './src/javascripts/index.js'
  },
  output: {
    path: './dist',
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
    //'moment': 'moment',
    //'react': 'React',
    //'babel-polyfill': 'true'
  },
  resolve: {
    alias: {
      'redux': path.resolve('node_modules',"redux/dist/redux.min.js"),
      'react-dom': path.resolve('node_modules',"react-dom/dist/react-dom.min.js"),
      'react-redux': path.resolve('node_modules',"react-redux/dist/react-redux.min.js")
    }
  }
}
