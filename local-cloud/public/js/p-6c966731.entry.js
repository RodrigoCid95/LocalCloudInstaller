import{r as t,h as i,H as a,d as s}from"./p-b76cbb69.js";import{g as n}from"./p-0ddbbd19.js";const e=":host{margin-left:0;margin-right:0;margin-top:calc(100% + 10px);margin-bottom:calc(100% + 10px);display:none;position:absolute;top:0;flex-direction:column;align-items:center;min-width:56px;min-height:56px}:host(.fab-list-active){display:flex}::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:8px;margin-bottom:8px;width:40px;height:40px;transform:scale(0);opacity:0;visibility:hidden}:host(.fab-list-side-top) ::slotted(.fab-button-in-list),:host(.fab-list-side-bottom) ::slotted(.fab-button-in-list){margin-left:0;margin-right:0;margin-top:5px;margin-bottom:5px}:host(.fab-list-side-start) ::slotted(.fab-button-in-list),:host(.fab-list-side-end) ::slotted(.fab-button-in-list){-webkit-margin-start:5px;margin-inline-start:5px;-webkit-margin-end:5px;margin-inline-end:5px;margin-top:0;margin-bottom:0}::slotted(.fab-button-in-list.fab-button-show){transform:scale(1);opacity:1;visibility:visible}:host(.fab-list-side-top){top:auto;bottom:0;flex-direction:column-reverse}:host(.fab-list-side-start){-webkit-margin-start:calc(100% + 10px);margin-inline-start:calc(100% + 10px);-webkit-margin-end:calc(100% + 10px);margin-inline-end:calc(100% + 10px);margin-top:0;margin-bottom:0;flex-direction:row-reverse}:host(.fab-list-side-start){inset-inline-end:0}:host(.fab-list-side-end){-webkit-margin-start:calc(100% + 10px);margin-inline-start:calc(100% + 10px);-webkit-margin-end:calc(100% + 10px);margin-inline-end:calc(100% + 10px);margin-top:0;margin-bottom:0;flex-direction:row}:host(.fab-list-side-end){inset-inline-start:0}";const o=e;const r=class{constructor(i){t(this,i);this.activated=false;this.side="bottom"}activatedChanged(t){const i=Array.from(this.el.querySelectorAll("ion-fab-button"));const a=t?30:0;i.forEach(((i,s)=>{setTimeout((()=>i.show=t),s*a)}))}render(){const t=n(this);return i(a,{key:"fa1d195b9950654ba0e984bf61d981c977d05275",class:{[t]:true,"fab-list-active":this.activated,[`fab-list-side-${this.side}`]:true}},i("slot",{key:"2ec738c66c05112e1e2521155d6adfc36d2fd1db"}))}get el(){return s(this)}static get watchers(){return{activated:["activatedChanged"]}}};r.style=o;export{r as ion_fab_list};
//# sourceMappingURL=p-6c966731.entry.js.map