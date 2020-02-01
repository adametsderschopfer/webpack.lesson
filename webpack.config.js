const glob = require('glob')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './js/index.js',
    },
    output:{
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),   
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: 'img/'
          }]),
          new ImageminPlugin({ 
            
                context: 'src', 
                sources: glob.sync('src/img/**/*.png'),
                destination: 'build/img',
                fileName: '[name].[ext]' 
             }),

    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
              },{
                test: /\.(jpe?g|png|gif|svg)$/i,
                to: 'build/img'
              }

        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
  

    
}