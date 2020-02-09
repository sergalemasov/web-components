const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',

    context: path.join(__dirname, 'src'),

    entry: {
        index: './index',
        styles: './index.less'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            // https://github.com/dividab/tsconfig-paths-webpack-plugin
            new TsconfigPathsPlugin()
        ]
    },

    module: {
        rules: [
            {
                test: /\.component\.less$/,
                use: [
                    'to-string-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /\.component\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        // new MiniCssExtractPlugin({
        //     moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`,
        //     // filename: '[name].css',
        //     // chunkFilename: '[id].css'
        // })
    ],

    devServer: {
        port: '4200',
        open: true
    }
};