var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');

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
        }),
        new WebpackMd5Hash(),
        new ExtractTextPlugin("style.[chunkhash].css")
    )
} else {
    console.log('开发环境');
    plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
}
module.exports = {
    devtool: isProduction() ? false : 'inline-source-map',
    entry: {
        mobile: './src/javascripts/index.js'
    },
    output: {
        path: './dist',
        filename: '[name].[chunkhash].js',
        publicPath: 'http://h5app.7dyk.com/ama/7dyk/dist/'
            // publicPath: '/dist/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel?presets[]=es2015&presets[]=react'],
            exclude: /node_modules/,
        }, {
            test: /\.s?css$/,
            loader: ExtractTextPlugin.extract('style-loader','css!sass!postcss')
        }, {
            test: /\.(png|jpg|bmp)$/,
            loader: 'url?limit=5000&name=images/[name].[ext]'
        }]
    },
    postcss: [autoprefixer],
    plugins: plugins,
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
