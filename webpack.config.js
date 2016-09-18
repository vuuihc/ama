var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProduction = function() {
    return process.env.NODE_ENV.toString() == "production";
};

var plugins = [];

if (isProduction()) {
    console.log('生产环境');
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
} else {
    console.log('开发环境');
    plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
}
plugins.push(new ExtractTextPlugin('mobile.min.css'))
module.exports = {
    devtool: isProduction() ? false : 'inline-source-map',
    entry: {
        mobile: './src/javascripts/index.js'
    },
    output: {
        path: './dist',
        filename: '[name].js',
        publicPath: 'http://h5app.7dyk.com/ama/7dyk/dist/'
            // publicPath: '/dist/'
    },
    plugins: plugins,

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel?presets[]=es2015&presets[]=react'],
            exclude: /node_modules/,
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.css/,
            loader: ExtractTextPlugin.extract('style', 'css', 'postcss')
        }, {
            test: /\.(png|jpg|bmp)$/,
            loader: 'url?limit=5000&name=images/[name].[ext]'
        }]
    },
    postcss: [autoprefixer],
    externals: {
        'babel-polyfill': 'true',
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        alias: {
            'redux': path.resolve('node_modules', "redux/dist/redux.min.js"),
            // 'react-dom': path.resolve('node_modules',"react-dom/dist/react-dom.min.js"),
            'react-redux': path.resolve('node_modules', "react-redux/dist/react-redux.min.js")
        }
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        colors:true,
        // proxy:{
        //     "/"
        // }

    }
}
