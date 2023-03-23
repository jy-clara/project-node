"use strict";

const CashBook = require('../../models/CashBook');

const output = {
    home: (req, res) => {
        res.render("index.html");
    },
    // home: async (req, res) => {
    //     console.info("[Controller]home Start");
    //     var year = req.params.year;
    //     if (!year) {
    //         var today = new Date();
    //         year = today.getFullYear();
    //     }
    //     const mm = 0;
    //     // const cashBook = new CashBook(req.body); //클래스 인스턴스
    //     try {
    //         res.render("index.html",{year, jsonObj: await CashBook.getData(year,mm)});
    //     } catch(err) {
    //         res.render("error.html", {err});
    //     }
    // },
    test: (req, res) => {
        const cashBook = new CashBook(req.body); //클래스 인스턴스
        res.render("test.html",{jsonObj: cashBook.getData("2022",bookJsonArr,0)});
    },
    list: async (req, res) => {
        console.info("[Controller]list Start");
        var year = req.params.year;
        if (!year) {
            year = Date.now().getFullYear();
        }
        var mm = req.params.mm;
        if (!mm) {
            mm = 0;
        }
        // const cashBook = new CashBook(req.body); //클래스 인스턴스
        try {
            if (mm == 0) {
                res.render("index.html",{year, jsonObj: await CashBook.getData(year,mm)});
            } else {
                res.render("book/mn_list.html",{year, mm, jsonObj: await CashBook.getData(year,mm)});
            }
        } catch (err) {
            res.render("error.html", {err});
        }
    },
    search: async (req, res) => {
        console.info("[Controller]search Start");
        const objJsonRet = {
            year: req.params.year,
            mm: req.params.mm || "전체",
            searchKey: req.query.q,
            searchOpt: req.query.opt,
            jsonObj: await CashBook.searchData(req.query.q, req.params.year, req.params.mm, req.query.opt),
        };
        //console.debug("검색완료후렌더:"+JSON.stringify(objJsonRet));
        res.render("book/mn_search.html",objJsonRet);
        console.info("[Controller]search End");
    },
    syncData: async (req, res) => {
        var year = req.params.year;
        if (!year) {
            year = Date.now().getFullYear();
        }
        var mm = req.params.mm;
        if (!mm) {
            mm = 0;
        }
        // const cashBook = new CashBook(req.body); //클래스 인스턴스
        await CashBook.syncData(year,mm);
        try {
            res.render("index.html",{year, jsonObj: await CashBook.getData(year,0)});
            // if (mm == 0) {
            //     res.render("index.html",{year, jsonObj: await CashBook.getData(year,mm)});
            // } else {
            //     res.render("book/mn_list.html",{year, mm, jsonObj: await CashBook.getData(year,mm)});
            // }
        } catch (err) {
            res.render("error.html", {err});
        }
    },
};

const process = {
    home: async (req, res) => {
        console.info("[Controller][POST][home] Start", req.url, req.params);
        let year, mm = 0;

        year = req.params.year;
        if (!year) {
            year = Date.now().getFullYear();
        }
        // const cashBook = new CashBook(req.body); //클래스 인스턴스
        console.log("[Controller][POST][home] year=",year);
        try {
            return res.status(201).json({jsonObj: await CashBook.getData(year,mm)});
        } catch(err) {
            res.status(500).json({err});
        }
    },
    list: async (req, res) => {
        console.info("[Controller][POST][list] Start", req.url, req.params);
        var year = req.params.year;
        if (!year) {
            year = Date.now().getFullYear();
        }
        var mm = req.params.mm;
        if (!mm) {
            mm = 0;
        }
        // const cashBook = new CashBook(req.body); //클래스 인스턴스
        try {
            return res.status(201).json({jsonObj: await CashBook.getData(year,mm)});
        } catch (err) {
            res.status(500).json({err});
        }
    },
    search: async (req, res) => {
        console.info("[Controller][POST][search] Start", req.url, req.params);
        //console.debug("여기222",req);
        // res.redirect("book/mn_search.html")
        // return res.redi
        if (!Object.hasOwn(req.params, 'year')) {
            return res.status(400).send('검색할 연도가 없습니다!');
        }
        try {
            return res.status(201).json({jsonObj: await CashBook.searchData(req.body.searchTxt, req.params.year, '', req.body.opt)});
        } catch(err) {
            res.status(500).json({err});
        }
    },
    syncData: async (req, res) => {
        console.info("[Controller][POST][syncData] Start", req.url, req.params);
        var year = req.params.year;
        if (!year) {
            year = Date.now().getFullYear();
        }
        var mm = req.params.mm;
        if (!mm) {
            mm = 0;
        }
        
        console.log("[Controller][POST][syncData] year=",year);
        await CashBook.syncData(year,mm);
        try {
            res.status(201).json({jsonObj: await CashBook.getData(year,0)});
        } catch (err) {
            res.status(500).json({err});
        }
    },
    save: (req, res) => {
        // const cashBook = new CashBook(req.body); //클래스 인스턴스
        const response = CashBook.save();

        return res.json(response);
    },
};

module.exports = {
    output,
    process
};