import{r as t,i,h as o,H as n,d as e}from"./p-b76cbb69.js";import{e as r,b as a}from"./p-0a92dd03.js";import{h as d,c as s,o as l}from"./p-100c2286.js";import{f as c}from"./p-bc25170e.js";import{g as p}from"./p-0ddbbd19.js";const g=':host{--border-radius:0px;--border-width:0px;--border-style:solid;--padding-top:0px;--padding-bottom:0px;--padding-end:0px;--padding-start:0px;--inner-border-width:0px;--inner-padding-top:0px;--inner-padding-bottom:0px;--inner-padding-start:0px;--inner-padding-end:0px;--inner-box-shadow:none;--detail-icon-color:initial;--detail-icon-font-size:1.25em;--detail-icon-opacity:0.25;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;align-items:center;justify-content:space-between;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:initial;text-decoration:none;overflow:hidden;box-sizing:border-box}:host(.ion-color) .item-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color) .item-native,:host(.ion-color) .item-inner{border-color:var(--ion-color-shade)}:host(.ion-activated) .item-native{color:var(--color-activated)}:host(.ion-activated) .item-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.ion-color.ion-activated) .item-native{color:var(--ion-color-contrast)}:host(.ion-focused) .item-native{color:var(--color-focused)}:host(.ion-focused) .item-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(.ion-color.ion-focused) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-focused) .item-native::after{background:var(--ion-color-contrast)}@media (any-hover: hover){:host(.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--color-hover)}:host(.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--ion-color-contrast)}}:host(.item-control-needs-pointer-cursor){cursor:pointer}:host(.item-interactive-disabled:not(.item-multiple-inputs)){cursor:default;pointer-events:none}:host(.item-disabled){cursor:default;opacity:0.3;pointer-events:none}.item-native{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-right:var(--padding-end);padding-left:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));display:flex;position:relative;align-items:inherit;justify-content:inherit;width:100%;min-height:var(--min-height);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);overflow:inherit;z-index:1;box-sizing:border-box}:host-context([dir=rtl]) .item-native{padding-right:calc(var(--padding-start) + var(--ion-safe-area-right, 0px));padding-left:var(--padding-end)}[dir=rtl] .item-native{padding-right:calc(var(--padding-start) + var(--ion-safe-area-right, 0px));padding-left:var(--padding-end)}@supports selector(:dir(rtl)){.item-native:dir(rtl){padding-right:calc(var(--padding-start) + var(--ion-safe-area-right, 0px));padding-left:var(--padding-end)}}.item-native::-moz-focus-inner{border:0}.item-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0;transition:var(--transition);z-index:-1}button,a{cursor:pointer;user-select:none;-webkit-user-drag:none}.item-inner{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-top:var(--inner-padding-top);padding-bottom:var(--inner-padding-bottom);padding-right:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-left:var(--inner-padding-start);display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);box-shadow:var(--inner-box-shadow);overflow:inherit;box-sizing:border-box}:host-context([dir=rtl]) .item-inner{padding-right:var(--inner-padding-start);padding-left:calc(var(--ion-safe-area-left, 0px) + var(--inner-padding-end))}[dir=rtl] .item-inner{padding-right:var(--inner-padding-start);padding-left:calc(var(--ion-safe-area-left, 0px) + var(--inner-padding-end))}@supports selector(:dir(rtl)){.item-inner:dir(rtl){padding-right:var(--inner-padding-start);padding-left:calc(var(--ion-safe-area-left, 0px) + var(--inner-padding-end))}}.item-detail-icon{-webkit-margin-start:calc(var(--inner-padding-end) / 2);margin-inline-start:calc(var(--inner-padding-end) / 2);-webkit-margin-end:-6px;margin-inline-end:-6px;color:var(--detail-icon-color);font-size:var(--detail-icon-font-size);opacity:var(--detail-icon-opacity)}::slotted(ion-icon){font-size:1.6em}::slotted(ion-button){--margin-top:0;--margin-bottom:0;--margin-start:0;--margin-end:0;z-index:1}::slotted(ion-label:not([slot=end])){flex:1;width:min-content;max-width:100%}:host(.item-input){align-items:center}.input-wrapper{display:flex;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;text-overflow:ellipsis;overflow:inherit;box-sizing:border-box}:host(.item-label-stacked),:host(.item-label-floating){align-items:start}:host(.item-label-stacked) .input-wrapper,:host(.item-label-floating) .input-wrapper{flex:1;flex-direction:column}:host(.item-multiple-inputs) ::slotted(ion-checkbox),:host(.item-multiple-inputs) ::slotted(ion-datetime),:host(.item-multiple-inputs) ::slotted(ion-radio){position:relative}:host(.item-textarea){align-items:stretch}::slotted(ion-reorder[slot]){margin-top:0;margin-bottom:0}ion-ripple-effect{color:var(--ripple-color)}:host{--min-height:44px;--transition:background-color 200ms linear, opacity 200ms linear;--padding-start:16px;--inner-padding-end:16px;--inner-border-width:0px 0px 0.55px 0px;--background:var(--ion-item-background, var(--ion-background-color, #fff));--background-activated:var(--ion-text-color, #000);--background-focused:var(--ion-text-color, #000);--background-hover:currentColor;--background-activated-opacity:.12;--background-focused-opacity:.15;--background-hover-opacity:.04;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, var(--ion-background-color-step-250, #c8c7cc))));--color:var(--ion-item-color, var(--ion-text-color, #000));font-size:1rem}:host(.ion-activated){--transition:none}:host(.ion-color.ion-focused) .item-native::after{background:#000;opacity:0.15}:host(.ion-color.ion-activated) .item-native::after{background:#000;opacity:0.12}:host(.item-lines-full){--border-width:0px 0px 0.55px 0px}:host(.item-lines-inset){--inner-border-width:0px 0px 0.55px 0px}:host(.item-lines-inset),:host(.item-lines-none){--border-width:0px}:host(.item-lines-full),:host(.item-lines-none){--inner-border-width:0px}::slotted([slot=start]){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:2px;margin-bottom:2px}::slotted(ion-icon[slot=start]),::slotted(ion-icon[slot=end]){margin-top:7px;margin-bottom:7px}::slotted(ion-toggle[slot=start]),::slotted(ion-toggle[slot=end]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}:host(.item-label-stacked) ::slotted([slot=end]),:host(.item-label-floating) ::slotted([slot=end]){margin-top:7px;margin-bottom:7px}::slotted(.button-small){--padding-top:1px;--padding-bottom:1px;--padding-start:.5em;--padding-end:.5em;min-height:24px;font-size:0.8125rem}::slotted(ion-avatar){width:36px;height:36px}::slotted(ion-thumbnail){--size:56px}::slotted(ion-avatar[slot=end]),::slotted(ion-thumbnail[slot=end]){-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:8px;margin-bottom:8px}:host(.item-radio) ::slotted(ion-label),:host(.item-toggle) ::slotted(ion-label){-webkit-margin-start:0px;margin-inline-start:0px}::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px;margin-top:10px;margin-bottom:10px}:host(.item-label-floating),:host(.item-label-stacked){--min-height:68px}';const m=g;const h=':host{--border-radius:0px;--border-width:0px;--border-style:solid;--padding-top:0px;--padding-bottom:0px;--padding-end:0px;--padding-start:0px;--inner-border-width:0px;--inner-padding-top:0px;--inner-padding-bottom:0px;--inner-padding-start:0px;--inner-padding-end:0px;--inner-box-shadow:none;--detail-icon-color:initial;--detail-icon-font-size:1.25em;--detail-icon-opacity:0.25;--color-activated:var(--color);--color-focused:var(--color);--color-hover:var(--color);--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;align-items:center;justify-content:space-between;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);text-align:initial;text-decoration:none;overflow:hidden;box-sizing:border-box}:host(.ion-color) .item-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color) .item-native,:host(.ion-color) .item-inner{border-color:var(--ion-color-shade)}:host(.ion-activated) .item-native{color:var(--color-activated)}:host(.ion-activated) .item-native::after{background:var(--background-activated);opacity:var(--background-activated-opacity)}:host(.ion-color.ion-activated) .item-native{color:var(--ion-color-contrast)}:host(.ion-focused) .item-native{color:var(--color-focused)}:host(.ion-focused) .item-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}:host(.ion-color.ion-focused) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-focused) .item-native::after{background:var(--ion-color-contrast)}@media (any-hover: hover){:host(.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--color-hover)}:host(.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native{color:var(--ion-color-contrast)}:host(.ion-color.ion-activatable:not(.ion-focused):hover) .item-native::after{background:var(--ion-color-contrast)}}:host(.item-control-needs-pointer-cursor){cursor:pointer}:host(.item-interactive-disabled:not(.item-multiple-inputs)){cursor:default;pointer-events:none}:host(.item-disabled){cursor:default;opacity:0.3;pointer-events:none}.item-native{border-radius:var(--border-radius);margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-right:var(--padding-end);padding-left:calc(var(--padding-start) + var(--ion-safe-area-left, 0px));display:flex;position:relative;align-items:inherit;justify-content:inherit;width:100%;min-height:var(--min-height);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);overflow:inherit;z-index:1;box-sizing:border-box}:host-context([dir=rtl]) .item-native{padding-right:calc(var(--padding-start) + var(--ion-safe-area-right, 0px));padding-left:var(--padding-end)}[dir=rtl] .item-native{padding-right:calc(var(--padding-start) + var(--ion-safe-area-right, 0px));padding-left:var(--padding-end)}@supports selector(:dir(rtl)){.item-native:dir(rtl){padding-right:calc(var(--padding-start) + var(--ion-safe-area-right, 0px));padding-left:var(--padding-end)}}.item-native::-moz-focus-inner{border:0}.item-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0;transition:var(--transition);z-index:-1}button,a{cursor:pointer;user-select:none;-webkit-user-drag:none}.item-inner{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-top:var(--inner-padding-top);padding-bottom:var(--inner-padding-bottom);padding-right:calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));padding-left:var(--inner-padding-start);display:flex;position:relative;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;min-height:inherit;border-width:var(--inner-border-width);border-style:var(--border-style);border-color:var(--border-color);box-shadow:var(--inner-box-shadow);overflow:inherit;box-sizing:border-box}:host-context([dir=rtl]) .item-inner{padding-right:var(--inner-padding-start);padding-left:calc(var(--ion-safe-area-left, 0px) + var(--inner-padding-end))}[dir=rtl] .item-inner{padding-right:var(--inner-padding-start);padding-left:calc(var(--ion-safe-area-left, 0px) + var(--inner-padding-end))}@supports selector(:dir(rtl)){.item-inner:dir(rtl){padding-right:var(--inner-padding-start);padding-left:calc(var(--ion-safe-area-left, 0px) + var(--inner-padding-end))}}.item-detail-icon{-webkit-margin-start:calc(var(--inner-padding-end) / 2);margin-inline-start:calc(var(--inner-padding-end) / 2);-webkit-margin-end:-6px;margin-inline-end:-6px;color:var(--detail-icon-color);font-size:var(--detail-icon-font-size);opacity:var(--detail-icon-opacity)}::slotted(ion-icon){font-size:1.6em}::slotted(ion-button){--margin-top:0;--margin-bottom:0;--margin-start:0;--margin-end:0;z-index:1}::slotted(ion-label:not([slot=end])){flex:1;width:min-content;max-width:100%}:host(.item-input){align-items:center}.input-wrapper{display:flex;flex:1;flex-direction:inherit;align-items:inherit;align-self:stretch;text-overflow:ellipsis;overflow:inherit;box-sizing:border-box}:host(.item-label-stacked),:host(.item-label-floating){align-items:start}:host(.item-label-stacked) .input-wrapper,:host(.item-label-floating) .input-wrapper{flex:1;flex-direction:column}:host(.item-multiple-inputs) ::slotted(ion-checkbox),:host(.item-multiple-inputs) ::slotted(ion-datetime),:host(.item-multiple-inputs) ::slotted(ion-radio){position:relative}:host(.item-textarea){align-items:stretch}::slotted(ion-reorder[slot]){margin-top:0;margin-bottom:0}ion-ripple-effect{color:var(--ripple-color)}:host{--min-height:48px;--background:var(--ion-item-background, var(--ion-background-color, #fff));--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor;--background-activated-opacity:0;--background-focused-opacity:.12;--background-hover-opacity:.04;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.13)))));--color:var(--ion-item-color, var(--ion-text-color, #000));--transition:opacity 15ms linear, background-color 15ms linear;--padding-start:16px;--inner-padding-end:16px;--inner-border-width:0 0 1px 0;font-size:1rem;font-weight:normal;text-transform:none}:host(.ion-color.ion-activated) .item-native::after{background:transparent}:host(.item-interactive){--border-width:0 0 1px 0;--inner-border-width:0}:host(.item-lines-full){--border-width:0 0 1px 0}:host(.item-lines-inset){--inner-border-width:0 0 1px 0}:host(.item-lines-inset),:host(.item-lines-none){--border-width:0}:host(.item-lines-full),:host(.item-lines-none){--inner-border-width:0}:host(.item-multi-line) ::slotted([slot=start]),:host(.item-multi-line) ::slotted([slot=end]){margin-top:16px;margin-bottom:16px;align-self:flex-start}::slotted([slot=start]){-webkit-margin-end:16px;margin-inline-end:16px}::slotted([slot=end]){-webkit-margin-start:16px;margin-inline-start:16px}::slotted(ion-icon){color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54);font-size:1.5em}:host(.ion-color) ::slotted(ion-icon){color:var(--ion-color-contrast)}::slotted(ion-icon[slot]){margin-top:12px;margin-bottom:12px}::slotted(ion-icon[slot=start]){-webkit-margin-end:32px;margin-inline-end:32px}::slotted(ion-icon[slot=end]){-webkit-margin-start:16px;margin-inline-start:16px}::slotted(ion-toggle[slot=start]),::slotted(ion-toggle[slot=end]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}::slotted(ion-note){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;align-self:flex-start;font-size:0.6875rem}::slotted(ion-note[slot]){padding-left:0;padding-right:0;padding-top:18px;padding-bottom:10px}::slotted(ion-avatar){width:40px;height:40px}::slotted(ion-thumbnail){--size:56px}::slotted(ion-avatar),::slotted(ion-thumbnail){margin-top:8px;margin-bottom:8px}::slotted(ion-avatar[slot=start]),::slotted(ion-thumbnail[slot=start]){-webkit-margin-end:16px;margin-inline-end:16px}::slotted(ion-avatar[slot=end]),::slotted(ion-thumbnail[slot=end]){-webkit-margin-start:16px;margin-inline-start:16px}::slotted(ion-label){margin-left:0;margin-right:0;margin-top:10px;margin-bottom:10px}:host(.item-label-stacked) ::slotted([slot=end]),:host(.item-label-floating) ::slotted([slot=end]){margin-top:7px;margin-bottom:7px}:host(.item-toggle) ::slotted(ion-label),:host(.item-radio) ::slotted(ion-label){-webkit-margin-start:0;margin-inline-start:0}::slotted(.button-small){--padding-top:2px;--padding-bottom:2px;--padding-start:.6em;--padding-end:.6em;min-height:25px;font-size:0.75rem}:host(.item-label-floating),:host(.item-label-stacked){--min-height:55px}:host(.ion-focused:not(.ion-color)) ::slotted(.label-stacked),:host(.ion-focused:not(.ion-color)) ::slotted(.label-floating),:host(.item-has-focus:not(.ion-color)) ::slotted(.label-stacked),:host(.item-has-focus:not(.ion-color)) ::slotted(.label-floating){color:var(--ion-color-primary, #0054e9)}';const b=h;const f=class{constructor(i){t(this,i);this.labelColorStyles={};this.itemStyles=new Map;this.inheritedAriaAttributes={};this.multipleInputs=false;this.focusable=true;this.color=undefined;this.button=false;this.detail=undefined;this.detailIcon=c;this.disabled=false;this.download=undefined;this.href=undefined;this.rel=undefined;this.lines=undefined;this.routerAnimation=undefined;this.routerDirection="forward";this.target=undefined;this.type="button"}buttonChanged(){this.focusable=this.isFocusable()}labelColorChanged(t){const{color:i}=this;if(i===undefined){this.labelColorStyles=t.detail}}itemStyle(t){t.stopPropagation();const o=t.target.tagName;const n=t.detail;const e={};const r=this.itemStyles.get(o)||{};let a=false;Object.keys(n).forEach((t=>{if(n[t]){const i=`item-${t}`;if(!r[i]){a=true}e[i]=true}}));if(!a&&Object.keys(e).length!==Object.keys(r).length){a=true}if(a){this.itemStyles.set(o,e);i(this)}}connectedCallback(){this.hasStartEl()}componentWillLoad(){this.inheritedAriaAttributes=r(this.el,["aria-label"])}componentDidLoad(){a((()=>{this.setMultipleInputs();this.focusable=this.isFocusable()}))}setMultipleInputs(){const t=this.el.querySelectorAll("ion-checkbox, ion-datetime, ion-select, ion-radio");const i=this.el.querySelectorAll("ion-input, ion-range, ion-searchbar, ion-segment, ion-textarea, ion-toggle");const o=this.el.querySelectorAll("ion-anchor, ion-button, a, button");this.multipleInputs=t.length+i.length>1||t.length+o.length>1||t.length>0&&this.isClickable()}hasCover(){const t=this.el.querySelectorAll("ion-checkbox, ion-datetime, ion-select, ion-radio");return t.length===1&&!this.multipleInputs}isClickable(){return this.href!==undefined||this.button}canActivate(){return this.isClickable()||this.hasCover()}isFocusable(){const t=this.el.querySelector(".ion-focusable");return this.canActivate()||t!==null}hasStartEl(){const t=this.el.querySelector('[slot="start"]');if(t!==null){this.el.classList.add("item-has-start-slot")}}getFirstInteractive(){const t=this.el.querySelectorAll("ion-toggle:not([disabled]), ion-checkbox:not([disabled]), ion-radio:not([disabled]), ion-select:not([disabled]), ion-input:not([disabled]), ion-textarea:not([disabled])");return t[0]}render(){const{detail:t,detailIcon:i,download:e,labelColorStyles:r,lines:a,disabled:g,href:m,rel:h,target:b,routerAnimation:f,routerDirection:v,inheritedAriaAttributes:u,multipleInputs:x}=this;const k={};const w=p(this);const y=this.isClickable();const z=this.canActivate();const j=y?m===undefined?"button":"a":"div";const C=j==="button"?{type:this.type}:{download:e,href:m,rel:h,target:b};let O={};const I=this.getFirstInteractive();if(y||I!==undefined&&!x){O={onClick:t=>{if(y){l(m,t,v,f)}if(I!==undefined&&!x){const i=t.composedPath();const o=i[0];if(t.isTrusted){const t=this.el.shadowRoot.contains(o);if(t){if(I.tagName==="ION-INPUT"||I.tagName==="ION-TEXTAREA"){I.setFocus()}else{I.click()}}}}}}}const A=t!==undefined?t:w==="ios"&&y;this.itemStyles.forEach((t=>{Object.assign(k,t)}));const N=g||k["item-interactive-disabled"]?"true":null;const T=d("ion-list",this.el)&&!d("ion-radio-group",this.el);const $=I!==undefined&&!["ION-INPUT","ION-TEXTAREA"].includes(I.tagName);return o(n,{key:"6fe6bae954259703482f175312a051ff1b315a95","aria-disabled":N,class:Object.assign(Object.assign(Object.assign({},k),r),s(this.color,{item:true,[w]:true,"item-lines-default":a===undefined,[`item-lines-${a}`]:a!==undefined,"item-control-needs-pointer-cursor":$,"item-disabled":g,"in-list":T,"item-multiple-inputs":this.multipleInputs,"ion-activatable":z,"ion-focusable":this.focusable,"item-rtl":document.dir==="rtl"})),role:T?"listitem":null},o(j,Object.assign({key:"fcfcffacb7d4e52f9458724332efa93d140cf637"},C,u,{class:"item-native",part:"native",disabled:g},O),o("slot",{key:"2c1be89990d1b4264f056f3afca2657dc25e868f",name:"start"}),o("div",{key:"a12010f2f251c29870806050357e247f297f752d",class:"item-inner"},o("div",{key:"d0dc5901d634d3b7d8c9b4339ed02585b5b88828",class:"input-wrapper"},o("slot",{key:"5589d491f6058858310c72971de50ddf441379b1"})),o("slot",{key:"7b2d2182336abef508d00882759df1a99a1cf93e",name:"end"}),A&&o("ion-icon",{key:"f93f7e7166413f1f2691430dcda83ecf858f7e1f",icon:i,lazy:false,class:"item-detail-icon",part:"detail-icon","aria-hidden":"true","flip-rtl":i===c})),z&&w==="md"&&o("ion-ripple-effect",{key:"3d13ce7623813d650ada97974b29a2e94e2405b1"})))}get el(){return e(this)}static get watchers(){return{button:["buttonChanged"]}}};f.style={ios:m,md:b};const v="ion-list{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;contain:content;list-style-type:none}ion-list.list-inset{transform:translateZ(0);overflow:hidden}.list-ios{background:var(--ion-item-background, var(--ion-background-color, #fff))}.list-ios.list-inset{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px;border-radius:10px}.list-ios.list-inset ion-item:only-child,.list-ios.list-inset ion-item:not(:only-of-type):last-of-type,.list-ios.list-inset ion-item-sliding:last-of-type ion-item{--border-width:0;--inner-border-width:0}.list-ios.list-inset+ion-list.list-inset{margin-top:0}.list-ios-lines-none .item-lines-default{--inner-border-width:0px;--border-width:0px}.list-ios-lines-full .item-lines-default{--inner-border-width:0px;--border-width:0 0 0.55px 0}.list-ios-lines-inset .item-lines-default{--inner-border-width:0 0 0.55px 0;--border-width:0px}ion-card .list-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";const u=v;const x="ion-list{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;display:block;contain:content;list-style-type:none}ion-list.list-inset{transform:translateZ(0);overflow:hidden}.list-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;background:var(--ion-item-background, var(--ion-background-color, #fff))}.list-md>.input:last-child::after{inset-inline-start:0}.list-md.list-inset{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px;margin-top:16px;margin-bottom:16px;border-radius:2px}.list-md.list-inset ion-item:not(:only-of-type):last-of-type,.list-md.list-inset ion-item-sliding:last-of-type ion-item{--border-width:0;--inner-border-width:0}.list-md.list-inset ion-item:only-child{--border-width:0;--inner-border-width:0}.list-md.list-inset+ion-list.list-inset{margin-top:0}.list-md-lines-none .item-lines-default{--inner-border-width:0px;--border-width:0px}.list-md-lines-full .item-lines-default{--inner-border-width:0px;--border-width:0 0 1px 0}.list-md-lines-inset .item-lines-default{--inner-border-width:0 0 1px 0;--border-width:0px}ion-card .list-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";const k=x;const w=class{constructor(i){t(this,i);this.lines=undefined;this.inset=false}async closeSlidingItems(){const t=this.el.querySelector("ion-item-sliding");if(t===null||t===void 0?void 0:t.closeOpened){return t.closeOpened()}return false}render(){const t=p(this);const{lines:i,inset:e}=this;return o(n,{key:"8bde220025a7eeca6da075379c6487c4c9bdddc1",role:"list",class:{[t]:true,[`list-${t}`]:true,"list-inset":e,[`list-lines-${i}`]:i!==undefined,[`list-${t}-lines-${i}`]:i!==undefined}})}get el(){return e(this)}};w.style={ios:u,md:k};export{f as ion_item,w as ion_list};
//# sourceMappingURL=p-20474a50.entry.js.map