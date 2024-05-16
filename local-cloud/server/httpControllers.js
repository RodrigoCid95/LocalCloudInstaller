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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// controllers/index.ts
var controllers_exports = {};
__export(controllers_exports, {
  APIController: () => APIController,
  AppController: () => AppController,
  AppsAPIController: () => AppsAPIController,
  AuthAPIController: () => AuthAPIController,
  FileController: () => FileController,
  FileSystemAPIController: () => FileSystemAPIController,
  IndexController: () => IndexController,
  LaunchController: () => LaunchController,
  PermissionsAPIController: () => PermissionsAPIController,
  ProfileAPIController: () => ProfileAPIController,
  RecycleBinController: () => RecycleBinController,
  SecureSourcesAPIController: () => SecureSourcesAPIController,
  SharedAPIController: () => SharedAPIController,
  SharedController: () => SharedController,
  UsersAPIController: () => UsersAPIController,
  verifyApp: () => verifyApp
});
module.exports = __toCommonJS(controllers_exports);

// node_modules/px.io/injectables/controllers.js
var modlsPath = "./modls.js";
var models = require(modlsPath).models;
function Model(model) {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        return models.get(model);
      }
    });
  };
}

// node_modules/px.io/injectables/controllers.http.js
function Namespace(namespace, mws = {}) {
  return function(constructor) {
    constructor.$namespace = namespace;
    if (mws.before) {
      constructor.$beforeMiddlewares = mws.before;
    }
    if (mws.after) {
      constructor.$afterMiddlewares = mws.after;
    }
    return constructor;
  };
}
var registerRoute = (target, propertyKey, descriptor) => {
  if (!target.hasOwnProperty("$routes")) {
    target.$routes = {};
  }
  if (!target.$routes.hasOwnProperty(propertyKey)) {
    target.$routes[propertyKey] = {
      methods: [],
      path: "",
      method: descriptor?.value,
      middlewares: {
        after: [],
        before: []
      }
    };
  } else {
    target.$routes[propertyKey].method = descriptor?.value;
  }
};
function AfterMiddleware(mws) {
  return (target, propertyKey, descriptor) => {
    registerRoute(target, propertyKey, descriptor);
    for (let mw of mws) {
      if (typeof mw === "string") {
        if (!target.hasOwnProperty(mw)) {
          console.error(`
${target.name}: El middleware ${mw} no est\xE1 declarado!`);
          return descriptor;
        }
        mw = target[mw];
      }
      target.$routes[propertyKey].middlewares.after.push(mw);
    }
    if (descriptor) {
      return descriptor;
    }
  };
}
function BeforeMiddleware(mws) {
  return (target, propertyKey, descriptor) => {
    registerRoute(target, propertyKey, descriptor);
    for (let mw of mws) {
      if (typeof mw === "string") {
        if (!target.hasOwnProperty(mw)) {
          console.error(`
${target.name}: El middleware ${mw} no est\xE1 declarado!`);
          if (descriptor) {
            return descriptor;
          }
        }
        mw = target[mw];
      }
      target.$routes[propertyKey].middlewares.before.push(mw);
    }
    if (descriptor) {
      return descriptor;
    }
  };
}
function On(methods, path2) {
  return (target, propertyKey, descriptor) => {
    registerRoute(target, propertyKey, descriptor);
    target.$routes[propertyKey].methods = Array.isArray(methods) ? methods : [methods];
    target.$routes[propertyKey].path = path2;
    return descriptor;
  };
}
var METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  ALL: ""
};

// controllers/apis/middlewares/dev-mode.ts
function verifyDevMode() {
  const _this = this;
  const devModeModel = _this?.devModeModel;
  if (devModeModel?.devMode.config.enable) {
    return devModeModel;
  }
  return false;
}

// controllers/middlewares/dev-mode.ts
function devMode(_, res, next) {
  const model = verifyDevMode.bind(this)();
  if (model) {
    res.redirect(model.devMode.config.cors);
  } else {
    next();
  }
}

// controllers/middlewares/session.ts
async function verifySession(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    const model = verifyDevMode.bind(this)();
    if (typeof model !== "boolean") {
      req.session.user = model.getUser();
      req.session.apps = await model.getApps(req.session.user?.uid || NaN);
      next();
      return;
    }
    if (req.originalUrl === "/") {
      res.redirect("/login");
    } else {
      res.redirect(`/login?dest=${req.originalUrl}`);
    }
  }
}
var verifyNotSession = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    if (req.query.dest) {
      res.redirect(req.query.dest);
    } else {
      res.redirect("/");
    }
  }
};

// controllers/middlewares/tokens.ts
var import_uuid = require("uuid");
function tokens(req, res, next) {
  const model = verifyDevMode.bind(this)();
  if (model) {
    next();
    return;
  }
  if (!req.session.key) {
    req.session.key = (0, import_uuid.v4)();
  }
  if (!req.session.token) {
    req.session.token = (0, import_uuid.v4)();
  }
  next();
}

