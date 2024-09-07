const isRelease = true;
const isDebugger = false;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/px.io/mods/http.ts
var http_exports = {};
__export(http_exports, {
  default: () => http_default
});
module.exports = __toCommonJS(http_exports);
var import_express = __toESM(require("express"));
var httpControllersPath = "./httpControllers.js";
var httpControllers = require(httpControllersPath);
var routers = [];
var controllersName = Object.keys(httpControllers);
for (const controllerName of controllersName) {
  const Controller = httpControllers[controllerName];
  if (Controller.prototype) {
    let namespace = void 0;
    if (Controller.$namespace) {
      namespace = Controller.$namespace;
      delete Controller.$namespace;
    }
    let beforeMiddlewares = [];
    if (Controller.$beforeMiddlewares) {
      beforeMiddlewares = Controller.$beforeMiddlewares;
    }
    let afterMiddlewares = [];
    if (Controller.$afterMiddlewares) {
      afterMiddlewares = Controller.$afterMiddlewares;
    }
    let $routes = {};
    if (Controller.prototype.$routes) {
      $routes = Controller.prototype.$routes;
      delete Controller.prototype.$routes;
    }
    const controller = new Controller();
    const router = import_express.default.Router();
    for (const [path, route] of Object.entries($routes)) {
      for (const [method, { callback, middlewares }] of Object.entries(route)) {
        let { before = [], after = [] } = middlewares;
        before = [...beforeMiddlewares, ...before].map((mid) => (typeof mid === "string" ? controller[mid] : mid).bind(controller));
        after = [...after, ...afterMiddlewares].map((mid) => (typeof mid === "string" ? controller[mid] : mid).bind(controller));
        const mids = [...before, callback.bind(controller), ...after];
        router[method](path, ...mids);
      }
    }
    const r = [router];
    if (namespace) {
      r.unshift(namespace[0] === "/" ? namespace : `/${namespace}`);
    }
    routers.push(r);
  }
}
var http_default = routers;
//# sourceMappingURL=http.js.map
