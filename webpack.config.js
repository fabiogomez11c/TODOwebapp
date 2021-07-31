const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin        = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',

    output: {
        clean: true 
    },

    module : {
        rules : [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file-loader'
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
        })
    ]
}



