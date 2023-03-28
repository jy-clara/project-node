"use strict";

import React, { useState, useEffect } from 'react';

export function GridHeader({titles}) {
    return (
        <div className="row text-center text-bg-dark border-2 border-secondary fw-bolder m-0 p-0">
            {titles.map((title, idx) =>
            <div key={title.id} className={`col${title.size?"-"+title.size:""} ${((idx+1) == titles.length)?"":"border-end"}`}>{title.text}</div>
            )}
        </div>
    );
}


export function GridRow({isGrpStart, id, bgColor, children}) {
    // console.log("Grid","Row()",`datas[${rowIdx}]`,datas[rowIdx]);
    
    if (isGrpStart) {
        return ( 
            <div className={`row border-bottom m-0 border-2 ${bgColor}`} style={{borderTop: "solid 2px"}} id={id}>
                {/* {titles.map((title,idx) => <Column key={`row${rowIdx+1}col${idx+1}`} value={datas[rowIdx][idx].value} textSize={title.size} textAlign={title.align} textColor={datas[rowIdx][idx].color} isStartCol={(idx==0)?true:false} />)} */}
                {children}
            </div>
        );
    }
    
    return (
        <div className={`row border-bottom m-0 ${bgColor}`}>
            {/* {titles.map((title,idx) => <Column key={`row${rowIdx+1}col${idx+1}`} value={datas[rowIdx][idx].value} textSize={title.size} textAlign={title.align} textColor={datas[rowIdx][idx].color} isStartCol={(idx==0)?true:false} />)} */}
            {children}
        </div>
    );
}

export function GridColumn({textSize, textAlign, textColor, isStartCol, children}) {
    return (
        <div className={`col${textSize?"-"+textSize:""} m-0 px-1${isStartCol?" border-start":""} border-end border-1 ${textAlign} ${textColor}`}>
            {children}
        </div>
    );
}

export function GridFooter({children}) {
    return (
        <div className="row sticky-bottom text-center text-bg-info fw-bolder m-0 p-0 border-2 border-secondary">
          {children}
        </div>
    );
}

// function GridData({titles, datas, grps}) {
//     console.log("GridData","datas",datas.length,"grps",grps.length);
//     // function Column({value, textSize, textAlign, textColor, isStartCol}) {
//     //     return (
//     //         <div className={`col-sm${textSize?"-"+textSize:""} m-0 px-1${isStartCol?" border-start":""} border-end border-1 ${textAlign} ${textColor}`}>
//     //             {value}
//     //         </div>
//     //     );
//     // }
//     /*function Rows({startIdx, endIdx, id, isGrpStart}) {
//         if (rowDatas.length > 0) {
//             return <>{datas.slice(startIdx, endIdx).map((rowData,idx) => <Row Key={`row${startIdx+idx+1}`} rowIdx={startIdx+idx+1} rowData={rowData} id={id} isGrpStart={(isGrpStart && idx==0)?true:false} />)}</>;
//         }
//         return (
//             <div className="row border-bottom m-0">
//                 <div className="col-sm m-0 px-1 border-end border-1">
//                     데이타가 없습니다.
//                 </div>
//             </div>
//         );
//     }*/
//     // function RowGrp() {
//     //     if (grps.length > 0) {
//     //         return (
//     //             <>
//     //             {grps.map((grp) => {
//     //                 console.log("Grid","RowGrp()",
//     //                 `datas.slice(${grp.startIdx},${grp.endIdx})`,
//     //                 datas.slice(grp.startIdx, grp.endIdx));
//     //                 return (
//     //                     <>
//     //                     {datas.slice(grp.startIdx, grp.endIdx).map((val,idx) => {
//     //                         console.log("Grid","RowGrp()","rowIdx",grp.startIdx+idx);
//     //                         return <Row Key={`row${grp.startIdx+idx+1}`} rowIdx={grp.startIdx+idx} id={grp.id} isGrpStart={(idx==0)?true:false} />;
//     //                     })}
//     //                     </>
//     //                 )
//     //             })}
//     //             </>
//     //         );
//     //     }
//     //     return (
//     //         <>
//     //         {datas.map((data,idx) => <Row key={`row${idx+1}`} rowIdx={idx} id="grid" isGrpStart={false} />)}
//     //         </>
//     //     );
//     // }

//     return (
//         <div className="container-fluid m-0 p-0" data-bs-spy="scroll" data-bs-target="#accordionExample" data-bs-smooth-scroll="true" tabIndex="0">
//             {props.children}
//         </div>
//     );
// }