import{w as n}from"./p-3647f076.js";import{b as e}from"./p-0a92dd03.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const t=(t,r,i)=>{let d;const o=()=>{const n=r();if(n===undefined||t.label!==undefined||i()===null){return false}return true};const s=()=>{if(o()){e((()=>{f()}))}};const f=()=>{const e=r();if(e===undefined){return}if(!o()){e.style.removeProperty("width");return}const s=i().scrollWidth;if(s===0&&e.offsetParent===null&&n!==undefined&&"IntersectionObserver"in n){if(d!==undefined){return}const n=d=new IntersectionObserver((e=>{if(e[0].intersectionRatio===1){f();n.disconnect();d=undefined}}),{threshold:.01,root:t});n.observe(e);return}e.style.setProperty("width",`${s*.75}px`)};const u=()=>{if(d){d.disconnect();d=undefined}};return{calculateNotchWidth:s,destroy:u}};export{t as c};
//# sourceMappingURL=p-fd9ab812.js.map