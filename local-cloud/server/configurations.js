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
  builderConnector: () => builderConnector,
  database: () => database,
  devMode: () => devMode,
  keys: () => keys,
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

// config/builder-connector.ts
var import_node_path = __toESM(require("node:path"));
var srcPath = import_node_path.default.resolve(__dirname, "..", "connector");
var builderConnector = {
  mainPath: import_node_path.default.join(srcPath, "main.ts"),
  apiPath: import_node_path.default.join(srcPath, "apis.ts")
};

// config/http.ts
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
var import_express_session = __toESM(require("express-session"));
var import_connect_mongo = __toESM(require("connect-mongo"));

// config/keys.ts
var import_node_path3 = __toESM(require("node:path"));
var import_node_fs = __toESM(require("node:fs"));
var import_node_crypto = __toESM(require("node:crypto"));
var KEY_PATH = import_node_path3.default.join(process.cwd(), "key.pem");
if (!import_node_fs.default.existsSync(KEY_PATH)) {
  const secret2 = import_node_crypto.default.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem"
    }
  }).privateKey;
  import_node_fs.default.writeFileSync(KEY_PATH, secret2, "utf-8");
}
var secret = import_node_fs.default.readFileSync(KEY_PATH, "utf-8") || "";
var PASSWD_PASS = import_node_path3.default.join(process.cwd(), "mongod");
var password = (import_node_fs.default.readFileSync(PASSWD_PASS, "utf-8") || "").slice(0, -1);
var keys = { password, secret };

// config/http.ts
var middlewares = [
  (0, import_compression.default)(),
  (0, import_express_session.default)({
    store: import_connect_mongo.default.create({
      mongoUrl: `mongodb://lc:${keys.password}@localhost:27017`,
      dbName: "_lc"
    }),
    resave: false,
    saveUninitialized: false,
    secret: keys.secret
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
    afterConfig(app) {
      app.set("trust proxy", 1);
    },
    onError(err, _, res, next) {
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
  builderConnector,
  database,
  devMode,
  keys,
  paths
});
//# sourceMappingURL=configurations.js.map
