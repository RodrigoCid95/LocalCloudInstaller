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

// libraries/index.ts
var libraries_exports = {};
__export(libraries_exports, {
  builder: () => builder,
  database: () => database,
  devMode: () => devMode,
  encrypt: () => encrypt,
  paths: () => paths,
  process: () => process2
});
module.exports = __toCommonJS(libraries_exports);

// node_modules/px.io/injectables/config.js
var configPath = "./config.js";
var configs = require(configPath).configs;

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

// libraries/builder-connector.ts
var import_esbuild = require("esbuild");

// libraries/classes/APIList.ts
var APIList_exports = {};
__export(APIList_exports, {
  APPS: () => APPS,
  AUTH: () => AUTH,
  FS: () => FS,
  PERMISSIONS: () => PERMISSIONS,
  PROFILE: () => PROFILE,
  RECYCLE_BIN: () => RECYCLE_BIN,
  SHARED: () => SHARED,
  SOURCES: () => SOURCES,
  STORE: () => STORE,
  USERS: () => USERS
});
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
  READ_CONFIG: {
    name: "PROFILE_READ_CONFIG",
    public: false,
    freeForDashboard: true
  },
  WRITE_CONFIG: {
    name: "PROFILE_WRITE_CONFIG",
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
var STORE = {
  STORAGE: "STORAGE"
};

// libraries/builder-connector.ts
var privateAPIList = [];
var dashAPIList = [];
var publicAPIList = [];
var allAPIList = [];
var Builder = class {
  get privateAPIList() {
    return privateAPIList;
  }
  get dashAPIList() {
    return dashAPIList;
  }
  get publicAPIList() {
    return publicAPIList;
  }
  constructor() {
    const entries = Object.entries(APIList_exports);
    for (const [_, value] of entries) {
      const subEntries = Object.entries(value);
      for (const [_2, value2] of subEntries) {
        if (typeof value2 === "object") {
          if (value2.freeForDashboard) {
            dashAPIList.push(value2.name);
            allAPIList.push(value2.name);
          }
          if (value2.public) {
            publicAPIList.push(value2.name);
            allAPIList.push(value2.name);
          }
        } else {
          privateAPIList.push(value2);
          allAPIList.push(value2);
        }
      }
    }
  }
  build({ token, key, apis }) {
    const modules = {};
    for (const api of allAPIList) {
      modules[`$${api}`] = apis ? apis.includes(api) ? "true" : "false" : "true";
    }
    const content = (0, import_esbuild.buildSync)({
      entryPoints: [configs.get("builderConnector").mainPath],
      bundle: true,
      platform: "browser",
      define: {
        TOKEN: `"${token}"`,
        KEY: `"${key}"`,
        IS_DEV: !token || !key ? "true" : "false",
        ...modules
      },
      minify: Array.isArray(apis),
      format: "esm",
      write: false,
      inject: [configs.get("builderConnector").apiPath],
      treeShaking: true,
      sourcemap: "inline"
    });
    return content.outputFiles[0].text;
  }
};
var builder = () => new Builder();

// libraries/dev-mode.ts
var import_node_fs = __toESM(require("node:fs"));
var DevMode = class {
  #enable;
  get enable() {
    return this.#enable;
  }
  get user() {
    return configs.get("devMode")?.user || process.env.USER || "";
  }
  constructor() {
    if (isRelease) {
      this.#enable = configs.get("devMode")?.enable || !import_node_fs.default.existsSync(configs.get("paths").system.path);
    } else {
      this.#enable = true;
    }
  }
};
var devMode = () => new DevMode();

// libraries/paths.ts
var import_node_child_process = require("node:child_process");
var import_node_fs2 = __toESM(require("node:fs"));
var import_node_path = __toESM(require("node:path"));
var import_ini = __toESM(require("ini"));
var Paths = class {
  constructor(config) {
    this.config = config;
  }
  get samba() {
    return this.config.samba;
  }
  get shadow() {
    return this.config.shadow;
  }
  get passwd() {
    return this.config.passwd;
  }
  get groups() {
    return this.config.groups;
  }
  get system() {
    return this.config.system.path;
  }
  get database() {
    return this.config.system.database;
  }
  get apps() {
    return this.config.system.apps;
  }
  get appsTemplates() {
    return this.config.system.appsViews;
  }
  get storages() {
    return this.config.system.storages;
  }
  get users() {
    return this.config.users.path;
  }
  get shared() {
    return this.config.users.shared;
  }
  get recycleBin() {
    return this.config.users.recycleBin;
  }
  getApp(packageName) {
    return import_node_path.default.join(this.apps, packageName);
  }
  getAppStorage(packageName) {
    return import_node_path.default.join(this.storages, packageName);
  }
  getAppGlobalStorage(packageName) {
    return import_node_path.default.join(this.storages, packageName, ".global");
  }
  getAppGlobalStorageItem({ packageName, item }) {
    return import_node_path.default.join(this.storages, packageName, ".global", `${item}.json`);
  }
  getAppUserStorage({ packageName, user }) {
    return import_node_path.default.join(this.storages, packageName, user);
  }
  getAppUserStorageItem({ packageName, user, item }) {
    return import_node_path.default.join(this.storages, packageName, user, `${item}.json`);
  }
  getUser(name) {
    return import_node_path.default.join(this.config.users.path, name);
  }
  getRecycleBin(name) {
    return import_node_path.default.join(this.recycleBin, name);
  }
  getRecycleBinItem(name, id) {
    return import_node_path.default.join(this.recycleBin, name, id);
  }
  resolve(segments, verify = true) {
    const pathSegments = segments.filter((segment) => segment !== "..");
    const pathShared = import_node_path.default.join(...pathSegments);
    if (verify) {
      if (import_node_fs2.default.existsSync(pathShared)) {
        return pathShared;
      }
      return false;
    }
    return pathShared;
  }
  resolveSharedPath({ segments, verify = true }) {
    return this.resolve([this.shared, ...segments], verify);
  }
  resolveUserPath({ name, segments, verify = true }) {
    return this.resolve([this.getUser(name), ...segments], verify);
  }
};
var paths = async () => {
  const paths2 = new Paths(configs.get("paths"));
  if (!import_node_fs2.default.existsSync(paths2.system)) {
    import_node_fs2.default.mkdirSync(paths2.system);
  }
  if (!import_node_fs2.default.existsSync(paths2.apps)) {
    import_node_fs2.default.mkdirSync(paths2.apps);
  }
  const SMB_CONFIG = import_node_fs2.default.readFileSync(paths2.samba, "utf8");
  const smbConfig = import_ini.default.parse(SMB_CONFIG);
  if (!smbConfig["Carpeta Compartida"]) {
    smbConfig["Carpeta Compartida"] = {
      comment: "Carpeta Compartida",
      path: paths2.shared,
      browsable: "yes",
      writable: "yes",
      "guest ok": "no",
      "valid users": "@lc"
    };
    const smbStrConfig = import_ini.default.stringify(smbConfig);
    import_node_fs2.default.writeFileSync(paths2.samba, smbStrConfig, "utf8");
    await new Promise((resolve) => {
      const child_process = (0, import_node_child_process.spawn)("/etc/init.d/smbd", ["restart"]);
      child_process.on("close", resolve);
      child_process.stdin.end();
    });
  }
  moduleEmitters.emit("Paths:ready");
  return paths2;
};

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

// libraries/encryptor.ts
var encrypt = () => new Encrypt();

// libraries/database/index.ts
var import_sqlite3 = require("sqlite3");

// libraries/database/recycle_bin.sql
var recycle_bin_default = "CREATE TABLE IF NOT EXISTS recycle_bin (\n  id TEXT PRIMARY KEY,\n  uid INTEGER,\n  path TEXT NOT NULL,\n  date TEXT NOT NULL\n);";

// libraries/database/shared.sql
var shared_default = "CREATE TABLE IF NOT EXISTS shared (\n  id TEXT PRIMARY KEY,\n  uid INTEGER,\n  path TEXT\n);";

// libraries/database/apps.sql
var apps_default = "CREATE TABLE IF NOT EXISTS apps (\n    package_name TEXT PRIMARY KEY,\n    title TEXT NOT NULL,\n    description TEXT,\n    author TEXT NOT NULL,\n    extensions TEXT,\n    use_storage INTEGER,\n    use_template INTEGER\n);";

// libraries/database/users_to_apps.sql
var users_to_apps_default = "CREATE TABLE IF NOT EXISTS users_to_apps (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    uid INTEGER,\n    package_name REFERENCES apps (package_name) ON DELETE CASCADE ON UPDATE CASCADE\n);";

// libraries/database/permissions.sql
var permissions_default = "CREATE TABLE IF NOT EXISTS permissions (\n    id_permission INTEGER PRIMARY KEY AUTOINCREMENT,\n    package_name TEXT REFERENCES apps (package_name) ON DELETE CASCADE ON UPDATE CASCADE,\n    api TEXT NOT NULL,\n    justification TEXT NOT NULL,\n    active INTEGER NOT NULL\n);";

// libraries/database/secure_sources.sql
var secure_sources_default = "CREATE TABLE IF NOT EXISTS secure_sources (\n  id_source INTEGER PRIMARY KEY AUTOINCREMENT,\n  package_name TEXT REFERENCES apps (package_name) ON DELETE CASCADE ON UPDATE CASCADE,\n  type TEXT NOT NULL,\n  source TEXT NOT NULL,\n  justification TEXT NOT NULL,\n  active INTEGER DEFAULT (0)\n);";

// libraries/database/index.ts
var database = async () => {
  await new Promise((resolve) => moduleEmitters.on("Paths:ready", resolve));
  const database2 = configs.get("database");
  const sqlite3 = (0, import_sqlite3.verbose)();
  const connector = new sqlite3.Database(database2.path);
  await new Promise((resolve) => connector.run(recycle_bin_default, resolve));
  await new Promise((resolve) => connector.run(shared_default, resolve));
  await new Promise((resolve) => connector.run(apps_default, resolve));
  await new Promise((resolve) => connector.run(users_to_apps_default, resolve));
  await new Promise((resolve) => connector.run(permissions_default, resolve));
  await new Promise((resolve) => connector.run(secure_sources_default, resolve));
  return connector;
};

// libraries/process.ts
var import_node_child_process2 = __toESM(require("node:child_process"));
var process2 = () => ({ title, command, args, proc }) => new Promise((resolve) => {
  const TITLE = `[${title}]:`;
  const child_process = import_node_child_process2.default.spawn(command, args);
  child_process.on("close", resolve);
  child_process.stdout.on("data", (data) => console.log(TITLE, data.toString("utf8")));
  child_process.stderr.on("data", (data) => console.error(TITLE, data.toString("utf8")));
  child_process.on("error", (error) => console.log(TITLE, error.message));
  if (proc) {
    proc(child_process.stdin);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  builder,
  database,
  devMode,
  encrypt,
  paths,
  process
});
//# sourceMappingURL=libraries.js.map
