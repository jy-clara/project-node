"use strict";

const express = require("express");
const router = express.Router();

const xlsx = require('xlsx');
const fs = require('fs');

const dataRootPath = "C:/Users/jycla/Desktop/가계부/";
var dataFullPath = dataRootPath + "2022년.xlsm";

const bookJsonArr = [];
bookJsonArr.length = 13;

router.get('/', (req, res) => {
  if (bookJsonArr[0] == null) {
    console.log("결산내용 없음->파일 읽기 시도");
    var wb = xlsx.readFile(dataFullPath, { type:'string', cellDates: true, dateNF: 'yyyy-mm-dd' } );
    var ws = wb.Sheets["결산"];
    var jsonObj = xlsx.utils.sheet_to_json(ws, {defval: "",dateNF : "YYYY-MM-DD HH:mm", raw: false, header:"A"});
    bookJsonArr[0] = jsonObj;
  } else {
    console.log("결산내용 있음->파일 읽지 않음");
  }

  res.render("index.html",{jsonObj: bookJsonArr[0]});
});

 router.get('/test', (req, res) => {
  var wb = xlsx.readFile(dataFullPath, { type:'string', cellDates: true, dateNF: 'yyyy-mm-dd' } );
  var ws = wb.Sheets["결산"];
  var jsonObj = xlsx.utils.sheet_to_json(ws, {defval: "",dateNF : "YYYY-MM-DD HH:mm", raw: false, header:"A"});

    res.render("test.html",{jsonObj: jsonObj});
  });

router.get('/list', (req, res) => {
    var mm = req.query.mm;
    if (bookJsonArr[mm] == null) {
      console.log(mm+"월내용 없음->파일 읽기 시도");
      var wb = xlsx.readFile(dataFullPath, { type:'string', cellDates: true, dateNF: 'yyyy-mm-dd' } );
      var ws = wb.Sheets[mm+"월"];
      var jsonObj = xlsx.utils.sheet_to_json(ws, {defval: "",dateNF : "YYYY-MM-DD HH:mm", raw: false, header:"A"});
      bookJsonArr[mm] = jsonObj;
    } else {
      console.log(mm+"월내용 있음->파일 읽지 않음");
    }
    res.render("book/mn_list.html",{mm, jsonObj: bookJsonArr[mm]});
  });

  module.exports = router;