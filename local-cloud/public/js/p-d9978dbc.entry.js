import{r as n,h as i,H as e}from"./p-b76cbb69.js";import{E as t}from"./p-662833ea.js";import{s as o}from"./p-564aab83.js";import{c as s,g as r}from"./p-0ddbbd19.js";const l="ion-infinite-scroll-content{display:flex;flex-direction:column;justify-content:center;min-height:84px;text-align:center;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}";const c=l;const a="ion-infinite-scroll-content{display:flex;flex-direction:column;justify-content:center;min-height:84px;text-align:center;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666))}";const d=a;const p=class{constructor(i){n(this,i);this.customHTMLEnabled=s.get("innerHTMLTemplatesEnabled",t);this.loadingSpinner=undefined;this.loadingText=undefined}componentDidLoad(){if(this.loadingSpinner===undefined){const n=r(this);this.loadingSpinner=s.get("infiniteLoadingSpinner",s.get("spinner",n==="ios"?"lines":"crescent"))}}renderLoadingText(){const{customHTMLEnabled:n,loadingText:e}=this;if(n){return i("div",{class:"infinite-loading-text",innerHTML:o(e)})}return i("div",{class:"infinite-loading-text"},this.loadingText)}render(){const n=r(this);return i(e,{key:"060278bf9cb0321e182352f9613be4ebbb028259",class:{[n]:true,[`infinite-scroll-content-${n}`]:true}},i("div",{key:"07d3cada920145f979ad315bd187fb878e0c3da3",class:"infinite-loading"},this.loadingSpinner&&i("div",{key:"6254f175d7543d09f3dd47cd0589a2809182cd8c",class:"infinite-loading-spinner"},i("ion-spinner",{key:"a6a816d1c65b60b786333b209b63492aa716a283",name:this.loadingSpinner})),this.loadingText!==undefined&&this.renderLoadingText()))}};p.style={ios:c,md:d};export{p as ion_infinite_scroll_content};
//# sourceMappingURL=p-d9978dbc.entry.js.map