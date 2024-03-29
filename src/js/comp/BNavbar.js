"use strict";

import React, { useContext } from 'react';
import * as lib from '../lib/lib';
import { MenuTpContext, MonthContext } from '../Context';


function Barnd({children}) {
  return (
    <a className="navbar-brand" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-heart d-inline-block align-text-top" viewBox="0 0 16 16">
        <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z"/>
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
      </svg>
      &nbsp;{children}
    </a>
  );
}

function Nav({dropdownDirection, dropdownLink, dropdownItems, onClick}) {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className={`nav-item ${dropdownDirection}`}>
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {dropdownLink}
        </a>
        <ul className="dropdown-menu">
          {dropdownItems.map((item) =>
            <li key={item}><button className="dropdown-item" type="button" onClick={() => onClick(item)}>{item}년</button></li>
          )}
        </ul>
      </li>
    </ul>
  );
}

function Form({dropdownDirection, onClick}) {
  function keydown(e) {
    if (e.isComposing || e.keyCode === 229) {
      return;
    }
    if (e.key == "Enter") {
        onClick();
    }
  }

  return (
    <div className="d-flex" role="search">
      <div className={`input-group ${dropdownDirection}-center ${dropdownDirection} me-2`}>
        <input className="form-control" type="search" placeholder="검색" aria-label="Search" id="iptSearch" onKeyDown={keydown} />
        {/* <input type="hidden" id="hdnYear" value={year} /> */}
        <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
          옵션
        </button>
        <div className="dropdown-menu ms-5 p-4">
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              전체
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked value="C" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Contents
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="G" />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              Remark
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="D" />
            <label className="form-check-label" htmlFor="flexRadioDefault4">
              Expenses
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" value="B" />
            <label className="form-check-label" htmlFor="flexRadioDefault5">
              Date
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" value="H" />
            <label className="form-check-label" htmlFor="flexRadioDefault6">
              Contents Code
            </label>
          </div>
        </div>
      </div>
      {/* <button className="btn btn-outline-success" id="btnSearch" type="button" onClick={onClick}>Search</button> */}
    </div>
  );
}

export function BNavbarWithSearchForm({dropdownLink, dropdownItems, linkFn, searchFn, children}) {
  const menuTp = useContext(MenuTpContext);
  const selectedMM = useContext(MonthContext);

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-dark bd-navbar">
        <nav className="container-xxl">
          <Barnd>{children}</Barnd>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Nav dropdownDirection="dropdown" dropdownLink={dropdownLink} dropdownItems={dropdownItems} onClick={linkFn[0]} />
            <Form dropdownDirection="dropdown" onClick={searchFn} />
          </div>
        </nav>
      </header>
      <ul className="nav nav-pills bg-light">
        <li className="nav-item">
          {menuTp == "home"
            ? <a className="nav-link py-1 active" aria-current="page">Home</a>
            : <a className="nav-link py-1" onClick={(e) => {e.preventDefault(); linkFn[0]();}} href="#">Home</a>
          }
        </li>
        {
          lib.months.map((month) => (
            <li key={`monthNav${month}`} className="nav-item">
            {menuTp != "home" && selectedMM == month
              ? <a className="nav-link py-1 active" aria-current="page">{month}월</a>
              : <a className="nav-link py-1" onClick={(e) => {e.preventDefault(); linkFn[1](month);}} href="#">{month}월</a>
            }
            </li>
          ))
        }
      </ul>
    </>
    );
  }