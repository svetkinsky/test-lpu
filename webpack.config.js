const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: './index.js',

    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },

    devtool: 'eval',

    devServer: {
        port: 3000
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyWebpackPlugin([
            {
                from: './stub',
                to: './stub'
            }
        ])
    ]
}