import{j as o,r as t,h as n,H as i,d as e}from"./p-b76cbb69.js";let s;const r=()=>{if(typeof window==="undefined"){return new Map}else{if(!s){const o=window;o.Ionicons=o.Ionicons||{};s=o.Ionicons.map=o.Ionicons.map||new Map}return s}};const c=o=>{let t=d(o.src);if(t){return t}t=a(o.name,o.icon,o.mode,o.ios,o.md);if(t){return l(t,o)}if(o.icon){t=d(o.icon);if(t){return t}t=d(o.icon[o.mode]);if(t){return t}}return null};const l=(t,n)=>{const i=r().get(t);if(i){return i}try{return o(`svg/${t}.svg`)}catch(o){console.warn(`[Ionicons Warning]: Could not load icon with name "${t}". Ensure that the icon is registered using addIcons or that the icon SVG data is passed directly to the icon component.`,n)}};const a=(o,t,n,i,e)=>{n=(n&&u(n))==="ios"?"ios":"md";if(i&&n==="ios"){o=u(i)}else if(e&&n==="md"){o=u(e)}else{if(!o&&t&&!f(t)){o=t}if(h(o)){o=u(o)}}if(!h(o)||o.trim()===""){return null}const s=o.replace(/[a-z]|-|\d/gi,"");if(s!==""){return null}return o};const d=o=>{if(h(o)){o=o.trim();if(f(o)){return o}}return null};const f=o=>o.length>0&&/(\/|\.)/.test(o);const h=o=>typeof o==="string";const u=o=>o.toLowerCase();const m=(o,t=[])=>{const n={};t.forEach((t=>{if(o.hasAttribute(t)){const i=o.getAttribute(t);if(i!==null){n[t]=o.getAttribute(t)}o.removeAttribute(t)}}));return n};const p=o=>{if(o){if(o.dir!==""){return o.dir.toLowerCase()==="rtl"}}return(document===null||document===void 0?void 0:document.dir.toLowerCase())==="rtl"};const g=o=>{const t=document.createElement("div");t.innerHTML=o;for(let o=t.childNodes.length-1;o>=0;o--){if(t.childNodes[o].nodeName.toLowerCase()!=="svg"){t.removeChild(t.childNodes[o])}}const n=t.firstElementChild;if(n&&n.nodeName.toLowerCase()==="svg"){const o=n.getAttribute("class")||"";n.setAttribute("class",(o+" s-ion-icon").trim());if(w(n)){return t.innerHTML}}return""};const w=o=>{if(o.nodeType===1){if(o.nodeName.toLowerCase()==="script"){return false}for(let t=0;t<o.attributes.length;t++){const n=o.attributes[t].name;if(h(n)&&n.toLowerCase().indexOf("on")===0){return false}}for(let t=0;t<o.childNodes.length;t++){if(!w(o.childNodes[t])){return false}}}return true};const b=o=>o.startsWith("data:image/svg+xml");const v=o=>o.indexOf(";utf8,")!==-1;const y=new Map;const k=new Map;let x;const I=(o,t)=>{let n=k.get(o);if(!n){if(typeof fetch!=="undefined"&&typeof document!=="undefined"){if(b(o)&&v(o)){if(!x){x=new DOMParser}const t=x.parseFromString(o,"text/html");const n=t.querySelector("svg");if(n){y.set(o,n.outerHTML)}return Promise.resolve()}else{n=fetch(o).then((n=>{if(n.ok){return n.text().then((n=>{if(n&&t!==false){n=g(n)}y.set(o,n||"")}))}y.set(o,"")}));k.set(o,n)}}else{y.set(o,"");return Promise.resolve()}}return n};const M=":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;box-sizing:content-box !important}:host .ionicon{stroke:currentColor}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:32px;stroke-width:var(--ionicon-stroke-width, 32px)}.icon-inner,.ionicon,svg{display:block;height:100%;width:100%}@supports (background: -webkit-named-image(i)){:host(.icon-rtl) .icon-inner{transform:scaleX(-1)}}@supports not selector(:dir(rtl)) and selector(:host-context([dir='rtl'])){:host(.icon-rtl) .icon-inner{transform:scaleX(-1)}}:host(.flip-rtl):host-context([dir='rtl']) .icon-inner{transform:scaleX(-1)}@supports selector(:dir(rtl)){:host(.flip-rtl:dir(rtl)) .icon-inner{transform:scaleX(-1)}:host(.flip-rtl:dir(ltr)) .icon-inner{transform:scaleX(1)}}:host(.icon-small){font-size:1.125rem !important}:host(.icon-large){font-size:2rem !important}:host(.ion-color){color:var(--ion-color-base) !important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}";const j=M;const C=class{constructor(o){t(this,o);this.iconName=null;this.inheritedAttributes={};this.didLoadIcon=false;this.svgContent=undefined;this.isVisible=false;this.mode=X();this.color=undefined;this.ios=undefined;this.md=undefined;this.flipRtl=undefined;this.name=undefined;this.src=undefined;this.icon=undefined;this.size=undefined;this.lazy=false;this.sanitize=true}componentWillLoad(){this.inheritedAttributes=m(this.el,["aria-label"])}connectedCallback(){this.waitUntilVisible(this.el,"50px",(()=>{this.isVisible=true;this.loadIcon()}))}componentDidLoad(){if(!this.didLoadIcon){this.loadIcon()}}disconnectedCallback(){if(this.io){this.io.disconnect();this.io=undefined}}waitUntilVisible(o,t,n){if(this.lazy&&typeof window!=="undefined"&&window.IntersectionObserver){const i=this.io=new window.IntersectionObserver((o=>{if(o[0].isIntersecting){i.disconnect();this.io=undefined;n()}}),{rootMargin:t});i.observe(o)}else{n()}}loadIcon(){if(this.isVisible){const o=c(this);if(o){if(y.has(o)){this.svgContent=y.get(o)}else{I(o,this.sanitize).then((()=>this.svgContent=y.get(o)))}this.didLoadIcon=true}}this.iconName=a(this.name,this.icon,this.mode,this.ios,this.md)}render(){const{flipRtl:o,iconName:t,inheritedAttributes:e,el:s}=this;const r=this.mode||"md";const c=t?(t.includes("arrow")||t.includes("chevron"))&&o!==false:false;const l=o||c;return n(i,Object.assign({role:"img",class:Object.assign(Object.assign({[r]:true},z(this.color)),{[`icon-${this.size}`]:!!this.size,"flip-rtl":l,"icon-rtl":l&&p(s)})},e),this.svgContent?n("div",{class:"icon-inner",innerHTML:this.svgContent}):n("div",{class:"icon-inner"}))}static get assetsDirs(){return["svg"]}get el(){return e(this)}static get watchers(){return{name:["loadIcon"],src:["loadIcon"],icon:["loadIcon"],ios:["loadIcon"],md:["loadIcon"]}}};const X=()=>typeof document!=="undefined"&&document.documentElement.getAttribute("mode")||"md";const z=o=>o?{"ion-color":true,[`ion-color-${o}`]:true}:null;C.style=j;export{C as ion_icon};
//# sourceMappingURL=p-d7da25e1.entry.js.map