// controllers/app.ts
var import_node_path = __toESM(require("node:path"));
var verifyApp = (req, res, next) => {
  const { packagename } = req.params;
  if (req.session?.apps && req.session?.apps[packagename]) {
    const app = req.session.apps[packagename];
    if (app) {
      const font = app.secureSources.filter((item) => item.type === "font").join(" ");
      const img = app.secureSources.filter((item) => item.type === "img").join(" ");
      const connect = app.secureSources.filter((item) => item.type === "connect").join(" ");
      const script = app.secureSources.filter((item) => item.type === "script").join(" ");
      res.setHeader("Content-Security-Policy", `frame-ancestors 'self';font-src 'self'${font ? ` ${font}` : ""};img-src 'self' data:${img ? ` ${img}` : ""};connect-src 'self'${connect ? ` ${connect}` : ""};script-src-elem 'self'${script ? ` ${script}` : ""};`);
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};
var AppController = class {
  app(req, res) {
    const app = req.session.apps[req.params.packagename];
    res.render("app", { title: app.title, description: app.description, package_name: req.params.packagename });
  }
  source(req, res) {
    const appPath = this.appsModel.paths.getAppPublic(req.params.packagename);
    const pathSource = import_node_path.default.join(appPath, ...req.params[0].split("/"));
    res.sendFile(pathSource, (error) => {
      if (error) {
        res.status(404).end();
      }
    });
  }
};
__decorateClass([
  Model("DevModeModel")
], AppController.prototype, "devModeModel", 2);
__decorateClass([
  Model("AppsModel")
], AppController.prototype, "appsModel", 2);
__decorateClass([
  On(METHODS.GET, "/:packagename")
], AppController.prototype, "app", 1);
__decorateClass([
  On(METHODS.GET, "/:packagename/*")
], AppController.prototype, "source", 1);
AppController = __decorateClass([
  Namespace("/app", { before: [devMode, verifySession, verifyApp] })
], AppController);

// controllers/middlewares/file.ts
var import_node_fs = __toESM(require("node:fs"));
var responseFile = (req, res) => {
  const { path: path2, file } = req.body;
  if (typeof path2 === "boolean" || !file) {
    res.status(404).json({
      code: "not-found",
      message: "La ruta que indicaste no existe."
    });
    return;
  }
  const query = Object.keys(req.query);
  if (req.headers["sec-fetch-dest"] === "empty" || query.includes("download")) {
    let fileInfo = void 0;
    if (Array.isArray(file)) {
      fileInfo = file[0];
    }
    if (typeof file === "object" && !Array.isArray(file)) {
      fileInfo = file;
    }
    if (fileInfo) {
      res.setHeader("Content-Length", fileInfo.size);
      res.setHeader("Content-Disposition", `attachment; filename="${fileInfo.name}"`);
    }
    const fileStream = import_node_fs.default.createReadStream(path2);
    fileStream.pipe(res);
  } else {
    res.sendFile(path2);
  }
};

// controllers/file.ts
var { GET } = METHODS;
var FileController = class {
  sharedFile(req, _, next) {
    const path2 = this.fsModel.resolveSharedFile(req.params[0].split("/"));
    const file = this.fsModel.resolveFileOrDirectory(path2);
    req.body = { path: path2, file };
    next();
  }
  userFile(req, _, next) {
    const path2 = this.fsModel.resolveUserFile(req.session.user?.name || "", req.params[0].split("/"));
    const file = this.fsModel.resolveFileOrDirectory(path2);
    req.body = { path: path2, file };
    next();
  }
};
__decorateClass([
  Model("DevModeModel")
], FileController.prototype, "devModeModel", 2);
__decorateClass([
  Model("FileSystemModel")
], FileController.prototype, "fsModel", 2);
__decorateClass([
  On(GET, "/shared/*"),
  AfterMiddleware([responseFile])
], FileController.prototype, "sharedFile", 1);
__decorateClass([
  On(GET, "/user/*"),
  AfterMiddleware([responseFile])
], FileController.prototype, "userFile", 1);
FileController = __decorateClass([
  Namespace("/file", { before: [verifySession] })
], FileController);

// controllers/shared.ts
var SharedController = class {
  async shared(req, res, next) {
    const { id } = req.params;
    const [result] = await this.sharedModel.find({ id });
    if (result) {
      const { path: path2, uid: uuid } = result;
      const base = path2.shift();
      let p = "";
      let file;
      if (base === "shared") {
        p = this.fsModel.resolveSharedFile(path2);
        file = this.fsModel.resolveFileOrDirectory(p);
      } else {
        p = this.fsModel.resolveUserFile(uuid, path2);
        file = this.fsModel.resolveFileOrDirectory(p);
      }
      req.body = { path: p, file };
      next();
    } else {
      res.status(404).end();
    }
  }
};
__decorateClass([
  Model("SharedModel")
], SharedController.prototype, "sharedModel", 2);
__decorateClass([
  Model("FileSystemModel")
], SharedController.prototype, "fsModel", 2);
__decorateClass([
  On(METHODS.GET, "/:id"),
  AfterMiddleware([responseFile])
], SharedController.prototype, "shared", 1);
SharedController = __decorateClass([
  Namespace("/shared")
], SharedController);

// controllers/launch.ts
var { GET: GET2 } = METHODS;
var LaunchController = class {
  responseFile(req, res) {
    const path2 = req.body;
    if (typeof path2 === "boolean") {
      res.status(404).json({
        code: "not-found",
        message: "La ruta que indicaste no existe."
      });
      return;
    }
    const { app: queryApp = "" } = req.query;
    const segments = req.url.split("/").filter((segment) => segment !== "");
    const name = segments[segments.length - 1];
    const nameSegments = name.split(".");
    const ext = nameSegments[nameSegments.length - 1];
    const { apps = {} } = req.session;
    const keys = Object.keys(apps);
    const possibleApps = [];
    for (const package_name of keys) {
      const app = apps[package_name];
      if (app.extensions.includes(ext) || package_name === queryApp) {
        possibleApps.push(package_name);
      }
    }
    if (possibleApps.length > 0) {
      res.redirect(`/app/${possibleApps[0]}?file=${req.url}`);
      return;
    }
    res.redirect(`/file${req.url.split("?")[0]}`);
  }
  sharedFile(req, _, next) {
    req.body = this.fsModel.resolveSharedFile(req.params[0].split("/"));
    next();
  }
  userFile(req, _, next) {
    req.body = this.fsModel.resolveUserFile(req.session.user?.name || "", req.params[0].split("/"));
    next();
  }
};
__decorateClass([
  Model("DevModeModel")
], LaunchController.prototype, "devModeModel", 2);
__decorateClass([
  Model("FileSystemModel")
], LaunchController.prototype, "fsModel", 2);
__decorateClass([
  On(GET2, "/shared/*"),
  AfterMiddleware(["responseFile"])
], LaunchController.prototype, "sharedFile", 1);
__decorateClass([
  On(GET2, "/user/*"),
  AfterMiddleware(["responseFile"])
], LaunchController.prototype, "userFile", 1);
LaunchController = __decorateClass([
  Namespace("/launch", { before: [verifySession] })
], LaunchController);

// controllers/apis/middlewares/permissions.ts
var DENIED_ERROR = {
  code: "access-denied",
  message: "No tienes permiso para hacer esto!"
};
var getOrigin = (referer) => {
  const { pathname } = new URL(referer);
  if (pathname === "/") {
    return 1;
  }
  if (/^\/app\/.+$/.test(pathname)) {
    const segments = pathname.split("/");
    return segments[2];
  }
  return 0;
};
function verifyPermission(permission) {
  let apiPermission;
  if (typeof permission === "string") {
    apiPermission = {
      name: permission,
      public: false,
      freeForDashboard: false
    };
  } else {
    apiPermission = permission;
  }
  return async function(req, res, next) {
    if (verifyDevMode.bind(this)()) {
      next();
      return;
    }
    if (req.headers.referer === void 0) {
      res.status(403).json(DENIED_ERROR);
      return;
    }
    if (req.headers.token === void 0) {
      res.status(403).json(DENIED_ERROR);
      return;
    }
    const origin = getOrigin(req.headers.referer);
    if (typeof origin === "string") {
      const { permissions } = req.session.apps[origin];
      const appPermission = permissions.filter((item) => item.api === apiPermission.name)[0];
      if (appPermission?.active) {
        next();
        return;
      }
    } else {
      if (origin === 0 && apiPermission.public) {
        next();
        return;
      }
      if (origin === 1 && apiPermission.freeForDashboard) {
        next();
        return;
      }
    }
    res.status(403).json(DENIED_ERROR);
  };
}

// controllers/apis/apps.ts
var import_express_fileupload = __toESM(require("express-fileupload"));

// controllers/apis/middlewares/session.ts
var REQUIRED_LOGIN = {
  code: "required-login",
  message: "Inicio de sesi\xF3n requerido."
};
async function verifySession2(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    const model = verifyDevMode.bind(this)();
    if (typeof model !== "boolean") {
      req.session.user = model.getUser();
      req.session.apps = await model.getApps(req.session.user?.uid || NaN);
      next();
      return;
    }
    res.status(401).json(REQUIRED_LOGIN);
  }
}

// libraries/classes/Encrypt.ts
var import_node_crypto = __toESM(require("node:crypto"));
var import_node_crypto2 = require("node:crypto");
var import_node_buffer = require("node:buffer");
var HashType = /* @__PURE__ */ ((HashType2) => {
  HashType2[HashType2["sha256"] = 5] = "sha256";
  HashType2[HashType2["sha512"] = 6] = "sha512";
  return HashType2;
})(HashType || {});
var dictionary = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var shuffleMap = {
  sha256: [
    20,
    10,
    0,
    11,
    1,
    21,
    2,
    22,
    12,
    23,
    13,
    3,
    14,
    4,
    24,
    5,
    25,
    15,
    26,
    16,
    6,
    17,
    7,
    27,
    8,
    28,
    18,
    29,
    19,
    9,
    30,
    31
  ],
  sha512: [
    42,
    21,
    0,
    1,
    43,
    22,
    23,
    2,
    44,
    45,
    24,
    3,
    4,
    46,
    25,
    26,
    5,
    47,
    48,
    27,
    6,
    7,
    49,
    28,
    29,
    8,
    50,
    51,
    30,
    9,
    10,
    52,
    31,
    32,
    11,
    53,
    54,
    33,
    12,
    13,
    55,
    34,
    35,
    14,
    56,
    57,
    36,
    15,
    16,
    58,
    37,
    38,
    17,
    59,
    60,
    39,
    18,
    19,
    61,
    40,
    41,
    20,
    62,
    63
  ]
};
var roundsDefault = 5e3;
function getRandomString(length) {
  var result = "";
  for (let i = 0; i < length; i++) {
    result += dictionary[(0, import_node_crypto2.randomInt)(0, dictionary.length - 1)];
  }
  return result;
}
function normalizeSalt(conf) {
  const parts = ["", conf.id];
  if (conf.specifyRounds || conf.rounds !== roundsDefault) {
    parts.push(`rounds=${conf.rounds}`);
  }
  parts.push(conf.saltString);
  return parts.join("$");
}
function parseSalt(salt) {
  const roundsMin = 1e3;
  const roundsMax = 999999999;
  const conf = {
    id: 6 /* sha512 */,
    saltString: getRandomString(16),
    rounds: roundsDefault,
    specifyRounds: false
  };
  if (salt) {
    const parts = salt.split("$");
    conf.id = Number(parts[1]);
    if (conf.id !== 5 /* sha256 */ && conf.id !== 6 /* sha512 */) {
      throw new Error("Only sha256 and sha512 is supported by this library");
    }
    if (parts.length < 2 || parts.length > 4) {
      throw new Error("Invalid salt string");
    }
    if (parts.length > 2) {
      const rounds = parts[2].match(/^rounds=(\d*)$/);
      if (rounds) {
        conf.rounds = Number(rounds[1]);
        conf.specifyRounds = true;
        if (parts[3] || parts[3] === "") {
          conf.saltString = parts[3];
        }
      } else {
        conf.saltString = parts[2];
      }
    }
  }
  conf.rounds = conf.rounds < roundsMin ? roundsMin : conf.rounds > roundsMax ? (
    /* istanbul ignore next */
    conf.rounds = roundsMax
  ) : conf.rounds;
  conf.saltString = conf.saltString.substring(0, 16);
  if (conf.saltString.match("[^./0-9A-Za-z]")) {
    throw new Error("Invalid salt string");
  }
  return conf;
}
function generateDigestA(plaintext, conf) {
  const digestSize = conf.id === 5 /* sha256 */ ? 32 : 64;
  const hashA = (0, import_node_crypto2.createHash)(HashType[conf.id]);
  hashA.update(plaintext);
  hashA.update(conf.saltString);
  const hashB = (0, import_node_crypto2.createHash)(HashType[conf.id]);
  hashB.update(plaintext);
  hashB.update(conf.saltString);
  hashB.update(plaintext);
  const digestB = hashB.digest();
  const plaintextByteLength = import_node_buffer.Buffer.byteLength(plaintext);
  for (let offset = 0; offset + digestSize < plaintextByteLength; offset += digestSize) {
    hashA.update(digestB);
  }
  const remainder = plaintextByteLength % digestSize;
  hashA.update(digestB.slice(0, remainder));
  plaintextByteLength.toString(2).split("").reverse().forEach((num) => {
    hashA.update(num === "0" ? plaintext : digestB);
  });
  return hashA.digest();
}
function generateHash(plaintext, conf) {
  const digestSize = conf.id === 5 /* sha256 */ ? 32 : 64;
  const hashType = HashType[conf.id];
  const digestA = generateDigestA(plaintext, conf);
  const plaintextByteLength = import_node_buffer.Buffer.byteLength(plaintext);
  const hashDP = (0, import_node_crypto2.createHash)(hashType);
  for (let i = 0; i < plaintextByteLength; i++) {
    hashDP.update(plaintext);
  }
  const digestDP = hashDP.digest();
  const p = import_node_buffer.Buffer.alloc(plaintextByteLength);
  for (let offset = 0; offset + digestSize < plaintextByteLength; offset += digestSize) {
    p.set(digestDP, offset);
  }
  const remainder = plaintextByteLength % digestSize;
  p.set(digestDP.slice(0, remainder), plaintextByteLength - remainder);
  const hashDS = (0, import_node_crypto2.createHash)(hashType);
  const step18 = 16 + digestA[0];
  for (let i = 0; i < step18; i++) {
    hashDS.update(conf.saltString);
  }
  const digestDS = hashDS.digest();
  const s = import_node_buffer.Buffer.alloc(conf.saltString.length);
  const saltByteLength = import_node_buffer.Buffer.byteLength(conf.saltString);
  for (let offset = 0; offset + digestSize < saltByteLength; offset += digestSize) {
    s.set(digestDS, offset);
  }
  const saltRemainder = saltByteLength % digestSize;
  s.set(digestDS.slice(0, saltRemainder), saltByteLength - saltRemainder);
  const rounds = Array(conf.rounds).fill(0);
  const digestC = rounds.reduce((acc, curr, idx) => {
    const hashC = (0, import_node_crypto2.createHash)(hashType);
    if (idx % 2 === 0) {
      hashC.update(acc);
    } else {
      hashC.update(p);
    }
    if (idx % 3 !== 0) {
      hashC.update(s);
    }
    if (idx % 7 !== 0) {
      hashC.update(p);
    }
    if (idx % 2 !== 0) {
      hashC.update(acc);
    } else {
      hashC.update(p);
    }
    return hashC.digest();
  }, digestA);
  return base64Encode(digestC, shuffleMap[hashType]);
}
function base64Encode(digest, shuffleMap2) {
  let hash = "";
  for (let idx = 0; idx < digest.length; idx += 3) {
    const buf = import_node_buffer.Buffer.alloc(3);
    buf[0] = digest[shuffleMap2[idx]];
    buf[1] = digest[shuffleMap2[idx + 1]];
    buf[2] = digest[shuffleMap2[idx + 2]];
    hash += bufferToBase64(buf);
  }
  return hash.slice(0, digest.length === 32 ? -1 : -2);
}
function bufferToBase64(buf) {
  const first = buf[0] & parseInt("00111111", 2);
  const second = (buf[0] & parseInt("11000000", 2)) >>> 6 | (buf[1] & parseInt("00001111", 2)) << 2;
  const third = (buf[1] & parseInt("11110000", 2)) >>> 4 | (buf[2] & parseInt("00000011", 2)) << 4;
  const fourth = (buf[2] & parseInt("11111100", 2)) >>> 2;
  return dictionary.charAt(first) + dictionary.charAt(second) + dictionary.charAt(third) + dictionary.charAt(fourth);
}
var Encrypt = class {
  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }
  createHash(plaintext, salt) {
    const conf = parseSalt(salt);
    const hash = generateHash(plaintext, conf);
    return normalizeSalt(conf) + "$" + hash;
  }
  verifyHash(plaintext, hash) {
    const salt = hash.slice(0, hash.lastIndexOf("$"));
    const computedHash = this.createHash(plaintext, salt);
    return (0, import_node_crypto2.timingSafeEqual)(
      import_node_buffer.Buffer.from(computedHash, "utf8"),
      import_node_buffer.Buffer.from(hash, "utf8")
    );
  }
  generateKey(key) {
    return import_node_crypto.default.subtle.importKey("raw", this.encoder.encode(key.slice(0, 16)), { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }
  async encrypt(key, data) {
    const newKey = await this.generateKey(key);
    const iv = import_node_crypto.default.getRandomValues(new Uint8Array(12));
    const encrypted = new Uint8Array(await import_node_crypto.default.subtle.encrypt({ name: "AES-GCM", iv }, newKey, this.encoder.encode(data)));
    const combined = new Uint8Array(iv.length + encrypted.length);
    combined.set(iv);
    combined.set(encrypted, iv.length);
    let result = "";
    for (let i = 0; i < combined.length; i++) {
      result += combined[i].toString(16).padStart(2, "0");
    }
    return result;
  }
  async decrypt(key, strEncrypted) {
    const newKey = await this.generateKey(key);
    let uint8Array = new Uint8Array(strEncrypted.length / 2);
    for (let i = 0; i < strEncrypted.length; i += 2) {
      uint8Array[i / 2] = parseInt(strEncrypted.substr(i, 2), 16);
    }
    const iv = uint8Array.slice(0, 12);
    const data = uint8Array.slice(12, uint8Array.length);
    const decrypted = await import_node_crypto.default.subtle.decrypt({ name: "AES-GCM", iv }, newKey, data);
    return this.decoder.decode(decrypted);
  }
};

// controllers/apis/middlewares/encrypt.ts
var encrypt = new Encrypt();
var isJSON = (text) => /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""));
var DENIED_ERROR2 = {
  code: "access-denied",
  message: "No tienes permiso para hacer esto!"
};
async function decryptRequest(req, res, next) {
  if (verifyDevMode.bind(this)()) {
    next();
    return;
  }
  let nextError = void 0;
  if (req.session.key && typeof req.body === "string") {
    try {
      const result = await encrypt.decrypt(req.session.key, req.body);
      if (isJSON(result)) {
        req.body = JSON.parse(result);
      } else {
        req.body = result;
      }
    } catch (error) {
      nextError = DENIED_ERROR2;
    }
  }
  next(nextError);
}

