"use strict";

const express = require("express");
const router = express.Router();

const fs = require('fs');

const CashBook = require('../../models/CashBook');

var bookJsonArr = [];
bookJsonArr.length = 13;

router.get('/', (req, res) => {
  // console.log(CashBookStorage.getData("B","C"));
  const cashBook = new CashBook(req.body); //클래스 인스턴스
  bookJsonArr[0] = cashBook.getData("2022",bookJsonArr,0);

  // res.json(response);
  // res.render("index.html");
  res.render("index.html",{jsonObj: bookJsonArr[0]});
});

router.get('/test', (req, res) => {
  const cashBook = new CashBook(req.body); //클래스 인스턴스
  res.render("test.html",{jsonObj: cashBook.getData("2022",bookJsonArr,0)});
});

router.get('/list', (req, res) => {
    var mm = req.query.mm;
    const cashBook = new CashBook(req.body); //클래스 인스턴스
    bookJsonArr[mm] = cashBook.getData("2022",bookJsonArr,mm);

    res.render("book/mn_list.html",{mm, jsonObj: bookJsonArr[mm]});
  });

module.exports = router;