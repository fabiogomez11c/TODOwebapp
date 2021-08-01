const HtmlWebPackPlugin    = require('html-webpack-plugin')
const CopyPlugin           = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true 
    },

    module : {
        rules : [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader']
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html'
        }),

        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        })
    ]
}



