"use strict";

// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

const searchBtn = document.querySelector("#btnSearch");
const searchIpt = document.querySelector("#iptSearch");
// const syncBtns = document.querySelectorAll("[name=btnSync]");

//검색어 입력칸에 Enter버튼 클릭 이벤트 추가
searchIpt.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    if (event.key == "Enter") {
        search();
    }
  });

// 검색버튼 클릭 이벤트 추가
searchBtn.addEventListener("click", search);

function search() {
    const data = {
        searchTxt: document.querySelector("#iptSearch").value,
        year: document.querySelector("#hdnYear").value,
        opt: document.querySelector("[name=flexRadioDefault]:checked").value,
    };
    location.assign("/search/year/"+data.year+"?q="+data.searchTxt+"&opt="+data.opt);
}


/*document.querySelectorAll('[data-bs-spy="scroll"]').forEach(el => {
  el.addEventListener('shown.bs.tab', () => {
    const target = el.getAttribute('data-bs-target')
    const scrollElem = document.querySelector(`${target} [data-bs-spy="scroll"]`)
    bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh()
  })
});*/

/* mn_list의 Accordion내 a 태그 이벤트 추가 */
const tabElms = document.querySelectorAll('#accordionExample a');
tabElms.forEach(tabElm => {
  tabElm.addEventListener('click', event => {
    // console.log(tabElm.href);
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
    event.target.classList.add("active","fw-semibold");
    //event.target // newly activated tab
    //event.relatedTarget // previous active tab
  });
});

/* mn_list의 Accordion내 오늘 날짜의 collapse 확장 */
const showAccordionItem = document.querySelector("#accordionExample .accordion-item .accordion-collapse .accordion-body a.active");
if (showAccordionItem) {
  showAccordionItem.parentElement.parentElement.classList.add("show");
  showAccordionItem.parentElement.parentElement.parentElement.querySelector("button").ariaExpanded = "true";
}
// syncBtns.forEach((syncBtn) => {
//     syncBtn.addEventListener("click", (event) => {
//         fetch("/search", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: JSON.stringify(data) // body data type must match "Content-Type" header
//         })
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(res);
//             location.replace("/book/mn_search.html");
//             // res.render("book/mn_search.html", res,
//             // location.href = "/";
//         });
//     });
// });