// libraries/classes/APIList.ts
var APPS = {
  APPS: "APP_LIST",
  APPS_BY_UID: "APP_LIST_BY_UID",
  INSTALL: "INSTALL_APP",
  UNINSTALL: "UNINSTALL_APP"
};
var AUTH = {
  INDEX: {
    name: "AUTH_STATUS",
    public: true,
    freeForDashboard: true
  },
  LOGIN: {
    name: "AUTH_LOGIN",
    public: true,
    freeForDashboard: false
  },
  LOGOUT: {
    name: "AUTH_LOGOUT",
    public: true,
    freeForDashboard: true
  }
};
var FS = {
  SHARED_DRIVE: "ACCESS_SHARED_FILE_LIST",
  USER_DRIVE: "ACCESS_USER_FILE_LIST",
  MKDIR_SHARED_DRIVE: "CREATE_SHARED_DIR",
  MKDIR_USER_DRIVE: "CREATE_USER_DIR",
  UPLOAD_SHARED_DRIVE: "UPLOAD_SHARED_FILE",
  UPLOAD_USER_DRIVE: "UPLOAD_USER_FILE",
  RM_SHARED_DRIVE: "REMOVE_SHARED_FILES_AND_DIRECTORIES",
  RM_USER_DRIVE: "REMOVE_USER_FILES_AND_DIRECTORIES",
  COPY: "COPY_FILES_AND_DIRECTORIES",
  MOVE: "MOVE_FILES_AND_DIRECTORIES",
  RENAME: "RENAME_FILES_AND_DIRECTORIES"
};
var PERMISSIONS = {
  FIND: "PERMISSION_LIST",
  ENABLE: "ENABLE_PERMISSION",
  DISABLE: "DISABLE_PERMISSION"
};
var PROFILE = {
  INDEX: {
    name: "PROFILE_INFO",
    public: false,
    freeForDashboard: true
  },
  APPS: {
    name: "PROFILE_APP_LIST",
    public: false,
    freeForDashboard: true
  },
  UPDATE: {
    name: "UPDATE_PROFILE_INFO",
    public: false,
    freeForDashboard: true
  },
  UPDATE_PASSWORD: {
    name: "UPDATE_PASSWORD",
    public: false,
    freeForDashboard: true
  }
};
var RECYCLE_BIN = {
  LIST: "LIST_RECYCLE_BIN",
  CREATE: "ADD_ITEMS_TO_RECYCLE_BIN",
  RESTORE: "RESTORE_ITEMS_TO_RECYCLE_BIN",
  DELETE: "DELETE_ITEMS_TO_RECYCLE_BIN",
  CLEAN: "CLEAN_RECYCLE_BIN"
};
var SHARED = {
  INDEX: "SHARED_LIST",
  CREATE: "SHARED_CREATE",
  DELETE: "SHARED_DELETE"
};
var SOURCES = {
  FIND: "SOURCE_LIST",
  ENABLE: "ENABLE_SOURCE",
  DISABLE: "DISABLE_SOURCE"
};
var USERS = {
  INDEX: "USER_LIST",
  USER: "USER_INFO",
  CREATE: "CREATE_USER",
  UPDATE: "UPDATE_USER_INFO",
  DELETE: "DELETE_USER",
  ASSIGN_APP: "ASSIGN_APP_TO_USER",
  UNASSIGN_APP: "UNASSIGN_APP_TO_USER"
};

