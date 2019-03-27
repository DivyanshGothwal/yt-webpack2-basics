var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test:/\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(jpg|png)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name].[ext]',
                            outputPath:'img/',
                            publicPath:'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        new htmlWebpackPlugin({
            template:'./src/index.html'
        }),
        //new cleanWebpackPlugin({cleanOnceBeforeBuildPatterns:[path.resolve(__dirname, 'dist')]}),
        new BrotliGzipPlugin({
            asset: '[path].br[query]',
            algorithm: 'brotli',
            test: /\.(js|css|html|svg)$/,
            threshold: 1,
            minRatio: 0.8,
            quality: 11
        }),
        new BrotliGzipPlugin({
            asset: '[path].br[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        })
        // new CompressionPlugin({   
        //     filename: "[path].gz[query]",
        //     algorithm: "brotliCompress",
        //     test: /\.js$|\.css$|\.html$/,
        //     threshold: 1,
        //     minRatio: 0.8
        // })
    ]
};