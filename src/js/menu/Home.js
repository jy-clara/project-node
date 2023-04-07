"use strict";

import React, { useState, useEffect, useContext } from 'react';
import * as lib from '../lib/lib';

// Import our custom CSS
import '../../scss/styles.scss';

import * as BCard from '../comp/BCard';
import { BSbtnOutLinePrimary } from '../comp/BSbtns';
import { BIlist, BIdbAdd } from '../comp/BSicons'; 
import { YearContext } from '../Context';

export default function Home({goList}) {

    const [datas, setDatas] = useState([]);
    const year = useContext(YearContext);

    function onClickCardBtn(linkMM) {
      // console.log("onClickCardBtn", linkMM);
  
      lib.postData(`/syncData/year/${year}/mm/${linkMM}`).then((data) => {
        setDatas(data.jsonObj);
      });
    }
    
    useEffect(() => {
      console.log("Home useEffect",year);
      lib.postData(`/year/${year}`).then((data) => {
        setDatas(data.jsonObj);
      });
    },[year]);

    return (
      <div className="container-xxl">
        {lib.quarts.map((months, idx) =>
        <div key={"quart"+(idx+1)} className="row justify-content-center my-1 ms-1 me-0">
        {months.map((month) => 
          <div key={month} className="col-sm-3 me-1 card text-bg-light" id={`divMonth${month}`}>
            <BCard.CardBody classNm={`bg-img-${year+month.toString().padStart(2, '0')}`}>
              <BCard.CardTitle>{month}월</BCard.CardTitle>
            </BCard.CardBody>
            {datas && datas.length > 0 &&
            <>
            <BCard.CardHeader>수입 : {datas[5+(month-1)*4].O}</BCard.CardHeader>
            <BCard.ListGroup>
              <BCard.ListGroupItem>월급 : {datas[5+(month-1)*4].D}</BCard.ListGroupItem>
              <BCard.ListGroupItem>보너스 등 : {datas[5+(month-1)*4].E}</BCard.ListGroupItem>
              <BCard.ListGroupItem>이자,월세이익 : {datas[5+(month-1)*4].F}</BCard.ListGroupItem>
              <BCard.ListGroupItem>기타(소득) : {datas[5+(month-1)*4].G}</BCard.ListGroupItem>
            </BCard.ListGroup>
            <BCard.CardHeader>지출 : {datas[5+(month-1)*4].P}</BCard.CardHeader>
            <BCard.ListGroup>
              <BCard.ListGroupItem
                popoverTitle="저축"
                popoverContent={"<p>생활비정기적금 : <span>"+datas[6+(month-1)*4].D+"</span></p>"
                                +"<p>신랑투자 : <span>"+datas[6+(month-1)*4].E+"</span></p>"
                                +"<p>신랑연금 : <span>"+datas[6+(month-1)*4].F+"</span></p>"
                                +"<p>현선적금 : <span>"+datas[6+(month-1)*4].G+"</span></p>"
                                +"<p>윤혁적금 : <span>"+datas[6+(month-1)*4].H+"</span></p>"
                                +"<p>적금2(웰컴) : <span>"+datas[6+(month-1)*4].K+"</span></p>"
                                +"<p>적금4(오케이) : <span>"+datas[6+(month-1)*4].N+"</span></p>"}>
                  저축계 : {datas[6+(month-1)*4].C}
              </BCard.ListGroupItem>
              <BCard.ListGroupItem
                popoverTitle="기본지출"
                popoverContent={"<p>보험료 : <span>"+datas[7+(month-1)*4].D+"</span></p>"
                                +"<p>통신비 : <span>"+datas[7+(month-1)*4].E+"</span></p>"
                                +"<p>관리비 : <span>"+datas[7+(month-1)*4].F+"</span></p>"
                                +"<p>용돈 : <span>"+datas[7+(month-1)*4].G+"</span></p>"
                                +"<p>보육료 : <span>"+datas[7+(month-1)*4].H+"</span></p>"
                                +"<p>특별비(세금,명절) : <span>"+datas[7+(month-1)*4].I+"</span></p>"
                                +"<hr>"
                                +"<p>육아비 : <span>"+datas[7+(month-1)*4].K+"</span></p>"}>
                  기본지출계 : {datas[7+(month-1)*4].C}
              </BCard.ListGroupItem>
              <BCard.ListGroupItem
                popoverTitle="생활비"
                popoverContent={"<p>식비&생필품 : <span>"+datas[8+(month-1)*4].D+"</span></p>"
                                +"<p>외식&군것질 : <span>"+datas[8+(month-1)*4].E+"</span></p>"
                                +"<p>경조비 : <span>"+datas[8+(month-1)*4].F+"</span></p>"
                                +"<p>자동차비용 : <span>"+datas[8+(month-1)*4].G+"</span></p>"
                                +"<p>교통비 : <span>"+datas[8+(month-1)*4].H+"</span></p>"
                                +"<p>문화생활비 : <span>"+datas[8+(month-1)*4].I+"</span></p>"
                                +"<p>보건비 : <span>"+datas[8+(month-1)*4].J+"</span></p>"
                                +"<p>교제비 : <span>"+datas[8+(month-1)*4].K+"</span></p>"
                                +"<p>미용비&피복비 : <span>"+datas[8+(month-1)*4].L+"</span></p>"
                                +"<p>가전제품 : <span>"+datas[8+(month-1)*4].M+"</span></p>"
                                +"<p>기타지출 : <span>"+datas[8+(month-1)*4].N+"</span></p>"}>
                  생활비계 : {datas[8+(month-1)*4].C}
              </BCard.ListGroupItem>
            </BCard.ListGroup>
            </>
            }
            <BCard.CardBody classNm="text-center">
              <BSbtnOutLinePrimary onClick={goList} onClickIns={[month]}>{BIlist}{month}월 상세</BSbtnOutLinePrimary>
              <BSbtnOutLinePrimary onClick={onClickCardBtn} onClickIns={[month]}>{BIdbAdd}동기화</BSbtnOutLinePrimary>
            </BCard.CardBody>
          </div>
        )}
        </div>
        )}
      </div>
    );
}