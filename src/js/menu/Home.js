"use strict";

import React, { useState, useEffect, useContext } from 'react';
import * as lib from '../lib/lib';

// Import our custom CSS
import '../../scss/styles.scss';

import {BCardListGrp2WithTopImg as BCard} from '../comp/BCardListWithImg';
import { YearContext } from '../Context';

export default function Home({goList}) {

    const [datas, setDatas] = useState([]);
    const year = useContext(YearContext);

    function onClickCardBtn(linkMM, tp) {
        console.log("onClickCardBtn", linkMM, tp);
        // if (!e.target.parentNode || !e.target.parentNode.parentNode) return;
        // let linkMM = 0;
        // let match;
        // const regexp = /\d/g;
        // while ((match = regexp.exec(e.target.parentNode.parentNode.id)) !== null) {
        //   linkMM = match[0];
        // }
    
        if (tp.endsWith("동기화")) {
          lib.postData(`/syncData/year/${year}/mm/${linkMM}`).then((data) => {
            const tempDatas = [];
            lib.months.forEach(idx => {
              tempDatas.push({
                income: data.jsonObj[5+(idx-1)*4].O,
                income1: data.jsonObj[5+(idx-1)*4].D,
                income2: data.jsonObj[5+(idx-1)*4].E,
                income3: data.jsonObj[5+(idx-1)*4].F,
                income4: data.jsonObj[5+(idx-1)*4].G,
                expenditure: data.jsonObj[5+(idx-1)*4].P,
                expenditure1: data.jsonObj[6+(idx-1)*4].C,
                expenditure2: data.jsonObj[7+(idx-1)*4].C,
                expenditure3: data.jsonObj[8+(idx-1)*4].C
              });
            });
            setDatas(tempDatas);
          });
        } else if (tp.endsWith("상세")) {
          goList(linkMM);
        }
    }
    
    useEffect(() => {
      console.log("Home useEffect",year);
      lib.postData(`/year/${year}`).then((data) => {
        const tempDatas = [];
        lib.months.forEach(idx => 
          tempDatas.push({
            income: data.jsonObj[5+(idx-1)*4].O,
            income1: data.jsonObj[5+(idx-1)*4].D,
            income2: data.jsonObj[5+(idx-1)*4].E,
            income3: data.jsonObj[5+(idx-1)*4].F,
            income4: data.jsonObj[5+(idx-1)*4].G,
            expenditure: data.jsonObj[5+(idx-1)*4].P,
            expenditure1: data.jsonObj[6+(idx-1)*4].C,
            expenditure2: data.jsonObj[7+(idx-1)*4].C,
            expenditure3: data.jsonObj[8+(idx-1)*4].C
          })
        );
        setDatas(tempDatas);
        // if (year == ""+today.getFullYear()) {
        //   onload = (event) => {self.location = "#divMonth"+(today.getMonth()+1);};
        // } else {
        //   onload = (event) => {self.location = "#divMonth12";};
        // }
      });
    },[year]);

    return (
      <div className="container-xxl">
        {datas.length > 0 && lib.quarts.map((months, idx) =>
        <div key={"quart"+(idx+1)} className="row justify-content-center my-1 ms-1 me-0">
        {months.map((month) =>
          {
            {/* console.log(datas[month-1]); */}
          
            return <BCard key={month} year={year} mm={month} data={datas[month-1]} clickFn={onClickCardBtn} />;
          }
        )}
        </div>
        )}
      </div>
    );
}