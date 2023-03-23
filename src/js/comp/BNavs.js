"use strict";

import React, { useState, useEffect } from 'react';

function BNavTabs({navItems, linkFn}) {
    return (
        <ul className="nav nav-tabs text-bg-success">
            <li className="nav-item">
                <button className="nav-link" onClick={() => linkFn[0]()}>Home</button>
            </li>
            {navItems.map((navItem) =>
            <li key={navItem.id} className="nav-item">
            {(navItem.selected)
              ?  <button className="nav-link active" aria-current="page" onClick={() => linkFn[1](navItem.id)}>{navItem.text}</button>
              :  <button className="nav-link" onClick={() => linkFn[1](navItem.id)}>{navItem.text}</button>
            }
            </li>
            )}
        </ul>
    );
}
  
export { BNavTabs };