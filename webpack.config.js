const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function isProd(argv) {
    return argv.mode === 'production';
}

function getConfig(_env, argv) {
    return {
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
                new TsconfigPathsPlugin()
            ]
        },

        module: {
            rules: [
                {
                    test: /\.component\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.component\.less$/,
                    use: [
                        'to-string-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProd(argv)
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: !isProd(argv)
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: /\.component\.less$/,
                    use: [
                        isProd(argv) ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProd(argv)
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: !isProd(argv)
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

        ],

        devServer: {
            port: '4200',
            open: true
        },

        devtool: isProd(argv) ? 'none' : 'inline-source-map'
    };
}

module.exports = (env, argv) => {
    const config = getConfig(env, argv);

    if (isProd(argv)) {
        config.plugins.push(new MiniCssExtractPlugin());
    } else {
        config.mode = 'development'
    }

    return config;
}