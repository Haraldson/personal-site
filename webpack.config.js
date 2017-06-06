'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')

const webpackCommon = {
    entry: {
        app: ['./src']
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader?presets[]=es2015' }]
            },
            {
                test: /\.hbs$/,
                use: { loader: 'handlebars-loader' }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'sass-loader']
                })
            }
        ]
    },

    output: {
        filename: 'app.js',
        path: path.join(__dirname, './dist'),
        publicPath: '/'
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([{
            from: './src/index.html',
            to: './index.html'
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash'
        })
    ],

    resolve: {
        modules: [
            path.join(__dirname, './node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            jquery: 'jquery/src/jquery',
            handlebars: 'handlebars/dist/handlebars'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, './node_modules')]
    }
}

switch(process.env.npm_lifecycle_event) {
    case 'start':
    case 'dev':
        module.exports = merge(webpackCommon, {
            devtool: '#inline-source-map',
            devServer: {
                contentBase: path.join(__dirname, 'dist'),
                compress: true,
                port: 9000,
                historyApiFallback: true
            }
        });
        break;

    default:
        module.exports = merge(webpackCommon, {
            devtool: 'source-map'
        });
        break;
}
