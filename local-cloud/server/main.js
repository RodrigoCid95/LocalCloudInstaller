const isRelease = true;
const isDebugger = false;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// node_modules/px.io/injectables/flags.js
var Flags = class {
  /**
   * Constructor.
   */
  constructor() {
    const argList = process.argv;
    this.args = {};
    let a;
    let opt;
    let thisOpt;
    let curOpt;
    for (a = 0; a < argList.length; a++) {
      thisOpt = argList[a].trim();
      opt = thisOpt.replace(/^\-+/, "");
      if (opt === thisOpt) {
        if (curOpt)
          this.args[curOpt] = opt;
        curOpt = null;
      } else {
        curOpt = opt;
        this.args[curOpt] = true;
      }
    }
  }
  /**
   * Look for a convert argument from the command line.
   * @param {string} name Argument name.
   * @returns {string | boolean} Returns the value of a variable.
   */
  get(name) {
    return this.args[name];
  }
};
var flags = new Flags();

// node_modules/px.io/injectables/main.js
var configsPath = "./config.js";
var configs = require(configsPath).configs;

// node_modules/px.io/injectables/main.http.js
var initHttpServer = ({ onMessage = console.log } = {}) => {
  const configPath = "./config.js";
  const { configs: configs2 } = require(configPath);
  const httpRoutersPath = "./http.js";
  const routers = require(httpRoutersPath).default;
  const express = require("express");
  let app = express();
  const {
    port = process.env.PORT ? parseInt(process.env.PORT) : 3001,
    dev,
    events = {},
    middlewares = [],
    pathsPublic,
    engineTemplates,
    optionsUrlencoded,
    createServer
  } = configs2.get("HTTP") || {};
  app.set("port", port);
  let externalIp = null;
  if (dev && dev.showExternalIp) {
    const interfaces = require("os").networkInterfaces();
    if (dev.interfaceNetwork) {
      const inter = interfaces[dev.interfaceNetwork];
      if (inter) {
        externalIp = inter.find((item) => item.family == "IPv4").address;
      } else {
        console.error(`
La interfaz de red "${dev.interfaceNetwork}" no existe!.
Se pueden usar las siguientes interfaces:
${Object.keys(interfaces).join(", ")}`);
      }
    } else {
      console.error("\nNo se defini\xF3 una interfaz de red.\nSe pueden usar las siguientes interfaces:\n" + Object.keys(interfaces).join(", "));
    }
  }
  if (events.beforeConfig) {
    events.beforeConfig(app);
  }
  if (optionsUrlencoded) {
    app.use(express.urlencoded(optionsUrlencoded));
  }
  for (const middleware of middlewares) {
    app.use(middleware);
  }
  if (pathsPublic) {
    pathsPublic.forEach(({ route, dir }) => app.use(route, express.static(dir)));
  }
  if (engineTemplates) {
    app.engine(engineTemplates.ext, engineTemplates.callback);
    app.set("views", engineTemplates.dirViews);
    app.set("view engine", engineTemplates.name);
  }
  if (events.afterConfig) {
    events.afterConfig(app);
  }
  app.use(express.json());
  app.use(express.text());
  for (const router of routers) {
    app.use(...router);
  }
  if (events.onError) {
    app.use(events.onError);
  }
  let server;
  if (createServer) {
    server = createServer(app);
  }
  if (!server) {
    const http = require("http");
    server = http.createServer(app);
  }
  server.listen(port, () => {
    onMessage(`Servidor corriendo en: http://localhost:${port}${externalIp ? ` y http://${externalIp}:${port}` : ""}`);
  });
  if (events.beforeStarting) {
    events.beforeStarting(app);
  }
  return { http: server, app };
};

// main.ts
var import_node_cluster = __toESM(require("node:cluster"));
var multiThread = flags.get("multi-thread");
if (multiThread && import_node_cluster.default.isPrimary) {
  const os = require("node:os");
  const numCPUs = os.availableParallelism();
  console.log(`

Master ${process.pid} is running`, `
${numCPUs} workers:
`);
  const PORTS = Array.from({ length: numCPUs }, (_, i) => 3e3 + i);
  for (const PORT of PORTS) {
    import_node_cluster.default.fork({ PORT });
  }
} else {
  initHttpServer({ onMessage: console.log });
}
//# sourceMappingURL=main.js.map