// controllers/apis/apps.ts
var { GET: GET3, PUT, DELETE } = METHODS;
var AppsAPIController = class {
  async apps(_, res) {
    const results = await this.appsModel.getApps();
    res.json(results);
  }
  async appsByUID(req, res) {
    const user = this.usersModel.getUserByUID(Number(req.params.uid || "NaN"));
    if (!user) {
      res.status(400).json({
        code: "user-not-exist",
        message: "El usuario no existe."
      });
      return;
    }
    const results = await this.appsModel.getAppsByUID(user.uid);
    res.json(results);
  }
  async install(req, res) {
    const package_zip = req.files?.package_zip;
    if (package_zip) {
      let package_name = package_zip.name.split(".");
      package_name.pop();
      package_name = package_name.join(".");
      const result = await this.appsModel.getAppByPackageName(package_name);
      if (!result) {
        const result2 = await this.appsModel.install(package_name, package_zip.data);
        res.json(result2);
      } else {
        res.status(400).json({
          code: "app-already-exist",
          message: `La aplicaci\xF3n ${package_name} ya est\xE1 instalada.`
        });
      }
    } else {
      res.status(400).json({
        code: "fields-required",
        message: "No hay ning\xFAn archivo adjunto."
      });
    }
  }
  async unInstall(req, res) {
    const { package_name } = req.params;
    const app = await this.appsModel.getAppByPackageName(package_name);
    if (app) {
      await this.appsModel.uninstall(package_name);
      res.json(true);
    }
  }
};
__decorateClass([
  Model("DevModeModel")
], AppsAPIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("UsersModel")
], AppsAPIController.prototype, "usersModel", 2);
__decorateClass([
  Model("AppsModel")
], AppsAPIController.prototype, "appsModel", 2);
__decorateClass([
  On(GET3, "/"),
  BeforeMiddleware([verifyPermission(APPS.APPS)])
], AppsAPIController.prototype, "apps", 1);
__decorateClass([
  On(GET3, "/:uid"),
  BeforeMiddleware([verifyPermission(APPS.APPS_BY_UID)])
], AppsAPIController.prototype, "appsByUID", 1);
__decorateClass([
  On(PUT, "/"),
  BeforeMiddleware([verifyPermission(APPS.INSTALL), (0, import_express_fileupload.default)()])
], AppsAPIController.prototype, "install", 1);
__decorateClass([
  On(DELETE, "/:package_name"),
  BeforeMiddleware([verifyPermission(APPS.UNINSTALL)])
], AppsAPIController.prototype, "unInstall", 1);
AppsAPIController = __decorateClass([
  Namespace("api/apps", { before: [verifySession2, decryptRequest] })
], AppsAPIController);

