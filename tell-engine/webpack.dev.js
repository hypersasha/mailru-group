const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        allowedHosts: [
            '.ngrok.io',
            '.vk.com'
        ],
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {}
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    }
});