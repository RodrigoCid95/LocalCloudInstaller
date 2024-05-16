import{r as t,h as e,H as i,d as n}from"./p-b76cbb69.js";import{a,c as o}from"./p-0a92dd03.js";import{a as s}from"./p-bd6f674d.js";import{c as r}from"./p-100c2286.js";import{g as d}from"./p-0ddbbd19.js";import{s as c,x as l,L as m,N as h,M as p}from"./p-6c18487d.js";const b=":host{display:flex;flex-wrap:wrap;align-items:center;justify-content:center}:host button{border-radius:8px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:0px;margin-bottom:0px;position:relative;transition:150ms color ease-in-out;border:none;background:var(--ion-color-step-300, var(--ion-background-color-step-300, #edeef0));color:var(--ion-text-color, #000);font-family:inherit;font-size:1rem;cursor:pointer;overflow:hidden;appearance:none}:host(.time-active) #time-button,:host(.date-active) #date-button{color:var(--ion-color-base)}:host(.datetime-button-disabled){pointer-events:none}:host(.datetime-button-disabled) button{opacity:0.4}:host button{-webkit-padding-start:13px;padding-inline-start:13px;-webkit-padding-end:13px;padding-inline-end:13px;padding-top:7px;padding-bottom:7px}:host button.ion-activated{color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}";const u=b;const f=":host{display:flex;flex-wrap:wrap;align-items:center;justify-content:center}:host button{border-radius:8px;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px;margin-top:0px;margin-bottom:0px;position:relative;transition:150ms color ease-in-out;border:none;background:var(--ion-color-step-300, var(--ion-background-color-step-300, #edeef0));color:var(--ion-text-color, #000);font-family:inherit;font-size:1rem;cursor:pointer;overflow:hidden;appearance:none}:host(.time-active) #time-button,:host(.date-active) #date-button{color:var(--ion-color-base)}:host(.datetime-button-disabled){pointer-events:none}:host(.datetime-button-disabled) button{opacity:0.4}:host button{-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px;padding-top:6px;padding-bottom:6px}";const v=f;const x=class{constructor(e){t(this,e);this.datetimeEl=null;this.overlayEl=null;this.getParsedDateValues=t=>{if(t===undefined||t===null){return[]}if(Array.isArray(t)){return t}return[t]};this.setDateTimeText=()=>{var t,e,i,n,a;const{datetimeEl:o,datetimePresentation:r}=this;if(!o){return}const{value:d,locale:b,formatOptions:u,hourCycle:f,preferWheel:v,multiple:x,titleSelectedDatesFormatter:g}=o;const y=this.getParsedDateValues(d);const k=c(y.length>0?y:[l()]);if(!k){return}const w=k[0];const j=m(b,f);this.dateText=this.timeText=undefined;switch(r){case"date-time":case"time-date":const o=h(b,w,(t=u===null||u===void 0?void 0:u.date)!==null&&t!==void 0?t:{month:"short",day:"numeric",year:"numeric"});const r=p(b,w,j,u===null||u===void 0?void 0:u.time);if(v){this.dateText=`${o} ${r}`}else{this.dateText=o;this.timeText=r}break;case"date":if(x&&y.length!==1){let t=`${y.length} days`;if(g!==undefined){try{t=g(y)}catch(t){s("Exception in provided `titleSelectedDatesFormatter`: ",t)}}this.dateText=t}else{this.dateText=h(b,w,(e=u===null||u===void 0?void 0:u.date)!==null&&e!==void 0?e:{month:"short",day:"numeric",year:"numeric"})}break;case"time":this.timeText=p(b,w,j,u===null||u===void 0?void 0:u.time);break;case"month-year":this.dateText=h(b,w,(i=u===null||u===void 0?void 0:u.date)!==null&&i!==void 0?i:{month:"long",year:"numeric"});break;case"month":this.dateText=h(b,w,(n=u===null||u===void 0?void 0:u.time)!==null&&n!==void 0?n:{month:"long"});break;case"year":this.dateText=h(b,w,(a=u===null||u===void 0?void 0:u.time)!==null&&a!==void 0?a:{year:"numeric"});break}};this.waitForDatetimeChanges=async()=>{const{datetimeEl:t}=this;if(!t){return Promise.resolve()}return new Promise((e=>{a(t,"ionRender",e,{once:true})}))};this.handleDateClick=async t=>{const{datetimeEl:e,datetimePresentation:i}=this;if(!e){return}let n=false;switch(i){case"date-time":case"time-date":const t=e.presentation!=="date";if(!e.preferWheel&&t){e.presentation="date";n=true}break}this.selectedButton="date";this.presentOverlay(t,n,this.dateTargetEl)};this.handleTimeClick=t=>{const{datetimeEl:e,datetimePresentation:i}=this;if(!e){return}let n=false;switch(i){case"date-time":case"time-date":const t=e.presentation!=="time";if(t){e.presentation="time";n=true}break}this.selectedButton="time";this.presentOverlay(t,n,this.timeTargetEl)};this.presentOverlay=async(t,e,i)=>{const{overlayEl:n}=this;if(!n){return}if(n.tagName==="ION-POPOVER"){if(e){await this.waitForDatetimeChanges()}n.present(Object.assign(Object.assign({},t),{detail:{ionShadowTarget:i}}))}else{n.present()}};this.datetimePresentation="date-time";this.dateText=undefined;this.timeText=undefined;this.datetimeActive=false;this.selectedButton=undefined;this.color="primary";this.disabled=false;this.datetime=undefined}async componentWillLoad(){const{datetime:t}=this;if(!t){s("An ID associated with an ion-datetime instance is required for ion-datetime-button to function properly.",this.el);return}const e=this.datetimeEl=document.getElementById(t);if(!e){s(`No ion-datetime instance found for ID '${t}'.`,this.el);return}if(e.tagName!=="ION-DATETIME"){s(`Expected an ion-datetime instance for ID '${t}' but received '${e.tagName.toLowerCase()}' instead.`,e);return}const i=new IntersectionObserver((t=>{const e=t[0];this.datetimeActive=e.isIntersecting}),{threshold:.01});i.observe(e);const n=this.overlayEl=e.closest("ion-modal, ion-popover");if(n){n.classList.add("ion-datetime-button-overlay")}o(e,(()=>{const t=this.datetimePresentation=e.presentation||"date-time";this.setDateTimeText();a(e,"ionValueChange",this.setDateTimeText);switch(t){case"date-time":case"date":case"month-year":case"month":case"year":this.selectedButton="date";break;case"time-date":case"time":this.selectedButton="time";break}}))}render(){const{color:t,dateText:n,timeText:a,selectedButton:o,datetimeActive:s,disabled:c}=this;const l=d(this);return e(i,{key:"0be955404133adbb31ae16a6599014bb29765f19",class:r(t,{[l]:true,[`${o}-active`]:s,["datetime-button-disabled"]:c})},n&&e("button",{key:"812dcb50b17768cc13a5cfa0bcce8b113cee0f09",class:"ion-activatable",id:"date-button","aria-expanded":s?"true":"false",onClick:this.handleDateClick,disabled:c,part:"native",ref:t=>this.dateTargetEl=t},e("slot",{key:"46930c740a32a78502df9e651f9bd5914d6a9fea",name:"date-target"},n),l==="md"&&e("ion-ripple-effect",{key:"0602999cc8435dc37aa22da7f5531bc8cb71e1b4"})),a&&e("button",{key:"ecdd21da5181ecbdce03209f9f6673b7dcbc1f78",class:"ion-activatable",id:"time-button","aria-expanded":s?"true":"false",onClick:this.handleTimeClick,disabled:c,part:"native",ref:t=>this.timeTargetEl=t},e("slot",{key:"b5b093b5166d12d11e27360788edaac916d44390",name:"time-target"},a),l==="md"&&e("ion-ripple-effect",{key:"70bb3a04f4748d13233eeb257503968dbd1161a9"})))}get el(){return n(this)}};x.style={ios:u,md:v};export{x as ion_datetime_button};
//# sourceMappingURL=p-a6b9a847.entry.js.map