// controllers/apis/auth.ts
var import_uuid2 = require("uuid");
var { GET: GET4, POST, DELETE: DELETE2 } = METHODS;
var AuthAPIController = class {
  async index(req, res) {
    if (req.session.user || this.devModeModel.devMode.config.enable) {
      res.json(true);
    } else {
      res.json(false);
    }
  }
  async login(req, res) {
    const { userName, password } = req.body;
    const user = this.usersModel.getUser(userName);
    if (user) {
      if (this.usersModel.verifyPassword(userName, password)) {
        delete user.password_hash;
        req.session.user = user;
        req.session.apps = {};
        const apps = await this.appsModel.getAppsByUID(user.uid);
        for (const app of apps) {
          const { package_name } = app;
          const secureSources = await this.sourcesModel.find({ package_name });
          const permissions = await this.permissionsModel.find({ package_name });
          const sessionApp = {
            ...app,
            secureSources,
            permissions,
            token: (0, import_uuid2.v4)()
          };
          req.session.apps[app.package_name] = sessionApp;
        }
        res.json({ ok: true });
      } else {
        res.status(400).json({ ok: false, message: "La contrase\xF1a es incorrecta!" });
      }
    } else {
      res.status(400).json({ ok: false, message: `El usuario "${userName}" no existe!` });
    }
  }
  logout(req, res) {
    req.session.destroy(() => {
      res.json(true);
    });
  }
};
__decorateClass([
  Model("UsersModel")
], AuthAPIController.prototype, "usersModel", 2);
__decorateClass([
  Model("AppsModel")
], AuthAPIController.prototype, "appsModel", 2);
__decorateClass([
  Model("DevModeModel")
], AuthAPIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("SourcesModel")
], AuthAPIController.prototype, "sourcesModel", 2);
__decorateClass([
  Model("PermissionsModel")
], AuthAPIController.prototype, "permissionsModel", 2);
__decorateClass([
  On(GET4, "/"),
  BeforeMiddleware([verifyPermission(AUTH.INDEX)])
], AuthAPIController.prototype, "index", 1);
__decorateClass([
  On(POST, "/"),
  BeforeMiddleware([verifyPermission(AUTH.LOGIN), decryptRequest])
], AuthAPIController.prototype, "login", 1);
__decorateClass([
  On(DELETE2, "/"),
  BeforeMiddleware([verifyPermission(AUTH.LOGOUT)])
], AuthAPIController.prototype, "logout", 1);
AuthAPIController = __decorateClass([
  Namespace("api/auth")
], AuthAPIController);

