import{r as e,h as s,H as i,d as r}from"./p-b76cbb69.js";import{E as n,s as c}from"./p-3cd260c6.js";import{l as d,m as t}from"./p-bc25170e.js";import{c as f,g as a}from"./p-0ddbbd19.js";import{e as o}from"./p-0014402a.js";import{S as h}from"./p-c35c69fb.js";import"./p-1fd4aad1.js";import"./p-3647f076.js";import"./p-0a92dd03.js";const l=class{constructor(s){e(this,s);this.customHTMLEnabled=f.get("innerHTMLTemplatesEnabled",n);this.pullingIcon=undefined;this.pullingText=undefined;this.refreshingSpinner=undefined;this.refreshingText=undefined}componentWillLoad(){if(this.pullingIcon===undefined){const e=o();const s=a(this);const i=e?"lines":t;this.pullingIcon=f.get("refreshingIcon",s==="ios"&&e?f.get("spinner",i):"circular")}if(this.refreshingSpinner===undefined){const e=a(this);this.refreshingSpinner=f.get("refreshingSpinner",f.get("spinner",e==="ios"?"lines":"circular"))}}renderPullingText(){const{customHTMLEnabled:e,pullingText:i}=this;if(e){return s("div",{class:"refresher-pulling-text",innerHTML:c(i)})}return s("div",{class:"refresher-pulling-text"},i)}renderRefreshingText(){const{customHTMLEnabled:e,refreshingText:i}=this;if(e){return s("div",{class:"refresher-refreshing-text",innerHTML:c(i)})}return s("div",{class:"refresher-refreshing-text"},i)}render(){const e=this.pullingIcon;const r=e!=null&&h[e]!==undefined;const n=a(this);return s(i,{key:"1bec5b4da221c69d856f3f5ddf40f2e03ebf2a4c",class:n},s("div",{key:"4fcc526c4f1881e9368d9cd16bd7030919bd3841",class:"refresher-pulling"},this.pullingIcon&&r&&s("div",{key:"a4e9e2e12c2d7faefc8303ec8c021f999ddf308e",class:"refresher-pulling-icon"},s("div",{key:"5a2d215feb7fb4b64d540d3a65c0f24b415a2433",class:"spinner-arrow-container"},s("ion-spinner",{key:"abef2621d671ac6ff0abac43a702cbd825b7f127",name:this.pullingIcon,paused:true}),n==="md"&&this.pullingIcon==="circular"&&s("div",{key:"30087d672c3780672a05874cd93cd099b2855462",class:"arrow-container"},s("ion-icon",{key:"5e30333dee469aec0d8efc8c4e6dabb619c6f363",icon:d,"aria-hidden":"true"})))),this.pullingIcon&&!r&&s("div",{key:"48fe72b5ce8ded633c6ee799cebb520b9c8be528",class:"refresher-pulling-icon"},s("ion-icon",{key:"d8dfd5d42056b1c0a436c5006affb255407816c0",icon:this.pullingIcon,lazy:false,"aria-hidden":"true"})),this.pullingText!==undefined&&this.renderPullingText()),s("div",{key:"c2cbfb94f157c82601ffe7bb815ff82ebc7c0a49",class:"refresher-refreshing"},this.refreshingSpinner&&s("div",{key:"17f3ebe6a31768d5e389f45a2c12f68600185db9",class:"refresher-refreshing-icon"},s("ion-spinner",{key:"e8e61f8d7189c9939bba184201c9509d1d5b0fad",name:this.refreshingSpinner})),this.refreshingText!==undefined&&this.renderRefreshingText()))}get el(){return r(this)}};export{l as ion_refresher_content};
//# sourceMappingURL=p-0485a6c8.entry.js.map