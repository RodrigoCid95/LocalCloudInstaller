import{d as n}from"./p-3647f076.js";import{f as e,c as t,a as o,r as i,g as s}from"./p-0a92dd03.js";import{OVERLAY_BACK_BUTTON_PRIORITY as r,shouldUseCloseWatcher as d}from"./p-214633ee.js";import{g as a,c}from"./p-0ddbbd19.js";import{C as l}from"./p-d00c3230.js";import{B as u}from"./p-c7ee7cfe.js";import{p as f}from"./p-bd6f674d.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const m='[tabindex]:not([tabindex^="-"]):not([hidden]):not([disabled]), input:not([type=hidden]):not([tabindex^="-"]):not([hidden]):not([disabled]), textarea:not([tabindex^="-"]):not([hidden]):not([disabled]), button:not([tabindex^="-"]):not([hidden]):not([disabled]), select:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable[disabled="false"]:not([tabindex^="-"]):not([hidden])';const p=(n,e)=>{const t=n.querySelector(m);h(t,e!==null&&e!==void 0?e:n)};const v=(n,e)=>{const t=Array.from(n.querySelectorAll(m));const o=t.length>0?t[t.length-1]:null;h(o,e!==null&&e!==void 0?e:n)};const h=(n,t)=>{let o=n;const i=n===null||n===void 0?void 0:n.shadowRoot;if(i){o=i.querySelector(m)||n}if(o){e(o)}else{t.focus()}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */let b=0;let y=0;const w=new WeakMap;const g=n=>({create(e){return D(n,e)},dismiss(e,t,o){return M(document,e,t,n,o)},async getTop(){return G(document,n)}});const O=g("ion-alert");const k=g("ion-action-sheet");const T=g("ion-loading");const x=g("ion-modal");const j=g("ion-popover");const A=g("ion-toast");const C=n=>{if(typeof document!=="undefined"){P(document)}const e=b++;n.overlayIndex=e};const I=n=>{if(!n.hasAttribute("id")){n.id=`ion-overlay-${++y}`}return n.id};const D=(n,e)=>{if(typeof window!=="undefined"&&typeof window.customElements!=="undefined"){return window.customElements.whenDefined(n).then((()=>{const o=document.createElement(n);o.classList.add("overlay-hidden");Object.assign(o,Object.assign(Object.assign({},e),{hasController:true}));W(document).appendChild(o);return new Promise((n=>t(o,n)))}))}return Promise.resolve()};const N=n=>n.classList.contains("overlay-hidden");const S=(n,t)=>{let o=n;const i=n===null||n===void 0?void 0:n.shadowRoot;if(i){o=i.querySelector(m)||n}if(o){e(o)}else{t.focus()}};const B=(n,e)=>{const t=G(e,"ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker-legacy,ion-popover");const o=n.target;if(!t||!o){return}if(t.classList.contains(tn)){return}const i=()=>{if(t===o){t.lastFocus=undefined}else if(o.tagName==="ION-TOAST"){S(t.lastFocus,t)}else{const n=s(t);if(!n.contains(o)){return}const i=n.querySelector(".ion-overlay-wrapper");if(!i){return}if(i.contains(o)||o===n.querySelector("ion-backdrop")){t.lastFocus=o}else{const n=t.lastFocus;p(i,t);if(n===e.activeElement){v(i,t)}t.lastFocus=e.activeElement}}};const r=()=>{if(t.contains(o)){t.lastFocus=o}else if(o.tagName==="ION-TOAST"){S(t.lastFocus,t)}else{const n=t.lastFocus;p(t);if(n===e.activeElement){v(t)}t.lastFocus=e.activeElement}};if(t.shadowRoot){r()}else{i()}};const P=n=>{if(b===0){b=1;n.addEventListener("focus",(e=>{B(e,n)}),true);n.addEventListener("ionBackButton",(e=>{const t=G(n);if(t===null||t===void 0?void 0:t.backdropDismiss){e.detail.register(r,(()=>{t.dismiss(undefined,R)}))}}));if(!d()){n.addEventListener("keydown",(e=>{if(e.key==="Escape"){const e=G(n);if(e===null||e===void 0?void 0:e.backdropDismiss){e.dismiss(undefined,R)}}}))}}};const M=(n,e,t,o,i)=>{const s=G(n,o,i);if(!s){return Promise.reject("overlay does not exist")}return s.dismiss(e,t)};const E=(n,e)=>{if(e===undefined){e="ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-picker-legacy,ion-popover,ion-toast"}return Array.from(n.querySelectorAll(e)).filter((n=>n.overlayIndex>0))};const F=(n,e)=>E(n,e).filter((n=>!N(n)));const G=(n,e,t)=>{const o=F(n,e);return t===undefined?o[o.length-1]:o.find((n=>n.id===t))};const L=(n=false)=>{const e=W(document);const t=e.querySelector("ion-router-outlet, ion-nav, #ion-view-container-root");if(!t){return}if(n){t.setAttribute("aria-hidden","true")}else{t.removeAttribute("aria-hidden")}};const V=async(n,e,t,o,i)=>{var s,r;if(n.presented){return}L(true);document.body.classList.add(u);nn(n.el);n.presented=true;n.willPresent.emit();(s=n.willPresentShorthand)===null||s===void 0?void 0:s.emit();const d=a(n);const l=n.enterAnimation?n.enterAnimation:c.get(e,d==="ios"?t:o);const f=await _(n,l,n.el,i);if(f){n.didPresent.emit();(r=n.didPresentShorthand)===null||r===void 0?void 0:r.emit()}if(n.el.tagName!=="ION-TOAST"){$(n.el)}if(n.keyboardClose&&(document.activeElement===null||!n.el.contains(document.activeElement))){n.el.focus()}n.el.removeAttribute("aria-hidden")};const $=async n=>{let e=document.activeElement;if(!e){return}const t=e===null||e===void 0?void 0:e.shadowRoot;if(t){e=t.querySelector(m)||e}await n.onDidDismiss();if(document.activeElement===null||document.activeElement===document.body){e.focus()}};const z=async(e,t,o,i,s,r,d)=>{var l,f;if(!e.presented){return false}const m=n!==undefined&&F(n).length===1;if(m){L(false);document.body.classList.remove(u)}e.presented=false;try{e.el.style.setProperty("pointer-events","none");e.willDismiss.emit({data:t,role:o});(l=e.willDismissShorthand)===null||l===void 0?void 0:l.emit({data:t,role:o});const n=a(e);const u=e.leaveAnimation?e.leaveAnimation:c.get(i,n==="ios"?s:r);if(o!==U){await _(e,u,e.el,d)}e.didDismiss.emit({data:t,role:o});(f=e.didDismissShorthand)===null||f===void 0?void 0:f.emit({data:t,role:o});const m=w.get(e)||[];m.forEach((n=>n.destroy()));w.delete(e);e.el.classList.add("overlay-hidden");e.el.style.removeProperty("pointer-events");if(e.el.lastFocus!==undefined){e.el.lastFocus=undefined}}catch(n){console.error(n)}e.el.remove();en();return true};const W=n=>n.querySelector("ion-app")||n.body;const _=async(n,e,t,o)=>{t.classList.remove("overlay-hidden");const i=n.el;const s=e(i,o);if(!n.animated||!c.getBoolean("animated",true)){s.duration(0)}if(n.keyboardClose){s.beforeAddWrite((()=>{const n=t.ownerDocument.activeElement;if(n===null||n===void 0?void 0:n.matches("input,ion-input, ion-textarea")){n.blur()}}))}const r=w.get(n)||[];w.set(n,[...r,s]);await s.play();return true};const q=(n,e)=>{let t;const o=new Promise((n=>t=n));H(n,e,(n=>{t(n.detail)}));return o};const H=(n,e,t)=>{const s=o=>{i(n,e,s);t(o)};o(n,e,s)};const J=n=>n==="cancel"||n===R;const K=n=>n();const Q=(n,e)=>{if(typeof n==="function"){const t=c.get("_zoneGate",K);return t((()=>{try{return n(e)}catch(n){throw n}}))}return undefined};const R="backdrop";const U="gesture";const X=39;const Y=n=>{let e=false;let t;const o=l();const i=(i=false)=>{if(t&&!i){return{delegate:t,inline:e}}const{el:s,hasController:r,delegate:d}=n;const a=s.parentNode;e=a!==null&&!r;t=e?d||o:d;return{inline:e,delegate:t}};const s=async e=>{const{delegate:t}=i(true);if(t){return await t.attachViewToDom(n.el,e)}const{hasController:o}=n;if(o&&e!==undefined){throw new Error("framework delegate is missing")}return null};const r=()=>{const{delegate:e}=i();if(e&&n.el!==undefined){e.removeViewFromDom(n.el.parentElement,n.el)}};return{attachViewToDom:s,removeViewFromDom:r}};const Z=()=>{let n;const e=()=>{if(n){n();n=undefined}};const t=(t,o)=>{e();const i=o!==undefined?document.getElementById(o):null;if(!i){f(`A trigger element with the ID "${o}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on an overlay component.`,t);return}const s=(n,e)=>{const t=()=>{e.present()};n.addEventListener("click",t);return()=>{n.removeEventListener("click",t)}};n=s(i,t)};return{addClickListener:t,removeClickListener:e}};const nn=e=>{var t;if(n===undefined)return;const o=F(n);for(let n=o.length-1;n>=0;n--){const i=o[n];const s=(t=o[n+1])!==null&&t!==void 0?t:e;if(s.hasAttribute("aria-hidden")||s.tagName!=="ION-TOAST"){i.setAttribute("aria-hidden","true")}}};const en=()=>{if(n===undefined)return;const e=F(n);for(let n=e.length-1;n>=0;n--){const t=e[n];t.removeAttribute("aria-hidden");if(t.tagName!=="ION-TOAST"){break}}};const tn="ion-disable-focus-trap";export{R as B,tn as F,U as G,X as O,k as a,O as b,Y as c,Z as d,V as e,z as f,q as g,Q as h,J as i,G as j,p as k,T as l,x as m,v as n,j as o,C as p,I as s,A as t};
//# sourceMappingURL=p-9476087a.js.map