// controllers/apis/fs.ts
var import_express_fileupload2 = __toESM(require("express-fileupload"));
var { POST: POST2, PUT: PUT2, DELETE: DELETE3 } = METHODS;
var FileSystemAPIController = class {
  sharedDrive(req, res) {
    const { path: path2 = [] } = req.body;
    const result = this.fsModel.lsSharedDirectory(path2);
    if (typeof result === "boolean") {
      res.status(404).json({
        code: "not-found",
        message: "La ruta que indicaste no existe."
      });
      return;
    }
    res.json(result);
  }
  userDrive(req, res) {
    const { path: path2 = [] } = req.body;
    const result = this.fsModel.lsUserDirectory(req.session.user?.name || "", path2);
    if (typeof result === "boolean") {
      res.status(404).json({
        code: "not-found",
        message: "La ruta que indicaste no existe."
      });
      return;
    }
    res.json(result);
  }
  mkdirSharedDrive(req, res) {
    const { path: path2 = [] } = req.body;
    this.fsModel.mkdirToShared(path2);
    res.json(true);
  }
  mkdirUserDrive(req, res) {
    const { path: path2 = [] } = req.body;
    this.fsModel.mkdirToUser(req.session.user?.name || "", path2);
    res.json(true);
  }
  uploadSharedDrive(req, res) {
    const { path: path2 = [] } = req.body;
    const { files } = req;
    if (!files) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    const entries = Object.entries(files);
    for (const [name, value] of entries) {
      this.fsModel.writeToShared([...path2, name], value.data);
    }
    res.json(true);
  }
  uploadUserDrive(req, res) {
    const { path: path2 = [] } = req.body;
    const { files } = req;
    if (!files) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    const entries = Object.entries(files);
    for (const [name, value] of entries) {
      this.fsModel.writeToUser(req.session.user?.name || "", [...path2, name], value.data);
    }
    res.json(true);
  }
  rmSharedDrive(req, res) {
    const { path: path2 = [] } = req.body;
    this.fsModel.rmToShared(path2);
    res.json(true);
  }
  rmUserDrive(req, res) {
    const { path: path2 = [] } = req.body;
    this.fsModel.rmToUser(req.session.user?.name || "", path2);
    res.json(true);
  }
  copy(req, res) {
    const { origin, dest } = req.body;
    if ((!origin || !dest) && (!Array.isArray(origin) || !Array.isArray(dest))) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    this.fsModel.copy(req.session.user?.name || "", origin, dest);
    res.json(true);
  }
  move(req, res) {
    const { origin, dest } = req.body;
    if ((!origin || !dest) && (!Array.isArray(origin) || !Array.isArray(dest))) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    this.fsModel.copy(req.session.user?.name || "", origin, dest, true);
    res.json(true);
  }
  rename(req, res) {
    const { path: path2, newName } = req.body;
    if (!Array.isArray(path2) || typeof newName !== "string") {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    this.fsModel.rename(req.session.user?.name || "", path2, newName);
    res.json(true);
  }
};
__decorateClass([
  Model("DevModeModel")
], FileSystemAPIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("FileSystemModel")
], FileSystemAPIController.prototype, "fsModel", 2);
__decorateClass([
  On(POST2, "/shared/list"),
  BeforeMiddleware([verifyPermission(FS.SHARED_DRIVE)])
], FileSystemAPIController.prototype, "sharedDrive", 1);
__decorateClass([
  On(POST2, "/user/list"),
  BeforeMiddleware([verifyPermission(FS.USER_DRIVE)])
], FileSystemAPIController.prototype, "userDrive", 1);
__decorateClass([
  On(POST2, "/shared"),
  BeforeMiddleware([verifyPermission(FS.MKDIR_SHARED_DRIVE)])
], FileSystemAPIController.prototype, "mkdirSharedDrive", 1);
__decorateClass([
  On(POST2, "/user"),
  BeforeMiddleware([verifyPermission(FS.MKDIR_USER_DRIVE)])
], FileSystemAPIController.prototype, "mkdirUserDrive", 1);
__decorateClass([
  On(PUT2, "/shared"),
  BeforeMiddleware([verifyPermission(FS.UPLOAD_SHARED_DRIVE)])
], FileSystemAPIController.prototype, "uploadSharedDrive", 1);
__decorateClass([
  On(PUT2, "/user"),
  BeforeMiddleware([verifyPermission(FS.UPLOAD_USER_DRIVE)])
], FileSystemAPIController.prototype, "uploadUserDrive", 1);
__decorateClass([
  On(DELETE3, "/shared"),
  BeforeMiddleware([verifyPermission(FS.RM_SHARED_DRIVE)])
], FileSystemAPIController.prototype, "rmSharedDrive", 1);
__decorateClass([
  On(DELETE3, "/user"),
  BeforeMiddleware([verifyPermission(FS.RM_USER_DRIVE)])
], FileSystemAPIController.prototype, "rmUserDrive", 1);
__decorateClass([
  On(POST2, "/copy"),
  BeforeMiddleware([verifyPermission(FS.COPY)])
], FileSystemAPIController.prototype, "copy", 1);
__decorateClass([
  On(POST2, "/move"),
  BeforeMiddleware([verifyPermission(FS.MOVE)])
], FileSystemAPIController.prototype, "move", 1);
__decorateClass([
  On(POST2, "/rename"),
  BeforeMiddleware([verifyPermission(FS.RENAME)])
], FileSystemAPIController.prototype, "rename", 1);
FileSystemAPIController = __decorateClass([
  Namespace("/api/fs", { before: [verifySession2, decryptRequest, (0, import_express_fileupload2.default)()] })
], FileSystemAPIController);

// controllers/apis/permissions.ts
var { GET: GET5, POST: POST3, DELETE: DELETE4 } = METHODS;
var PermissionsAPIController = class {
  async find(req, res) {
    const { package_name, api, active } = req.query;
    const query = {};
    if (package_name) {
      query["package_name"] = package_name.toString();
    }
    if (api) {
      query["api"] = api.toString();
    }
    if (active !== void 0) {
      query["active"] = active === "true";
    }
    const results = await this.permissionModel.find(query);
    res.json(results);
  }
  async enable(req, res) {
    const { id } = req.params;
    await this.permissionModel.setActive(id, true);
    res.json(true);
  }
  async disable(req, res) {
    const { id } = req.params;
    await this.permissionModel.setActive(id, false);
    res.json(true);
  }
};
__decorateClass([
  Model("DevModeModel")
], PermissionsAPIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("PermissionsModel")
], PermissionsAPIController.prototype, "permissionModel", 2);
__decorateClass([
  On(GET5, "/"),
  BeforeMiddleware([verifyPermission(PERMISSIONS.FIND)])
], PermissionsAPIController.prototype, "find", 1);
__decorateClass([
  On(POST3, "/:id"),
  BeforeMiddleware([verifyPermission(PERMISSIONS.ENABLE)])
], PermissionsAPIController.prototype, "enable", 1);
__decorateClass([
  On(DELETE4, "/:id"),
  BeforeMiddleware([verifyPermission(PERMISSIONS.DISABLE)])
], PermissionsAPIController.prototype, "disable", 1);
PermissionsAPIController = __decorateClass([
  Namespace("api/permissions", { before: [verifySession2] })
], PermissionsAPIController);

// controllers/apis/profile.ts
var { GET: GET6, POST: POST4, PUT: PUT3 } = METHODS;
var ProfileAPIController = class {
  index(req, res) {
    res.json(req.session.user);
  }
  async apps(req, res) {
    const results = await this.appsModel.getAppsByUID(req.session.user?.uid || NaN);
    const apps = results.map((app) => ({
      package_name: app.package_name,
      title: app.title,
      description: app.description,
      author: app.author
    }));
    res.json(apps);
  }
  update(req, res) {
    if (req.session.user) {
      const { user_name, full_name, email, phone } = req.body;
      if (user_name) {
        const result = this.usersModel.getUser(user_name);
        if (result) {
          res.json({
            code: "user-already-exists",
            message: `El usuario ${user_name} ya existe!`
          });
          return;
        }
      }
      this.usersModel.updateUser(
        req.session.user.name,
        { full_name, email, phone }
      );
      if (full_name) {
        req.session.user.full_name = full_name;
      }
      if (email) {
        req.session.user.email = email;
      }
      if (phone) {
        req.session.user.phone = phone;
      }
    }
    res.json(true);
  }
  async updatePassword(req, res) {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    if (this.usersModel.verifyPassword(req.session.user?.name || "", current_password)) {
      await this.usersModel.updatePassword(req.session.user?.name || "", new_password);
      res.json({ ok: true });
    } else {
      res.status(400).json({ ok: false, message: "La contrase\xF1a es incorrecta!" });
    }
  }
};
__decorateClass([
  Model("DevModeModel")
], ProfileAPIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("AppsModel")
], ProfileAPIController.prototype, "appsModel", 2);
__decorateClass([
  Model("UsersModel")
], ProfileAPIController.prototype, "usersModel", 2);
__decorateClass([
  On(GET6, "/"),
  BeforeMiddleware([verifyPermission(PROFILE.INDEX)])
], ProfileAPIController.prototype, "index", 1);
__decorateClass([
  On(GET6, "/apps"),
  BeforeMiddleware([verifyPermission(PROFILE.APPS)])
], ProfileAPIController.prototype, "apps", 1);
__decorateClass([
  On(POST4, "/"),
  BeforeMiddleware([verifyPermission(PROFILE.UPDATE), decryptRequest])
], ProfileAPIController.prototype, "update", 1);
__decorateClass([
  On(PUT3, "/"),
  BeforeMiddleware([verifyPermission(PROFILE.UPDATE_PASSWORD), decryptRequest])
], ProfileAPIController.prototype, "updatePassword", 1);
ProfileAPIController = __decorateClass([
  Namespace("api/profile", { before: [verifySession2] })
], ProfileAPIController);

