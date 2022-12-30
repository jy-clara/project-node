"use strict";

const CashBookStorage = require('./CashBookStorage');

class CashBook {
    constructor(body) {
        this.body = body;
    }

    getData(year, bookJsonArr, idx) {
        var sheetNm = idx==0?"결산":(idx+"월");
        // console.log("sheetNm:"+sheetNm);

        if (bookJsonArr[idx] == null) {
            console.log(sheetNm+" 내용 없음->파일 읽기 시도");
            const cashBookStorage = new CashBookStorage(); //클래스 인스턴스
            return cashBookStorage.getData(year, sheetNm);
        } else {
            console.log(sheetNm+" 내용 있음->파일 읽지 않음");
            return bookJsonArr[idx];
        }
    }
}

module.exports = CashBook;