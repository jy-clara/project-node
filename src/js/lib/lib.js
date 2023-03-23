export const quarts = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
export const months = [1,2,3,4,5,6,7,8,9,10,11,12];
export const dayNm = ["일","월","화","수","목","금","토"];
export const dayCnt = [7,1,2,3,4,5,6];

export const InvalidDt = "Invalid Date";

export function yyyymmdd(dt) { return dt.toISOString().substring(0,10).replace(/[^0-9]/g, ""); }
export function toDate(dtStr,dtDelim = "") {
  const tmpDtStr = dtStr.replaceAll(dtDelim,"");
  return new Date(tmpDtStr.slice(0,4),Number(tmpDtStr.slice(4,6))-1,tmpDtStr.slice(6));
} 
export function isValidDt(dt) { return (dt == InvalidDt)?false:true; }
export function toOnlyNumStr(str) { return str.replace(/[^0-9]/g, ""); }

export async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  console.log("lib", "postData", url, data);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json(); // parses JSON response into native JavaScript objects
}
