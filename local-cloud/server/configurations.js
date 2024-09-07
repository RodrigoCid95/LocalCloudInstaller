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

// config/index.ts
var config_exports = {};
__export(config_exports, {
  HTTP: () => HTTP,
  SessionStore: () => SessionStore,
  builderConnector: () => builderConnector,
  database: () => database,
  devMode: () => devMode,
  paths: () => paths
});
module.exports = __toCommonJS(config_exports);

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
        if (curOpt) this.args[curOpt] = opt;
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

// node_modules/px.io/injectables/emitters.js
var Emitter = class {
  #CALLBACKS = {};
  on(callback) {
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
    this.#CALLBACKS[uuid] = callback;
    return uuid;
  }
  off(uuid) {
    delete this.#CALLBACKS[uuid];
  }
  emit(args) {
    const callbacks = Object.values(this.#CALLBACKS);
    for (const callback of callbacks) {
      callback(args);
    }
  }
};
var Emitters = class _Emitters {
  #EMITTERS = /* @__PURE__ */ new Map();
  on(event, callback) {
    if (!this.#EMITTERS.has(event)) {
      this.#EMITTERS.set(event, _Emitters.createEmitter());
    }
    return this.#EMITTERS.get(event)?.on(callback) || "";
  }
  off(event, uuid) {
    this.#EMITTERS.get(event)?.off(uuid);
  }
  emit(event, args) {
    this.#EMITTERS.get(event)?.emit(args);
  }
};
Emitters.createEmitter = () => {
  return new Emitter();
};
var moduleEmitters = new Emitters();

// config/builder-connector.ts
var import_node_path = __toESM(require("node:path"));
var srcPath = import_node_path.default.resolve(__dirname, "..", "connector");
var builderConnector = {
  mainPath: import_node_path.default.join(srcPath, "main.ts"),
  apiPath: import_node_path.default.join(srcPath, "apis.ts")
};

// config/http.ts
var import_node_crypto = __toESM(require("node:crypto"));
var import_node_fs = __toESM(require("node:fs"));
var import_express_session = __toESM(require("express-session"));
var import_compression = __toESM(require("compression"));
var import_liquidjs = require("liquidjs");
var import_cors = __toESM(require("cors"));

// config/paths.ts
var import_node_path2 = __toESM(require("node:path"));
var system = import_node_path2.default.resolve(process.cwd(), "lc");
var paths = {
  samba: "/etc/samba/smb.conf",
  shadow: "/etc/shadow",
  passwd: "/etc/passwd",
  groups: "/etc/group",
  system: {
    path: system,
    apps: import_node_path2.default.join(system, "apps"),
    appsViews: import_node_path2.default.join(system, "client", "views", "apps"),
    storages: import_node_path2.default.join(system, "storages"),
    database: import_node_path2.default.join(system, "system.db"),
    clientPublic: import_node_path2.default.resolve(system, "client", "public"),
    clientViews: import_node_path2.default.resolve(system, "client", "views")
  },
  users: {
    shared: import_node_path2.default.join("/", "shared"),
    path: import_node_path2.default.join("/", "home"),
    recycleBin: import_node_path2.default.join("/", "recycler-bin")
  }
};

// config/http.ts
var import_express_session2 = require("express-session");
var SessionConnector = class {
  #CALLBACKS;
  constructor() {
    this.#CALLBACKS = {};
    process.on("message", (message) => {
      const { uid, data } = message;
      this.#CALLBACKS[uid](data);
      delete this.#CALLBACKS[uid];
    });
  }
  async emit(event, ...args) {
    const uid = import_node_crypto.default.randomUUID();
    return new Promise((resolve) => {
      this.#CALLBACKS[uid] = (data) => resolve(data);
      if (process.send) {
        process.send({ uid, event, args });
      }
    });
  }
};
var SessionStore = class extends import_express_session2.Store {
  constructor() {
    super();
    this.connector = new SessionConnector();
  }
  get(sid, callback) {
    this.connector.emit("get", sid).then((session2) => callback(null, session2 || null));
  }
  set(sid, session2, callback) {
    this.connector.emit("set", sid, session2).then(callback);
  }
  destroy(sid, callback) {
    this.connector.emit("delete", sid).then(callback);
  }
  length(callback) {
    this.connector.emit("length").then((data) => callback(null, data));
  }
  all(callback) {
    this.connector.emit("length").then((data) => callback(null, data));
  }
  clear(callback) {
    this.connector.emit("clear").then(callback);
  }
};
if (!import_node_fs.default.existsSync("./key.pem")) {
  const { privateKey } = import_node_crypto.default.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem"
    }
  });
  import_node_fs.default.writeFileSync("./key.pem", privateKey, "utf-8");
}
var middlewares = [
  (0, import_compression.default)(),
  (0, import_express_session.default)({
    store: new SessionStore(),
    secret: import_node_fs.default.readFileSync("./key.pem", "utf-8"),
    resave: false,
    saveUninitialized: true
  })
];
if (!isRelease || flags.get("maintenance-mode")) {
  middlewares.push((0, import_cors.default)());
}
var HTTP = {
  optionsUrlencoded: { extended: true },
  engineTemplates: {
    name: "liquid",
    ext: "liquid",
    callback: new import_liquidjs.Liquid({
      layouts: paths.system.clientViews,
      extname: "liquid"
    }).express(),
    dirViews: paths.system.clientViews
  },
  middlewares,
  events: {
    onError(err, req, res, next) {
      if (err) {
        res.status(500).json(err);
      } else {
        next();
      }
    }
  },
  pathsPublic: [
    {
      route: "/",
      dir: paths.system.clientPublic
    }
  ]
};

// config/databases.ts
var database = {
  path: paths.system.database
};

// config/dev-mode.ts
var devMode = {
  enable: flags.get("maintenance-mode"),
  user: flags.get("user")
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HTTP,
  SessionStore,
  builderConnector,
  database,
  devMode,
  paths
});
//# sourceMappingURL=configurations.js.map
