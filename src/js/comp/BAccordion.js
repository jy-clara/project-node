"use strict";

import React from 'react';

export default function BAccordion({id, grps}) {

    function handleCollapseClick(itemId, e) {
        e.preventDefault();
        const tabElms = document.querySelectorAll(`#${id} a`);
        tabElms.forEach(tabElm1 => {
            if (tabElm1.classList.contains("active")) {
                tabElm1.classList.remove("active","fw-semibold");
                tabElm1.classList.add("fw-normal");
                // console.log("tabElm1.href="+tabElm1.href);
                return;
            }
        });
            // const activeElm = document.querySelectorAll('#accordionExample a.active');
            // console.log("event.target.href="+event.target.href);
        e.target.classList.add("active","fw-semibold");
        const ele = document.getElementById(itemId);
        if (ele) {
            ele.scrollIntoView({ behavior: "smooth", block: "center"});
        }
            //event.target // newly activated tab
            //event.relatedTarget // previous active tab
    }

    return (
        <div className="accordion" id={id}>
            {grps.map((grp, idx) => (
            <div key={`accordionItem${idx+1}`} className="accordion-item">
                <h2 className="accordion-header" id={`heading${idx+1}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${idx+1}`} aria-expanded={grp.isActive} aria-controls={`collapse${idx+1}`}>
                        {grp.text}
                    </button>
                </h2>
                <div id={`collapse${idx+1}`} className={`accordion-collapse collapse${grp.isActive ? " show":""}`} aria-labelledby={`heading${idx+1}`} data-bs-parent={`#${id}`}>
                    <div className="nav-pills accordion-body p-0 mt-2">
                    {grp.items.map((item,idx) => (
                        <a key={`accordionBody${idx+1}`} className={`nav-link m-0 p-0 ps-2 pb-3 ${item.selected?'active fw-semibold':'fw-normal'}`} style={{fontSize: '14px'}} onClick={(e) => handleCollapseClick(item.id, e)}>
                            {item.text}
                        </a>
                    ))}
                    </div>
                </div>
            </div>))}
        </div>
    );
}