"use strict";

const CashBookStorage = require('./CashBookStorage');

class CashBook {
    constructor(body) {
        this.body = body;
    }

    static async getData(year, idx) {
        var sheetNm = idx==0?"결산":(idx+"월");
        // console.log("sheetNm:"+sheetNm);

        try{
            // console.log(sheetNm+" 내용 없음->파일 읽기 시도");
            // const cashBookStorage = new CashBookStorage(); //클래스 인스턴스
            return await CashBookStorage.getData(year, sheetNm);
        } catch(err) {
            throw err;
        }
    }

    static async syncData(year, mm) {
        var sheetNm = mm==0?"결산":(mm+"월");
        try { //async,await인 경우 try/catch로 묶을 수 있다.
            if (mm) {
                return await CashBookStorage.syncData(year, sheetNm);
            } else {
                return await CashBookStorage.syncData(year);
            }
        } catch (err) {
            console.error(err);   
        }
        
    }

    static async searchData(searchTxt, year, sheetNm1, searchOpt) {
        var arrJson, objJson, sheetNm;
        const arrJsonRet = [];
        const regex = new RegExp(searchTxt,'i');
        console.debug("검색어:"+searchTxt,"검색옵션:"+searchOpt);
        try{
            for (var mm=1; mm<=12; mm++) {
                if (sheetNm1 && sheetNm1 != "결산") {
                    if (mm > 1) break;
                    sheetNm = sheetNm1;
                } else {
                    sheetNm = mm+"월";
                }
                arrJson = await CashBookStorage.getData(year, sheetNm);
                for (var i=0; i<arrJson.length; i++) {
                    if (regex.test(JSON.stringify(arrJson[i], (searchOpt==null||searchOpt=="")?null:[searchOpt]))) {
                        arrJsonRet.push(arrJson[i]);
                    }
                }
            }
            console.debug("검색결과개수:"+arrJsonRet.length);
            return arrJsonRet;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = CashBook;