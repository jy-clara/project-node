"use strict";

import React, { useState, useEffect, Fragment, useContext } from 'react';
import * as lib from '../lib/lib';

// Import our custom CSS
import '../../scss/styles.scss';

import { YearContext, MonthContext } from '../Context';
import {GridHeader, GridRow, GridColumn, GridFooter} from '../comp/Grid';
import BOffcanvas from '../comp/BOffcanvas';
import BAccordion from '../comp/BAccordion';

export const listTitles = [
  {id: 'B', size:'2', align: 'text-center', text:'Date'},
  {id: 'C', size:'2', align: '', text:'Contents'},
  {id: 'D', size:'2', align: ' text-end', text:'Expenses'},
  {id: 'E', align: '', text:''},
  {id: 'F', align: '', text:''},
  {id: 'G', size:'3', align: '', text:'Remark'},
  {id: 'H', align: '', text:''}
];

export default function List({goHome, goList, searchCnt, setSrchSumComp}) {
    //console.log("List",mm);
    const [gridComp, setGridComp] = useState(
    <GridRow isGrpStart={false}>
      <GridColumn isStartCol={true} textAlign='text-center'>데이타를 조회중입니다.</GridColumn>
    </GridRow>);
    // const [datas, setDatas] = useState([]);
    const [weeks, setWeeks] = useState([{text: "", items: []}]);
    const accordionGrps = [];
    const year = useContext(YearContext);
    const mm = useContext(MonthContext);

    useEffect(() => {
      if (mm == 0) return;

      console.log("List useEffect",year,mm);

      lib.postData(`/year/${year}/mm/${mm}`).then((data) => {
        // console.log("data.jsonObj",data.jsonObj); // JSON data parsed by `data.json()` call
        if (!data.jsonObj || data.jsonObj.length == 0) {
          setGridComp(          
          <GridRow isGrpStart={false}>
            <GridColumn isStartCol={true} textAlign='text-center'>데이타가 없습니다.</GridColumn>
          </GridRow>);
          return;
        }
        const grps = [];
        let grpDt = lib.InvalidDt;
        //console.log("data.jsonObj.length", data.jsonObj.length);
        for (let idx=1; idx < data.jsonObj.length; idx++) {
          if (!lib.isValidDt(grpDt)) {
            grpDt = new Date(data.jsonObj[idx].B);
            if (lib.isValidDt(grpDt)) continue;
            // console.log("InvalidDt", data.jsonObj[idx].B);
            grpDt = new Date("9999-12-31");
            if (data.jsonObj.length <= 1) break;
            grps.push({id: lib.yyyymmdd(grpDt), startIdx: (grps.length==0)?1:(grps[grps.length-1].endIdx+1), endIdx: data.jsonObj.length});
            break;
          }
          if (lib.isValidDt(grpDt) && data.jsonObj[idx].C == "잔액") {
            grps.push({id: lib.yyyymmdd(grpDt), startIdx: (grps.length==0)?1:(grps[grps.length-1].endIdx+1), endIdx: idx});
            //console.log("grps push",idx);
            grpDt = lib.InvalidDt;
          }
        }

        setGridComp(getGridRowComp(grps, data.jsonObj));

        const weekGrps = [];
        const todayStr = (new Date()).toDateString();
        let tmpDt, selected = false;
        grps.map((grp, idx) => {
          tmpDt = lib.toDate(grp.id);
          if (idx == 0 || lib.dayNm[tmpDt.getDay()] === "월") {
            weekGrps.push({
              text: (weekGrps.length+1)+'주',
              isActive : false,
              items: []
            });
          }
          selected = (todayStr==tmpDt.toDateString())?true:false;
          if (selected) weekGrps.at(-1).isActive = true;

          weekGrps.at(-1).items.push({
            text: tmpDt.toLocaleDateString("ko-KR")+"("+lib.dayNm[tmpDt.getDay()]+")",
            id: grp.id,
            selected: selected
          });
        });
        setWeeks(weekGrps);
        // console.log("List","useEffect()","weekGrps",weekGrps);
      });

    },[mm]);

    useEffect(() => {
      console.log("List useEffect",year,mm);

      if (searchCnt == 0) return;

      setWeeks([{text: "", items: []}]);

      lib.postData(`/search/year/${year}`,
        {searchTxt: document.querySelector("#iptSearch").value,
         opt: document.querySelector("[name=flexRadioDefault]:checked").value}
      ).then((data) => {
        if (!data.jsonObj || data.jsonObj.length == 0) {
          setGridComp(          
          <GridRow isGrpStart={false}>
            <GridColumn isStartCol={true} textAlign='text-center'>데이타가 없습니다.</GridColumn>
          </GridRow>);
          return;
        }
        setGridComp(getGridRowComp(null, data.jsonObj));
      });

    },[searchCnt]);

    const navItems = [];
    lib.months.map((mon) => {
      navItems.push({id: mon, text: `${mon}월`, selected: mon==mm?true:false});
    });
    
    return (
      <div className={`container-xxl ${mm > 0 ?'bd-layout':''}`}>
      {mm > 0 &&
        <>
        <aside className="bd-sidebar">
        <BOffcanvas title="날짜 바로가기" id="offcanvasDate">
          <BAccordion id="accordionDate" grps={weeks} />
        </BOffcanvas>
        </aside>
        <button className="btn text-success position-fixed top-50 start-0 d-block d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDate" aria-controls="offcanvasDate">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </button>
        </>
      }
        <div className="bd-main order-1 m-0 p-0" id="gridList" data-bs-spy="scroll" data-bs-target="#accordionDate" data-bs-smooth-scroll="true" tabIndex="0">
          <div className="bd-content">{gridComp}</div>
        </div>
      </div>
    );
}

