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

// node_modules/px.io/mods/configs.ts
var configs_exports = {};
__export(configs_exports, {
  configs: () => configs
});
module.exports = __toCommonJS(configs_exports);
var Configs = class {
  constructor() {
    this.#profiles = {};
    this.get = (name) => this.#profiles[name];
    const configPath = "./configurations.js";
    const configModule = require(configPath);
    const indices = Object.keys(configModule);
    for (const indice of indices) {
      Object.defineProperty(this.#profiles, indice, { value: configModule[indice], writable: false });
    }
  }
  #profiles;
};
var configs = new Configs();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configs
});
//# sourceMappingURL=config.js.map
