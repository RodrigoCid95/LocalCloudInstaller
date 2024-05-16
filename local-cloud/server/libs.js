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

// node_modules/px.io/mods/libs.ts
var libs_exports = {};
__export(libs_exports, {
  libraries: () => libraries
});
module.exports = __toCommonJS(libs_exports);
var Libraries = class {
  constructor() {
    this.#instances = {};
    this.get = (name) => this.#instances[name];
    const libsPath = "./libraries.js";
    const libsModule = require(libsPath);
    const indices = Object.keys(libsModule);
    for (const indice of indices) {
      const libResult = libsModule[indice]();
      if (libResult instanceof Promise) {
        libResult.then((lib) => Object.defineProperty(this.#instances, indice, { value: lib, writable: false })).catch((error) => console.error(error));
      } else {
        Object.defineProperty(this.#instances, indice, { value: libResult, writable: false });
      }
    }
  }
  #instances;
};
var libraries = new Libraries();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  libraries
});
//# sourceMappingURL=libs.js.map
