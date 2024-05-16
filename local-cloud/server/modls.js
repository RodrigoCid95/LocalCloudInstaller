const isRelease = true;
const isDebugger = false;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/px.io/mods/modls.ts
var modls_exports = {};
__export(modls_exports, {
  models: () => models
});
module.exports = __toCommonJS(modls_exports);
var Models = class {
  constructor() {
    this.#instances = {};
    this.get = (name) => this.#instances[name];
    const modelsPath = "./models.js";
    const modelsModule = require(modelsPath);
    const indices = Object.keys(modelsModule);
    for (const indice of indices) {
      const Model = modelsModule[indice];
      if (Model.prototype) {
        Object.defineProperty(this.#instances, indice, { value: new Model(), writable: false });
      }
    }
  }
  #instances;
};
var models = new Models();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  models
});
//# sourceMappingURL=modls.js.map
