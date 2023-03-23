"use strict";

import React, { useState, useEffect } from 'react';

function ListTitle(props) {
    return <div className="card-header">{props.value}</div>;
}

function ListItem(props) {
    const listItems = props.listItems;
    return (
        <ul className="list-group list-group-flush">
        {listItems.map((listItem, idx) =>
        <li key={idx} className="list-group-item">{listItem}</li>
        )}
    </ul>
    );
}

function BIconMatch(props) {
    if (props.value.endsWith('상세')) {
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>;
    } else if (props.value.endsWith('동기화')) {
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-database-add" viewBox="0 0 16 16">
        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z"/>
        <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
      </svg>;
    } else {
        return <div>이미지 없음</div>;
    }
}

function BCardListGrp2WithTopImg({year, mm, data, clickFn}) {
  // const [year, setYear] = useState(props.year);
  // const [listGrp1, setListGrp1] = useState({
  //   header: '수입 : '+props.data.income,
  //   items: ['월급 : '+props.data.income1, '보너스 등 : '+props.data.income2, '이자,월세이익 : '+props.data.income3, '기타(소득) : '+props.data.income4]
  // });
  // const [links, setLinks] = useState([
  //   {id: "btn1", text: props.mm+'월 상세', href: '/year/'+props.year+'/mm/'+props.mm},
  //   {id: "btn2", text: '동기화', href: '/syncData/year/'+props.year+'/mm/'+props.mm}
  // ]);
  //console.log("BCardListGrp2WithTopImg", data);
  let listGrp1 = {
    header: '수입 : ',
    items: ['월급 : ', '보너스 등 : ', '이자,월세이익 : ', '기타(소득) : ']
  };
  let listGrp2 = {
    header: '지출 : ',
    items: ['저축계 : ', '기본지출계 : ', '생활비계 : ']
  };

  if (data) {
    listGrp1 = {
        header: '수입 : '+data.income,
        items: ['월급 : '+data.income1, '보너스 등 : '+data.income2, '이자,월세이익 : '+data.income3, '기타(소득) : '+data.income4]
    };
    listGrp2 = {
      header: '지출 : '+data.expenditure,
      items: ['저축계 : '+data.expenditure1, '기본지출계 : '+data.expenditure2, '생활비계 : '+data.expenditure3]
    };
  }
  const links = [
    {id: "btn1", text: mm+'월 상세', href: '/year/'+year+'/mm/'+mm},
    {id: "btn2", text: '동기화', href: '/syncData/year/'+year+'/mm/'+mm}
  ];

  return (
    <div className="col-sm-3 me-1 card text-bg-light" id={`divMonth${mm}`}>
      <div className={`card-body bg-img-${year}${(''+mm).padStart(2, '0')}`}>
          <h5 className="card-title">{mm}월</h5>
      </div>
      <ListTitle value={listGrp1.header} />
      <ListItem listItems={listGrp1.items} />
      <ListTitle value={listGrp2.header} />
      <ListItem listItems={listGrp2.items} />
      <div className="card-body">
      {links.map((link) =>
          <button key={link.id} className="btn btn-sm btn-primary active" onClick={() => clickFn(mm, link.text)}>
              <BIconMatch value={link.text} />
              {link.text}
          </button>
      )}
      </div>
    </div>
  );
}

export { BCardListGrp2WithTopImg };