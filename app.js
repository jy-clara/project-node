"use strict";

//모듈
const express = require('express');
const bodyParser = require('body-parser');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const logger = require('morgan');

const app = express();

// const config = require('./webpack.config.js');
// const compiler = webpack(config);
// const middleware = webpackDevMiddleware(compiler, {
//   //noInfo: true,
//   //publicPath: webpackConfig.output.publicPath,
//   //silent: true,
//   //stats: 'errors-only'
//   writeToDisk: true,
//   // html only
//   //writeToDisk: filePath => /\.html$/.test(filePath),
//   // hot: true,
//   stats: { colors: true },
//  });

//라우팅
const home = require("./src/routes/home");

// app.use(logger('dev'));

/* app.js */
// 애플리케이션을 실행하는 Main 파일에 View Engine을 설정하는 아래 코드를 추가합니다.
app.set('views', "./src/views"); // ejs 페이지 render시 '/views'를 prefix
app.set('view engine', 'ejs'); // 화면 engine을 ejs로 설정
app.engine('html', require('ejs').renderFile); //html 파일을 인식 하게 해준다.
//express 설정 할수 있도록 초기 설정
// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
app.use(express.static(`${__dirname}/public`));

//middleware that only parses json
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", home);
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(middleware);
// app.use(webpackHotMiddleware(compiler))

module.exports = app;