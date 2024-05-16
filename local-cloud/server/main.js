const isRelease = true;
const isDebugger = false;

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
    const http2 = require("http");
    server = http2.createServer(app);
  }
  server.listen(port, () => {
    onMessage(`Servidor corriendo en: http://localhost:${port}${externalIp ? ` y http://${externalIp}:${port}` : ""}`);
  });
  if (events.beforeStarting) {
    events.beforeStarting(app);
  }
  return { http: server, app };
};

// node_modules/px.io/mods/main.ts
var type = flags.get("type");
var log = (message) => {
  if (isRelease) {
    console.log(message);
  } else {
    process.send(message);
  }
};
var http = void 0;
if (type.includes("http")) {
  http = initHttpServer({ onMessage: log }).http;
}
if (type.includes("sockets")) {
  initSocketsServer({ http, onError: log });
}
//# sourceMappingURL=main.js.map