// controllers/apis/recycle-bin.ts
var { GET: GET7, POST: POST5, PUT: PUT4, DELETE: DELETE5 } = METHODS;
var RecycleBinController = class {
  async list(req, res) {
    const results = await this.recycleBinModel.findByUID(req.session.user?.uid || NaN);
    res.json(results);
  }
  async create(req, res) {
    if (!req.body.path || !Array.isArray(req.body.path) || req.body.path?.length < 2) {
      res.status(403).json({
        code: "bad-request",
        message: "La ruta no es v\xE1lida."
      });
      return;
    }
    const path2 = req.body.path || [];
    const result = this.fsModel.resolvePath(req.session.user?.name || "", path2, true);
    if (typeof result === "boolean") {
      res.status(404).json({
        code: "not-found",
        message: "La ruta que indicaste no existe."
      });
      return;
    }
    await this.recycleBinModel.moveToRecycleBin(req.session.user, result, path2);
    res.json(true);
  }
  async restore(req, res) {
    const { id } = req.params;
    const result = await this.recycleBinModel.findByID(id);
    if (!result) {
      res.json(true);
      return;
    }
    const path2 = this.fsModel.resolvePath(req.session.user?.name || "", result.path, false);
    await this.recycleBinModel.restore(req.session.user?.name || "", result.id, path2);
    res.json(true);
  }
  async delete(req, res) {
    await this.recycleBinModel.delete(req.session.user, req.params.id);
    res.json(true);
  }
  async clean(req, res) {
    await this.recycleBinModel.clean(req.session.user);
    res.json(true);
  }
};
__decorateClass([
  Model("DevModeModel")
], RecycleBinController.prototype, "devModeModel", 2);
__decorateClass([
  Model("FileSystemModel")
], RecycleBinController.prototype, "fsModel", 2);
__decorateClass([
  Model("RecycleBinModel")
], RecycleBinController.prototype, "recycleBinModel", 2);
__decorateClass([
  On(GET7, "/"),
  BeforeMiddleware([verifyPermission(RECYCLE_BIN.LIST)])
], RecycleBinController.prototype, "list", 1);
__decorateClass([
  On(POST5, "/"),
  BeforeMiddleware([verifyPermission(RECYCLE_BIN.CREATE)])
], RecycleBinController.prototype, "create", 1);
__decorateClass([
  On(PUT4, "/:id"),
  BeforeMiddleware([verifyPermission(RECYCLE_BIN.RESTORE)])
], RecycleBinController.prototype, "restore", 1);
__decorateClass([
  On(DELETE5, "/:id"),
  BeforeMiddleware([verifyPermission(RECYCLE_BIN.DELETE)])
], RecycleBinController.prototype, "delete", 1);
__decorateClass([
  On(DELETE5, "/"),
  BeforeMiddleware([verifyPermission(RECYCLE_BIN.CLEAN)])
], RecycleBinController.prototype, "clean", 1);
RecycleBinController = __decorateClass([
  Namespace("/api/recycle-bin", { before: [verifySession2, decryptRequest] })
], RecycleBinController);

// controllers/apis/shared.ts
var import_uuid3 = require("uuid");
var { GET: GET8, POST: POST6, DELETE: DELETE6 } = METHODS;
var SharedAPIController = class {
  async index(req, res) {
    const results = await this.sharedModel.find({ uid: req.session.user?.name });
    res.json(results);
  }
  async create(req, res) {
    const { path: path2 } = req.body;
    if (!path2) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    const uuid = req.session.user?.name || "";
    const [result] = await this.sharedModel.find({ uid: uuid, path: path2 });
    if (result) {
      res.json(result);
    } else {
      const newShared = { id: (0, import_uuid3.v4)(), uid: uuid, path: path2 };
      await this.sharedModel.create(newShared);
      res.json(newShared);
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    await this.sharedModel.delete(id);
    res.json(true);
  }
};
__decorateClass([
  Model("DevModeModel")
], SharedAPIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("SharedModel")
], SharedAPIController.prototype, "sharedModel", 2);
__decorateClass([
  On(GET8, "/"),
  BeforeMiddleware([verifyPermission(SHARED.INDEX)])
], SharedAPIController.prototype, "index", 1);
__decorateClass([
  On(POST6, "/"),
  BeforeMiddleware([verifyPermission(SHARED.CREATE)])
], SharedAPIController.prototype, "create", 1);
__decorateClass([
  On(DELETE6, "/:id"),
  BeforeMiddleware([verifyPermission(SHARED.DELETE)])
], SharedAPIController.prototype, "delete", 1);
SharedAPIController = __decorateClass([
  Namespace("/api/shared", { before: [verifySession2, decryptRequest] })
], SharedAPIController);

// controllers/apis/sources.ts
var { GET: GET9, POST: POST7, DELETE: DELETE7 } = METHODS;
var SecureSourcesAPIController = class {
  async find(req, res) {
    const { package_name, type, active } = req.query;
    const query = {};
    if (package_name) {
      query["package_name"] = package_name.toString();
    }
    if (type) {
      query["type"] = type.toString();
    }
    if (active !== void 0) {
      query["active"] = active === "true";
    }
    const results = await this.sourcesModel.find(query);
    res.json(results);
  }
  async enable(req, res) {
    const { id } = req.params;
    await this.sourcesModel.setActive(id, true);
    res.json(true);
  }
  async disable(req, res) {
    const { id } = req.params;
    await this.sourcesModel.setActive(id, false);
    res.json(true);
  }
};
__decorateClass([
  Model("DevModeModel")
], SecureSourcesAPIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("SourcesModel")
], SecureSourcesAPIController.prototype, "sourcesModel", 2);
__decorateClass([
  On(GET9, "/"),
  BeforeMiddleware([verifyPermission(SOURCES.FIND)])
], SecureSourcesAPIController.prototype, "find", 1);
__decorateClass([
  On(POST7, "/:id"),
  BeforeMiddleware([verifyPermission(SOURCES.ENABLE)])
], SecureSourcesAPIController.prototype, "enable", 1);
__decorateClass([
  On(DELETE7, "/:id"),
  BeforeMiddleware([verifyPermission(SOURCES.DISABLE)])
], SecureSourcesAPIController.prototype, "disable", 1);
SecureSourcesAPIController = __decorateClass([
  Namespace("api/sources", { before: [verifySession2] })
], SecureSourcesAPIController);

