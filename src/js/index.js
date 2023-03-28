"use strict";

import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import * as lib from './lib/lib';

// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import Home from "./menu/Home";
import List, {listTitles} from "./menu/List";
import {BNavbarWithSearchForm as BNavbar} from './comp/BNavbar';
import {GridHeader} from './comp/Grid';
import { MenuTpContext, YearContext, MonthContext } from './Context';

function App() {

  const today = new Date(), years = [];
  for (var i=today.getFullYear(); i >= 2010 ; i--) {
    years.push(i);
  }
  const [selectedYear, setSelectedYear] = useState(useContext(YearContext));
  const [selectedMM, setSelectedMM] = useState(useContext(MonthContext));
  const [linkTp, setLinkTp] = useState(useContext(MenuTpContext));
  const [searchCnt, setSearchCnt] = useState(0);
  const [bottomComp, setBottomComp] = useState(null);

  function goSelectedYear(year, e) {
    console.log("App()","goSelectedYear()",year);

    if (year) {
      setSelectedYear(year);
    }
    setLinkTp("home");
  }

  function goSelectedMM(mm) {
    console.log("App()","goSelectedMM()",mm);
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
    <MenuTpContext.Provider value={linkTp}>
      <YearContext.Provider value={selectedYear}>
      <MonthContext.Provider value={selectedMM}>
      <div className="sticky-top">
        <BNavbar dropdownLink={`${selectedYear}년`} dropdownItems={years} linkFn={[goSelectedYear,goSelectedMM]} searchFn={search}>지연's 가계부</BNavbar>
        {(linkTp == "list" || linkTp == "search") && <GridHeader titles={listTitles} />}
      </div>
      {linkTp == "home" && <Home goList={goSelectedMM} />}
      {(linkTp == "list" || linkTp == "search") && <List year={selectedYear} mm={selectedMM} goHome={goSelectedYear} goList={goSelectedMM} searchCnt={searchCnt} setSrchSumComp={setBottomComp} />}
      </MonthContext.Provider>
      </YearContext.Provider>
    </MenuTpContext.Provider>
  );
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
// root.render(<React.StrictMode><App /></React.StrictMode>);
root.render(<App />);