import{w as o,d as t}from"./p-3647f076.js";import{g as n,c as s,f as e}from"./p-0fa1d48e.js";import{a as i,r as c,b as r,c as a}from"./p-0a92dd03.js";import{a as f,K as u}from"./p-9ac21ff8.js";import"./p-bd6f674d.js";import"./p-78bffe29.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const l=new WeakMap;const d=(o,t,n,s=0,e=false)=>{if(l.has(o)===n){return}if(n){p(o,t,s,e)}else{m(o,t)}};const w=o=>o===o.getRootNode().activeElement;const p=(o,t,n,s=false)=>{const e=t.parentNode;const i=t.cloneNode(false);i.classList.add("cloned-input");i.tabIndex=-1;if(s){i.disabled=true}e.appendChild(i);l.set(o,i);const c=o.ownerDocument;const r=c.dir==="rtl"?9999:-9999;o.style.pointerEvents="none";t.style.transform=`translate3d(${r}px,${n}px,0) scale(0)`};const m=(o,t)=>{const n=l.get(o);if(n){l.delete(o);n.remove()}o.style.pointerEvents="";t.style.transform=""};const S=50;
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const h=(o,t,n)=>{if(!n||!t){return()=>{}}const s=n=>{if(w(t)){d(o,t,n)}};const e=()=>d(o,t,false);const r=()=>s(true);const a=()=>s(false);i(n,"ionScrollStart",r);i(n,"ionScrollEnd",a);t.addEventListener("blur",e);return()=>{c(n,"ionScrollStart",r);c(n,"ionScrollEnd",a);t.removeEventListener("blur",e)}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const b="input, textarea, [no-blur], [contenteditable]";const y=()=>{let o=true;let t=false;const n=document;const s=()=>{t=true};const e=()=>{o=true};const r=s=>{if(t){t=false;return}const e=n.activeElement;if(!e){return}if(e.matches(b)){return}const i=s.target;if(i===e){return}if(i.matches(b)||i.closest(b)){return}o=false;setTimeout((()=>{if(!o){e.blur()}}),50)};i(n,"ionScrollStart",s);n.addEventListener("focusin",e,true);n.addEventListener("touchend",r,false);return()=>{c(n,"ionScrollStart",s,true);n.removeEventListener("focusin",e,true);n.removeEventListener("touchend",r,false)}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const D=.3;const K=(o,t,n,s)=>{var e;const i=(e=o.closest("ion-item,[ion-item]"))!==null&&e!==void 0?e:o;return M(i.getBoundingClientRect(),t.getBoundingClientRect(),n,s)};const M=(o,t,n,s)=>{const e=o.top;const i=o.bottom;const c=t.top;const r=Math.min(t.bottom,s-n);const a=c+15;const f=r-S;const u=f-i;const l=a-e;const d=Math.round(u<0?-u:l>0?-l:0);const w=Math.min(d,e-c);const p=Math.abs(w);const m=p/D;const h=Math.min(400,Math.max(150,m));return{scrollAmount:w,scrollDuration:h,scrollPadding:n,inputSafeY:-(e-a)+4}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const v="$ionPaddingTimer";const x=(o,t,n)=>{const s=o[v];if(s){clearTimeout(s)}if(t>0){o.style.setProperty("--keyboard-offset",`${t}px`)}else{o[v]=setTimeout((()=>{o.style.setProperty("--keyboard-offset","0px");if(n){n()}}),120)}};const k=(o,t,n)=>{const s=()=>{if(t){x(t,0,n)}};o.addEventListener("focusout",s,{once:true})};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */let g=0;const j="data-ionic-skip-scroll-assist";const T=(t,n,s,e,i,c,r,a=false)=>{const u=c&&(r===undefined||r.mode===f.None);let l=false;const d=o!==undefined?o.innerHeight:0;const w=o=>{if(l===false){l=true;return}$(t,n,s,e,o.detail.keyboardHeight,u,a,d,false)};const p=()=>{l=false;o===null||o===void 0?void 0:o.removeEventListener("ionKeyboardDidShow",w);t.removeEventListener("focusout",p)};const m=async()=>{if(n.hasAttribute(j)){n.removeAttribute(j);return}$(t,n,s,e,i,u,a,d);o===null||o===void 0?void 0:o.addEventListener("ionKeyboardDidShow",w);t.addEventListener("focusout",p)};t.addEventListener("focusin",m);return()=>{t.removeEventListener("focusin",m);o===null||o===void 0?void 0:o.removeEventListener("ionKeyboardDidShow",w);t.removeEventListener("focusout",p)}};const P=o=>{if(document.activeElement===o){return}o.setAttribute(j,"true");o.focus()};const $=async(o,t,e,i,c,a,f=false,u=0,l=true)=>{if(!e&&!i){return}const w=K(o,e||i,c,u);if(e&&Math.abs(w.scrollAmount)<4){P(t);if(a&&e!==null){x(e,g);k(t,e,(()=>g=0))}return}d(o,t,true,w.inputSafeY,f);P(t);r((()=>o.click()));if(a&&e){g=w.scrollPadding;x(e,g)}if(typeof window!=="undefined"){let i;const c=async()=>{if(i!==undefined){clearTimeout(i)}window.removeEventListener("ionKeyboardDidShow",r);window.removeEventListener("ionKeyboardDidShow",c);if(e){await s(e,0,w.scrollAmount,w.scrollDuration)}d(o,t,false,w.inputSafeY);P(t);if(a){k(t,e,(()=>g=0))}};const r=()=>{window.removeEventListener("ionKeyboardDidShow",r);window.addEventListener("ionKeyboardDidShow",c)};if(e){const o=await n(e);const s=o.scrollHeight-o.clientHeight;if(l&&w.scrollAmount>s-o.scrollTop){if(t.type==="password"){w.scrollAmount+=S;window.addEventListener("ionKeyboardDidShow",r)}else{window.addEventListener("ionKeyboardDidShow",c)}i=setTimeout(c,1e3);return}}c()}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const A=true;const W=async(o,n)=>{if(t===undefined){return}const s=n==="ios";const i=n==="android";const c=o.getNumber("keyboardHeight",290);const r=o.getBoolean("scrollAssist",true);const f=o.getBoolean("hideCaretOnScroll",s);const l=o.getBoolean("inputBlurring",false);const d=o.getBoolean("scrollPadding",true);const w=Array.from(t.querySelectorAll("ion-input, ion-textarea"));const p=new WeakMap;const m=new WeakMap;const S=await u.getResizeMode();const b=async o=>{await new Promise((t=>a(o,t)));const t=o.shadowRoot||o;const n=t.querySelector("input")||t.querySelector("textarea");const s=e(o);const u=!s?o.closest("ion-footer"):null;if(!n){return}if(!!s&&f&&!p.has(o)){const t=h(o,n,s);p.set(o,t)}const l=n.type==="date"||n.type==="datetime-local";if(!l&&(!!s||!!u)&&r&&!m.has(o)){const t=T(o,n,s,u,c,d,S,i);m.set(o,t)}};const D=o=>{if(f){const t=p.get(o);if(t){t()}p.delete(o)}if(r){const t=m.get(o);if(t){t()}m.delete(o)}};if(l&&A){y()}for(const o of w){b(o)}t.addEventListener("ionInputDidLoad",(o=>{b(o.detail)}));t.addEventListener("ionInputDidUnload",(o=>{D(o.detail)}))};export{W as startInputShims};
//# sourceMappingURL=p-45943e21.js.map