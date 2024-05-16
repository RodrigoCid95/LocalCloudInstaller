import{f as o,w as s}from"./p-b76cbb69.js";import{f as t,s as r}from"./p-0fa1d48e.js";import{c as a}from"./p-0a92dd03.js";import"./p-bd6f674d.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const n=()=>{const n=window;n.addEventListener("statusTap",(()=>{o((()=>{const o=n.innerWidth;const f=n.innerHeight;const c=document.elementFromPoint(o/2,f/2);if(!c){return}const i=t(c);if(i){new Promise((o=>a(i,o))).then((()=>{s((async()=>{i.style.setProperty("--overflow","hidden");await r(i,300);i.style.removeProperty("--overflow")}))}))}}))}))};export{n as startStatusTap};
//# sourceMappingURL=p-28aa5948.js.map