export function getGridRowComp(grps, datas) {
  const ret = [];
  let grp, jsonObj;
  let textColor = "", bgColor = "";

  if (grps) {
    for (let idx=1; idx < datas.length; idx++) {
      jsonObj = datas[idx];
      grp = grps.find(ele => ele.startIdx <= idx && ele.endIdx >= idx);
      // console.log(idx,grp);
      textColor = "";
      if (grp && grp.startIdx < idx) {
        textColor = grp.id != lib.toOnlyNumStr(jsonObj.B) ? 'text-danger':'text-white';
      }
      bgColor = "";
      if (jsonObj.C=="잔액") {
        bgColor = "bg-info";
      }
      ret.push(
        <Fragment key={`Row${idx}`}> 
          <div className={`col-2 m-0 px-1 border border-top-0 ${grp && idx < grp.endIdx?'border-bottom-0':''} text-center ${textColor} ${bgColor}`} id={grp ? grp.id : lib.toOnlyNumStr(jsonObj.B)}>
            {jsonObj.B}
          </div>
          <div className={`col-2 m-0 px-1 border-end border-bottom border-1 ${bgColor}`}>{jsonObj.C}</div>
          <div className={`col-2 m-0 px-1 border-end border-bottom border-1 text-end ${bgColor}`}>{jsonObj.D}</div>
          <div className={`col-1 m-0 px-1 border-end border-bottom border-1 ${bgColor}`}>{jsonObj.E}</div>
          <div className={`col-1 m-0 px-1 border-end border-bottom border-1 ${bgColor}`}>{jsonObj.F}</div>
          <div className={`col-3 m-0 px-1 border-end border-bottom border-1 ${bgColor}`}>{jsonObj.G}</div>
          <div className={`col-1 m-0 px-1 border-end border-bottom border-1 ${bgColor}`}>{jsonObj.H}</div>
        </Fragment>
      );
      if (grp && idx == grp.endIdx) {
        ret.push(
          <div key={`RowHR${idx}`} className="col-12 m-0 px-1 border-bottom border-2"></div>
        );
      }
    }

    return <div className={`row row-cols-6 m-0`}>{ret}</div>;
  }
  
  const regex = /\D|^-|^./g;
  let totAmt = 0;

  for (let idx=0; idx < datas.length; idx++) {
    const jsonObj = datas[idx];
    totAmt += Number(jsonObj.D.replaceAll(regex,''));
    
    ret.push(
      <Fragment key={`Row${idx}`}> 
        <div className={`col-2 m-0 px-1 border border-top-0 text-center`}>{jsonObj.B}</div>
        <div className={`col-2 m-0 px-1 border-end border-bottom border-1`}>{jsonObj.C}</div>
        <div className={`col-2 m-0 px-1 border-end border-bottom border-1 text-end`}>{jsonObj.D}</div>
        <div className={`col-1 m-0 px-1 border-end border-bottom border-1`}>{jsonObj.E}</div>
        <div className={`col-1 m-0 px-1 border-end border-bottom border-1`}>{jsonObj.F}</div>
        <div className={`col-3 m-0 px-1 border-end border-bottom border-1`}>{jsonObj.G}</div>
        <div className={`col-1 m-0 px-1 border-end border-bottom border-1`}>{jsonObj.H}</div>
      </Fragment>
    );
  }
        
  return (
    <>
    <div className={`row row-cols-6 m-0`}>{ret}</div>
    <GridFooter key="sumFoo">
      <div className="col-4 border-end">합계({datas.length}건)</div>
      <div className="col-2 border-end text-end">{totAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</div>
      <div className="col-6"></div>
    </GridFooter>
    </>
  );
}