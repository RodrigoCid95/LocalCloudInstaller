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
var import_node_path3 = __toESM(require("node:path"));
var import_express_session = __toESM(require("express-session"));
var import_compression = __toESM(require("compression"));
var import_liquidjs = require("liquidjs");
var import_uuid = require("uuid");

// config/dev-mode.ts
var import_node_fs = __toESM(require("node:fs"));

// config/paths.ts
var import_node_path2 = __toESM(require("node:path"));
var system;
if (isRelease) {
  system = import_node_path2.default.resolve("/", "var", "lc");
} else {
  system = import_node_path2.default.resolve(".", "lc");
}
var systemApps = import_node_path2.default.join(system, "apps");
var systemApp = import_node_path2.default.join(system, "apps", ":packagename");
var systemDatabases = import_node_path2.default.join(systemApp, "data");
var paths = {
  samba: "/etc/samba/smb.conf",
  shadow: "/etc/shadow",
  passwd: "/etc/passwd",
  groups: "/etc/group",
  system: {
    path: system,
    apps: {
      path: systemApps,
      app: {
        path: systemApp,
        public: import_node_path2.default.join(systemApp, "public"),
        databases: {
          path: systemDatabases,
          database: import_node_path2.default.join(systemDatabases, ":name.db")
        }
      }
    },
    database: import_node_path2.default.join(system, "system.db")
  },
  users: {
    shared: import_node_path2.default.join("/", "shared"),
    path: import_node_path2.default.join("/", "home"),
    recycleBin: import_node_path2.default.join("/", "recycler-bin")
  }
};

// config/dev-mode.ts
var enable = false;
var user = flags.get("user");
if (user) {
  enable = true;
} else if (!import_node_fs.default.existsSync(paths.system.path)) {
  enable = true;
}
var devMode = { enable, user };

// config/http.ts
var import_cors = __toESM(require("cors"));
var middlewares = [
  (0, import_compression.default)(),
  (0, import_express_session.default)({
    saveUninitialized: false,
    resave: false,
    secret: (0, import_uuid.v4)()
  })
];
if (devMode.enable) {
  middlewares.push((0, import_cors.default)());
}
var HTTP = {
  /* port: 80, */
  optionsUrlencoded: { extended: true },
  engineTemplates: {
    name: "liquid",
    ext: "liquid",
    callback: new import_liquidjs.Liquid({
      layouts: import_node_path3.default.resolve(__dirname, "..", "views"),
      extname: "liquid"
    }).express(),
    dirViews: import_node_path3.default.resolve(__dirname, "..", "views")
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
      dir: import_node_path3.default.resolve(__dirname, "..", "public")
    }
  ]
};

// config/databases.ts
var database = {
  path: paths.system.database
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HTTP,
  builderConnector,
  database,
  devMode,
  paths
});
//# sourceMappingURL=configurations.js.map
