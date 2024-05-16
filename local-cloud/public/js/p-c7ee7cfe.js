/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
class t{constructor(){this.gestureId=0;this.requestedStart=new Map;this.disabledGestures=new Map;this.disabledScroll=new Set}createGesture(t){var i;return new s(this,this.newID(),t.name,(i=t.priority)!==null&&i!==void 0?i:0,!!t.disableScroll)}createBlocker(t={}){return new i(this,this.newID(),t.disable,!!t.disableScroll)}start(t,s,i){if(!this.canStart(t)){this.requestedStart.delete(s);return false}this.requestedStart.set(s,i);return true}capture(t,s,i){if(!this.start(t,s,i)){return false}const e=this.requestedStart;let r=-1e4;e.forEach((t=>{r=Math.max(r,t)}));if(r===i){this.capturedId=s;e.clear();const i=new CustomEvent("ionGestureCaptured",{detail:{gestureName:t}});document.dispatchEvent(i);return true}e.delete(s);return false}release(t){this.requestedStart.delete(t);if(this.capturedId===t){this.capturedId=undefined}}disableGesture(t,s){let i=this.disabledGestures.get(t);if(i===undefined){i=new Set;this.disabledGestures.set(t,i)}i.add(s)}enableGesture(t,s){const i=this.disabledGestures.get(t);if(i!==undefined){i.delete(s)}}disableScroll(t){this.disabledScroll.add(t);if(this.disabledScroll.size===1){document.body.classList.add(e)}}enableScroll(t){this.disabledScroll.delete(t);if(this.disabledScroll.size===0){document.body.classList.remove(e)}}canStart(t){if(this.capturedId!==undefined){return false}if(this.isDisabled(t)){return false}return true}isCaptured(){return this.capturedId!==undefined}isScrollDisabled(){return this.disabledScroll.size>0}isDisabled(t){const s=this.disabledGestures.get(t);if(s&&s.size>0){return true}return false}newID(){this.gestureId++;return this.gestureId}}class s{constructor(t,s,i,e,r){this.id=s;this.name=i;this.disableScroll=r;this.priority=e*1e6+s;this.ctrl=t}canStart(){if(!this.ctrl){return false}return this.ctrl.canStart(this.name)}start(){if(!this.ctrl){return false}return this.ctrl.start(this.name,this.id,this.priority)}capture(){if(!this.ctrl){return false}const t=this.ctrl.capture(this.name,this.id,this.priority);if(t&&this.disableScroll){this.ctrl.disableScroll(this.id)}return t}release(){if(this.ctrl){this.ctrl.release(this.id);if(this.disableScroll){this.ctrl.enableScroll(this.id)}}}destroy(){this.release();this.ctrl=undefined}}class i{constructor(t,s,i,e){this.id=s;this.disable=i;this.disableScroll=e;this.ctrl=t}block(){if(!this.ctrl){return}if(this.disable){for(const t of this.disable){this.ctrl.disableGesture(t,this.id)}}if(this.disableScroll){this.ctrl.disableScroll(this.id)}}unblock(){if(!this.ctrl){return}if(this.disable){for(const t of this.disable){this.ctrl.enableGesture(t,this.id)}}if(this.disableScroll){this.ctrl.enableScroll(this.id)}}destroy(){this.unblock();this.ctrl=undefined}}const e="backdrop-no-scroll";const r=new t;export{e as B,r as G};
//# sourceMappingURL=p-c7ee7cfe.js.map