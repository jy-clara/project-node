"use strict";

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import * as lib from './lib/lib';

// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import Home from "./menu/Home";
import List, {getGridRowComp} from "./menu/List";
import {BNavbarWithSearchForm as BNavbar} from './comp/BNavbar';

function App() {

  const today = new Date(), years = [];
  for (var i=2010; i <= today.getFullYear(); i++) {
    years.push(i);
  }
  const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear());
  const [selectedMM, setSelectedMM] = useState(0);
  const [linkTp, setLinkTp] = useState("home");
  const [searchCnt, setSearchCnt] = useState(0);

  function goSelectedYear(year) {
    console.log("App()","goSelectedYear()",year);
    if (year) {
      setSelectedYear(year);
    }
    setLinkTp("home");
  }

  function goSelectedMM(mm) {
    console.log("App()","goSelectedMM()",mm)
    setSelectedMM(mm);
    setLinkTp("list");
  }

  function search() {
    console.log("App()","search()")
    setSelectedMM(0);
    setLinkTp("search");
    setSearchCnt(searchCnt+1);
  }

  useEffect(() => {
    document.title = `${selectedYear}년 가계부`;
  },[selectedYear]);
  
  return (
    <>
      {linkTp == "home" && <Home year={selectedYear} goList={goSelectedMM} />}
      {(linkTp == "list" || linkTp == "search") && <List year={selectedYear} mm={selectedMM} goHome={goSelectedYear} goList={goSelectedMM} searchCnt={searchCnt} />}
      <BNavbar dropdownLink={`${selectedYear}년`} dropdownItems={years} linkFn={goSelectedYear} searchFn={search} />
    </>
  );
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
// root.render(<React.StrictMode><App /></React.StrictMode>);
root.render(<App />);