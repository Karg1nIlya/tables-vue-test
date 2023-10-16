const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.Node_ENV === 'development'
const isProd = !isDev

const fileName = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    mode: 'development',
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
        clean: true,
        assetModuleFilename: `assets/[name][ext]`
    },
    devtool: isProd ? false : 'inline-source-map',
    devServer: {
        port: '3000',
        open: true,
        liveReload: true,
    }, 
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(), 
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', 'vue', '.js', 'css']
    },
}

