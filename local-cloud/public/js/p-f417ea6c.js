/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const e=(e,r,n)=>{if(typeof n==="function"){return n(e,r)}else if(typeof n==="string"){return e[n]===r[n]}else{return Array.isArray(r)?r.includes(e):e===r}};const r=(r,n,t)=>{if(r===undefined){return false}if(Array.isArray(r)){return r.some((r=>e(r,n,t)))}else{return e(r,n,t)}};export{e as c,r as i};
//# sourceMappingURL=p-f417ea6c.js.map