const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/js/index.js',
    // main: ['./src/js/main.js'],
    // main: ['./src/js/main.js', 'webpack-hot-middleware/client'],
    // hot module replacement를 위한 런타임 코드
    hot: 'webpack/hot/dev-server.js',
    // 웹 소켓 전송, hot 및 live 리로드 로직을 위한 개발 서버 클라이언트
    // client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    // 엔트리
    // './src/index.js',
  },
  plugins: [new miniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin(),],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    //lazy : true, //웹페이지 로드시 webpack 동작 하도록 하는 옵션
    clean: true,
    // publicPath: '/',
  },
  stats: {
    colors: true,
    // modules: true,
    // reasons: true,
    errorDetails: true,
  },
  // devServer: {
  //   static: path.resolve(__dirname, 'public'),
  //   hot: true
  // },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        // options: {
        //   outputPath: 'public/img',
        // },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            //loader: 'style-loader'
            // Extracts CSS for each JS file that includes CSS
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}