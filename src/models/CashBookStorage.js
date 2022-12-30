"use strict";

const fs = require('fs');
const xlsx = require('xlsx');

class CashBookStorage {

    // static #cashBooks = {
    //     B: ["2022-12-01","2022-12-01","2022-12-01"],
    //     C: ["두부","음료수","군것질"],
    //     D: [2000,3000,10000]
    // }

    constructor() {}

    getData(year, sheetNm) {
        var dataFullPath = "C:/Users/jycla/Desktop/가계부/" + year + "년.xlsm";
        var wb = xlsx.readFile(dataFullPath, { type:'string', cellDates: true, dateNF: 'yyyy-mm-dd' } );
        var ws = wb.Sheets[sheetNm];
        return xlsx.utils.sheet_to_json(ws, {defval: "",dateNF : "YYYY-MM-DD HH:mm", raw: false, header:"A"});
    }

    // static getData(...fields) {
    //     const datas = this.#cashBooks;
    //     const newDatas = fields.reduce((newDatas, field) => {
    //         if (datas.hasOwnProperty(field)) {
    //             newDatas[field] = datas[field];
    //         }
    //         // console.log(newFields, field);
    //         return newDatas;
    //     }, {});
    //     return newDatas;
    // }
}

module.exports = CashBookStorage;