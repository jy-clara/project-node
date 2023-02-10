"use strict";

const path = require('path');
const fs = require('fs');
const { readFile, writeFile } = require('fs').promises;
const xlsx = require('xlsx');

class CashBookStorage {

    // static #cashBooks = {
    //     B: ["2022-12-01","2022-12-01","2022-12-01"],
    //     C: ["두부","음료수","군것질"],
    //     D: [2000,3000,10000]
    // }

    constructor() {}

    static #writeData(wb, year, sheetNm) {
        const ws = wb.Sheets[sheetNm];
        const cashBookDataDirPath = path.resolve(__dirname, "..","databases","cashBook",""+year);
        if (!fs.existsSync(cashBookDataDirPath)) {
            fs.mkdirSync(cashBookDataDirPath);
        }
        const cashBookDataFilePath = path.resolve(cashBookDataDirPath, "book"+year+"년"+sheetNm+".json");
        console.debug("cashBookDataFilePath: "+cashBookDataFilePath);
        writeFile(cashBookDataFilePath, JSON.stringify(xlsx.utils.sheet_to_json(ws, {defval: "",dateNF : "YYYY-MM-DD HH:mm", raw: false, header:"A"})));
    }

    static getData(year, sheetNm) {
        const cashBookDataFilePath = path.resolve(__dirname, "..","databases","cashBook",""+year,"book"+year+"년"+sheetNm+".json");
        //console.debug("cashBookDataFilePath: "+cashBookDataFilePath+", isExist:"+fs.existsSync(cashBookDataFilePath));
        if (!fs.existsSync(cashBookDataFilePath)) {
            this.syncData(year);
        }
        //fs.readFile의 promise(비동기처리)반환으로 then,catch 사용
        return readFile(cashBookDataFilePath)
            .then((data) => {
                return JSON.parse(data);
            })
            .catch((err) => {
                throw err;
            });
        // var dataFullPath = "C:/Users/jycla/Desktop/가계부/" + year + "년.xlsm";
        // var wb = xlsx.readFile(dataFullPath, { type:'string', cellDates: true, dateNF: 'yyyy-mm-dd' } );
        // var ws = wb.Sheets[sheetNm];
        // return xlsx.utils.sheet_to_json(ws, {defval: "",dateNF : "YYYY-MM-DD HH:mm", raw: false, header:"A"});
    }

    static syncData(year, sheetNm) {
        const xlsxPath = path.resolve("..","..","..","Desktop","가계부",year+"년.xlsm");
        console.debug("xlsxPath: "+xlsxPath);
        const wb = xlsx.readFile(xlsxPath, { type:'string', cellDates: true, dateNF: 'yyyy-mm-dd' } );
        
        if (sheetNm) {
            this.#writeData(wb, year, "결산");
            this.#writeData(wb, year, sheetNm);
        } else {
            sheetNm = "결산";
            this.#writeData(wb, year, sheetNm);
            for (var mm=1; mm<=12; mm++) {
                sheetNm = mm+"월";
                this.#writeData(wb, year, sheetNm);
            }
        }
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