// controllers/apis/users.ts
var { GET: GET10, POST: POST8, PUT: PUT5, DELETE: DELETE8 } = METHODS;
var UsersAPIController = class {
  index(_, res) {
    const results = this.usersModel.getUsers();
    res.json(results);
  }
  user(req, res) {
    const user = this.usersModel.getUserByUID(Number(req.params.uid));
    if (user) {
      res.json(user);
    } else {
      res.json(null);
    }
  }
  async create(req, res) {
    const { email, full_name, phone, name, password } = req.body;
    if (!name || !password) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    const result = this.usersModel.getUser(name);
    if (result) {
      res.status(400).json({
        code: "user-already-exists",
        message: `El usuario ${name} ya existe!`
      });
      return;
    }
    await this.usersModel.createUser({
      name,
      full_name,
      email,
      phone,
      password
    });
    res.json(true);
  }
  update(req, res) {
    const { full_name, email, phone } = req.body;
    const result = this.usersModel.getUserByUID(Number(req.params.uid));
    if (!result) {
      res.status(400).json({
        code: "user-not-exist",
        message: "El usuario no existe."
      });
      return;
    }
    this.usersModel.updateUser(result.name, { full_name, email, phone });
    res.json(true);
  }
  async delete(req, res) {
    const user = this.usersModel.getUserByUID(Number(req.params.uid));
    if (user) {
      await this.usersModel.deleteUser(user.name);
    }
    res.json(true);
  }
  async assignApp(req, res) {
    const { uid, package_name } = req.body;
    if (!uid || !package_name) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    const result = this.usersModel.getUserByUID(Number(uid));
    if (!result) {
      res.status(400).json({
        code: "user-not-exist",
        message: "El usuario no existe."
      });
      return;
    }
    await this.usersModel.assignApp(result.uid, package_name);
    res.json(true);
  }
  async unassignApp(req, res) {
    const { uid, package_name } = req.body;
    if (!uid || !package_name) {
      res.status(400).json({
        code: "fields-required",
        message: "Faltan campos!"
      });
      return;
    }
    const result = this.usersModel.getUserByUID(Number(uid));
    if (!result) {
      res.status(400).json({
        code: "user-not-exist",
        message: "El usuario no existe."
      });
      return;
    }
    await this.usersModel.unassignApp(result.uid, package_name);
    res.json(true);
  }
};
__decorateClass([
  Model("UsersModel")
], UsersAPIController.prototype, "usersModel", 2);
__decorateClass([
  Model("DevModeModel")
], UsersAPIController.prototype, "devModeModel", 2);
__decorateClass([
  On(GET10, "/"),
  BeforeMiddleware([verifyPermission(USERS.INDEX)])
], UsersAPIController.prototype, "index", 1);
__decorateClass([
  On(GET10, "/:uid"),
  BeforeMiddleware([verifyPermission(USERS.USER)])
], UsersAPIController.prototype, "user", 1);
__decorateClass([
  On(POST8, "/"),
  BeforeMiddleware([verifyPermission(USERS.CREATE), decryptRequest])
], UsersAPIController.prototype, "create", 1);
__decorateClass([
  On(PUT5, "/:uid"),
  BeforeMiddleware([verifyPermission(USERS.UPDATE), decryptRequest])
], UsersAPIController.prototype, "update", 1);
__decorateClass([
  On(DELETE8, "/:uid"),
  BeforeMiddleware([verifyPermission(USERS.DELETE)])
], UsersAPIController.prototype, "delete", 1);
__decorateClass([
  On(POST8, "/assign-app"),
  BeforeMiddleware([verifyPermission(USERS.ASSIGN_APP), decryptRequest])
], UsersAPIController.prototype, "assignApp", 1);
__decorateClass([
  On(POST8, "/unassign-app"),
  BeforeMiddleware([verifyPermission(USERS.UNASSIGN_APP), decryptRequest])
], UsersAPIController.prototype, "unassignApp", 1);
UsersAPIController = __decorateClass([
  Namespace("api/users", { before: [verifySession2] })
], UsersAPIController);

// controllers/apis/index.ts
var APIController = class {
  connector(req, res) {
    res.set("Content-Type", "text/javascript");
    if (this.devModeModel.devMode.config.enable) {
      res.send(this.builderModel.build());
      return;
    }
    let token = req.session.token || "";
    const key = req.session.key || "";
    const { referer } = req.headers;
    if (referer) {
      const origin = getOrigin(referer);
      if (typeof origin === "string" && req.session.apps) {
        const apis = req.session.apps[origin].permissions.filter((permission) => permission.active).map((permission) => permission.api);
        res.send(this.builderModel.build({ token, key, apis }));
      } else {
        if (origin === 0) {
          res.send(this.builderModel.build({ token, key, apis: this.builderModel.publicAPIList }));
        }
        if (origin === 1) {
          res.send(this.builderModel.build({ token, key, apis: this.builderModel.dashAPIList }));
        }
      }
    } else {
      res.status(404).end();
    }
  }
};
__decorateClass([
  Model("DevModeModel")
], APIController.prototype, "devModeModel", 2);
__decorateClass([
  Model("BuilderModel")
], APIController.prototype, "builderModel", 2);
__decorateClass([
  On(METHODS.GET, "/connector.js")
], APIController.prototype, "connector", 1);
APIController = __decorateClass([
  Namespace("/api")
], APIController);

// controllers/index.ts
var { GET: GET11 } = METHODS;
var IndexController = class {
  dashboard(_, res) {
    res.render("dashboard", { title: "LocalCloud - Dashboard", description: "LocalCloud - Dashboard" });
  }
  login(_, res) {
    res.render("login", { title: "LocalCloud - Iniciar sesi\xF3n", description: "LocalCloud - Iniciar sesi\xF3n" });
  }
};
__decorateClass([
  Model("DevModeModel")
], IndexController.prototype, "devModeModel", 2);
__decorateClass([
  On(GET11, "/"),
  BeforeMiddleware([devMode, tokens, verifySession])
], IndexController.prototype, "dashboard", 1);
__decorateClass([
  On(GET11, "/login"),
  BeforeMiddleware([devMode, tokens, verifyNotSession])
], IndexController.prototype, "login", 1);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  APIController,
  AppController,
  AppsAPIController,
  AuthAPIController,
  FileController,
  FileSystemAPIController,
  IndexController,
  LaunchController,
  PermissionsAPIController,
  ProfileAPIController,
  RecycleBinController,
  SecureSourcesAPIController,
  SharedAPIController,
  SharedController,
  UsersAPIController,
  verifyApp
});
//# sourceMappingURL=httpControllers.js.map
