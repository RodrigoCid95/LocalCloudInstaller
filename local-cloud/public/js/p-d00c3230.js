import{c as t}from"./p-0a92dd03.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const e=async(e,o,n,i,r,s)=>{var a;if(e){return e.attachViewToDom(o,n,r,i)}if(!s&&typeof n!=="string"&&!(n instanceof HTMLElement)){throw new Error("framework delegate is missing")}const c=typeof n==="string"?(a=o.ownerDocument)===null||a===void 0?void 0:a.createElement(n):n;if(i){i.forEach((t=>c.classList.add(t)))}if(r){Object.assign(c,r)}o.appendChild(c);await new Promise((e=>t(c,e)));return c};const o=(t,e)=>{if(e){if(t){const o=e.parentElement;return t.removeViewFromDom(o,e)}e.remove()}return Promise.resolve()};const n=()=>{let e;let o;const n=async(n,i,r={},s=[])=>{var a,c;e=n;let d;if(i){const o=typeof i==="string"?(a=e.ownerDocument)===null||a===void 0?void 0:a.createElement(i):i;s.forEach((t=>o.classList.add(t)));Object.assign(o,r);e.appendChild(o);d=o;await new Promise((e=>t(o,e)))}else if(e.children.length>0&&(e.tagName==="ION-MODAL"||e.tagName==="ION-POPOVER")){const t=d=e.children[0];if(!t.classList.contains("ion-delegate-host")){const t=(c=e.ownerDocument)===null||c===void 0?void 0:c.createElement("div");t.classList.add("ion-delegate-host");s.forEach((e=>t.classList.add(e)));t.append(...e.children);e.appendChild(t);d=t}}const l=document.querySelector("ion-app")||document.body;o=document.createComment("ionic teleport");e.parentNode.insertBefore(o,e);l.appendChild(e);return d!==null&&d!==void 0?d:e};const i=()=>{if(e&&o){o.parentNode.insertBefore(e,o);o.remove()}return Promise.resolve()};return{attachViewToDom:n,removeViewFromDom:i}};export{n as C,e as a,o as d};
//# sourceMappingURL=p-d00c3230.js.map