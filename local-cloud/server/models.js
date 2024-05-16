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

// models/index.ts
var models_exports = {};
__export(models_exports, {
  AppsModel: () => AppsModel,
  BuilderModel: () => BuilderModel,
  DevModeModel: () => DevModeModel,
  FileSystemModel: () => FileSystemModel,
  PermissionsModel: () => PermissionsModel,
  RecycleBinModel: () => RecycleBinModel,
  SharedModel: () => SharedModel,
  SourcesModel: () => SourcesModel,
  UsersModel: () => UsersModel
});
module.exports = __toCommonJS(models_exports);

// node_modules/px.io/injectables/models.js
var libsPath = "./libs.js";
var libraries = require(libsPath).libraries;
function Library(nameLib) {
  return (target, propertyKey) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        return libraries.get(nameLib);
      }
    });
  };
}

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

// models/apps.ts
var import_node_fs = __toESM(require("node:fs"));
var import_node_path = __toESM(require("node:path"));
var import_uuid = require("uuid");
var import_unzipper = __toESM(require("unzipper"));
var AppsModel = class {
  constructor() {
    this.isJSON = (text) => /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""));
    this.parse = (results) => results.map((result) => ({
      package_name: result.package_name,
      title: result.title,
      description: result.description,
      author: result.author,
      extensions: (result.extensions || "").split("|")
    }));
  }
  getAppsByUID(uid) {
    return new Promise((resolve) => this.database.all(
      "SELECT apps.package_name, apps.title, apps.description, apps.author FROM users_to_apps INNER JOIN apps ON users_to_apps.package_name = apps.package_name WHERE users_to_apps.uid = ?;",
      [uid],
      (error, rows) => error ? resolve([]) : resolve(this.parse(rows))
    ));
  }
  getApps() {
    return new Promise((resolve) => this.database.all(
      "SELECT * FROM apps",
      (error, rows) => error ? resolve([]) : resolve(this.parse(rows))
    ));
  }
  getAppByPackageName(package_name) {
    return new Promise((resolve) => this.database.all(
      "SELECT * FROM apps WHERE package_name = ?",
      [package_name],
      (error, rows) => error ? resolve(null) : resolve(rows[0])
    ));
  }
  async install(package_name, data) {
    const tempDir = import_node_path.default.join(this.paths.apps, "temp", (0, import_uuid.v4)());
    import_node_fs.default.mkdirSync(tempDir, { recursive: true });
    await import_unzipper.default.Open.buffer(data).then((d) => d.extract({ path: tempDir }));
    const manifestPath = import_node_path.default.join(tempDir, "manifest.json");
    if (!import_node_fs.default.existsSync(manifestPath)) {
      import_node_fs.default.rmSync(tempDir, { recursive: true, force: true });
      return {
        code: "manifest-not-exist",
        message: "El paquete de instalaci\xF3n no cuenta con un archivo manifest.json"
      };
    }
    let manifestContent = import_node_fs.default.readFileSync(manifestPath, "utf-8");
    if (this.isJSON(manifestContent)) {
      manifestContent = JSON.parse(manifestContent);
    } else {
      import_node_fs.default.rmSync(tempDir, { recursive: true, force: true });
      return {
        code: "manifest-invalid",
        message: "El archivo manifest.json no es v\xE1lido."
      };
    }
    const manifestKeys = Object.keys(manifestContent);
    if (!manifestKeys.includes("title")) {
      import_node_fs.default.rmSync(tempDir, { recursive: true, force: true });
      return {
        code: "manifest-title-required",
        message: "El archivo manifest.json no contiene un t\xEDtulo."
      };
    }
    if (!manifestKeys.includes("author")) {
      import_node_fs.default.rmSync(tempDir, { recursive: true, force: true });
      return {
        code: "manifest-author-required",
        message: "El archivo manifest.json no contiene un autor."
      };
    }
    const { title, description = "Sin descripci\xF3n", author, permissions: permissionList = {}, sources = [], extensions = [] } = manifestContent;
    const permissions = Object.keys(permissionList).map((api) => ({
      api,
      justification: permissionList[api]
    }));
    await new Promise((resolve) => this.database.run(
      "INSERT INTO apps (package_name, title, description, author, extensions) VALUES (?, ?, ?, ?, ?);",
      [package_name, title, description, author, extensions.join("|")],
      resolve
    ));
    for (const permission of permissions) {
      await new Promise((resolve) => this.database.run(
        "INSERT INTO permissions (package_name, api, justification, active) VALUES (?, ?, ?, ?)",
        [package_name, permission.api, permission.justification || "Sin justificaci\xF3n.", true],
        resolve
      ));
    }
    for (const source of sources) {
      await new Promise((resolve) => this.database.run(
        "INSERT INTO secure_sources (package_name, type, source, justification, active) VALUES (?, ?, ?, ?, ?)",
        [package_name, source.type, source.source, source.justification || "Sin justificaci\xF3n.", true],
        resolve
      ));
    }
    import_node_fs.default.cpSync(import_node_path.default.join(tempDir, "code"), this.paths.getAppPublic(package_name), { recursive: true });
    import_node_fs.default.mkdirSync(this.paths.getAppDatabases(package_name), { recursive: true });
    import_node_fs.default.rmSync(tempDir, { recursive: true, force: true });
    return true;
  }
  async uninstall(package_name) {
    await new Promise((resolve) => this.database.run(
      "DELETE FROM secure_sources WHERE package_name = ?",
      [package_name],
      resolve
    ));
    await new Promise((resolve) => this.database.run(
      "DELETE FROM permissions WHERE package_name = ?",
      [package_name],
      resolve
    ));
    await new Promise((resolve) => this.database.run(
      "DELETE FROM users_to_apps WHERE package_name = ?",
      [package_name],
      resolve
    ));
    await new Promise((resolve) => this.database.run(
      "DELETE FROM apps WHERE package_name = ?",
      [package_name],
      resolve
    ));
    const appPath = this.paths.getApp(package_name);
    import_node_fs.default.rmSync(appPath, { recursive: true, force: true });
  }
};
__decorateClass([
  Library("database")
], AppsModel.prototype, "database", 2);
__decorateClass([
  Library("paths")
], AppsModel.prototype, "paths", 2);

// models/builder.ts
var BuilderModel = class {
  get privateAPIList() {
    return this.builder.privateAPIList;
  }
  get dashAPIList() {
    return this.builder.dashAPIList;
  }
  get publicAPIList() {
    return this.builder.publicAPIList;
  }
  build(opts) {
    if (opts) {
      return this.builder.build(opts);
    }
    return this.builder.build({ token: "", key: "" });
  }
};
__decorateClass([
  Library("builder")
], BuilderModel.prototype, "builder", 2);

// models/dev-mode.ts
var import_node_fs2 = __toESM(require("node:fs"));
var import_uuid2 = require("uuid");
var DevModeModel = class {
  getUser() {
    const PASSWD_CONTENT = import_node_fs2.default.readFileSync(this.paths.passwd, "utf8");
    const PASSWD_LINES = PASSWD_CONTENT.split("\n").filter((line) => line !== "");
    const USER_LIST = PASSWD_LINES.map((line) => line.split(":"));
    const result = USER_LIST.find((us) => us[0] === this.devMode.config.user);
    if (result) {
      const name = result[0];
      const [full_name = "", email = "", phone = ""] = result[4].split(",");
      return {
        uid: Number(result[2]),
        name,
        full_name,
        email,
        phone
      };
    }
  }
  async getApps(uid) {
    const apps = await new Promise((resolve) => this.database.all(
      "SELECT apps.package_name, apps.title, apps.description, apps.author FROM users_to_apps INNER JOIN apps ON users_to_apps.package_name = apps.package_name WHERE users_to_apps.uid = ?;",
      [uid || ""],
      (error, rows) => error ? resolve([]) : resolve(rows.map((result) => ({
        package_name: result.package_name,
        title: result.title,
        description: result.description,
        author: result.author,
        extensions: (result.extensions || "").split("|")
      })))
    ));
    const appList = {};
    for (const app of apps) {
      const sessionApp = {
        token: (0, import_uuid2.v4)(),
        ...app,
        secureSources: [],
        permissions: []
      };
      appList[app.package_name] = sessionApp;
    }
    return appList;
  }
};
__decorateClass([
  Library("devMode")
], DevModeModel.prototype, "devMode", 2);
__decorateClass([
  Library("database")
], DevModeModel.prototype, "database", 2);
__decorateClass([
  Library("paths")
], DevModeModel.prototype, "paths", 2);

// models/fs.ts
var import_node_fs3 = __toESM(require("node:fs"));
var import_node_path2 = __toESM(require("node:path"));
var import_node_child_process = __toESM(require("node:child_process"));
var FileSystemModel = class {
  resolveFileOrDirectory(result) {
    if (typeof result === "boolean") {
      return false;
    }
    const stat = import_node_fs3.default.statSync(result);
    if (stat.isDirectory()) {
      const items = import_node_fs3.default.readdirSync(result);
      return items.map((item) => {
        const stat2 = import_node_fs3.default.statSync(import_node_path2.default.join(result, item));
        return {
          name: item,
          size: stat2.size,
          lastModification: stat2.mtime,
          creationDate: stat2.birthtime,
          isFile: !stat2.isDirectory()
        };
      });
    }
    return {
      name: import_node_path2.default.basename(result),
      size: stat.size,
      lastModification: stat.mtime,
      creationDate: stat.birthtime,
      isFile: !stat.isDirectory()
    };
  }
  lsSharedDirectory(path3) {
    const sharedPath = this.paths.resolveSharedPath({ segments: path3 });
    return this.resolveFileOrDirectory(sharedPath);
  }
  lsUserDirectory(name, path3) {
    const userPath = this.paths.resolveUserPath({ segments: path3, name });
    return this.resolveFileOrDirectory(userPath);
  }
  resolveSharedFile(pathFile) {
    const result = this.paths.resolveSharedPath({ segments: pathFile });
    if (typeof result === "boolean") {
      return false;
    }
    const stat = import_node_fs3.default.statSync(result);
    if (stat.isDirectory()) {
      return false;
    }
    return result;
  }
  resolveUserFile(name, pathFile) {
    const result = this.paths.resolveUserPath({ name, segments: pathFile });
    if (typeof result === "boolean") {
      return false;
    }
    const stat = import_node_fs3.default.statSync(result);
    if (stat.isDirectory()) {
      return false;
    }
    return result;
  }
  writeToShared(segments, data) {
    const filePath = this.paths.resolveSharedPath({ segments, verify: false });
    import_node_fs3.default.writeFileSync(filePath, data, { encoding: "utf-8" });
    import_node_child_process.default.execSync(`chown :lc ${filePath}`);
  }
  writeToUser(name, segments, data) {
    const filePath = this.paths.resolveUserPath({ name, segments, verify: false });
    import_node_fs3.default.writeFileSync(filePath, data, { encoding: "utf-8" });
    import_node_child_process.default.execSync(`chown ${name} ${filePath}`);
  }
  mkdirToShared(segments) {
    const dirPath = this.paths.resolveSharedPath({ segments, verify: false });
    if (!import_node_fs3.default.existsSync(dirPath)) {
      import_node_fs3.default.mkdirSync(dirPath, { recursive: true });
      import_node_child_process.default.execSync(`chown -R lc ${dirPath}`);
    }
  }
  mkdirToUser(name, segments) {
    const dirPath = this.paths.resolveUserPath({ name, segments, verify: false });
    if (!import_node_fs3.default.existsSync(dirPath)) {
      import_node_fs3.default.mkdirSync(dirPath, { recursive: true });
      import_node_child_process.default.execSync(`chown ${name} ${dirPath}`);
    }
  }
  rmToShared(segments) {
    const dirPath = this.paths.resolveSharedPath({ segments });
    if (typeof dirPath === "string") {
      import_node_fs3.default.rmSync(dirPath, { force: true, recursive: true });
    }
  }
  rmToUser(name, segments) {
    const dirPath = this.paths.resolveUserPath({ name, segments });
    if (typeof dirPath === "string") {
      import_node_fs3.default.rmSync(dirPath, { force: true, recursive: true });
    }
  }
  resolvePath(name, pth, verify) {
    const segments = [...pth];
    const base = segments.shift();
    let result = "";
    if (base === "shared") {
      result = this.paths.resolveSharedPath({ segments, verify });
    } else {
      result = this.paths.resolveUserPath({ name, segments, verify });
    }
    return result;
  }
  copy(name, origin, dest, move = false) {
    const originPath = this.resolvePath(name, origin, true);
    if (typeof originPath === "boolean") {
      return;
    }
    const newDest = [...dest, origin[origin.length - 1]];
    let destPath = this.resolvePath(name, newDest, false);
    const statOrigin = import_node_fs3.default.statSync(originPath);
    const isFile = statOrigin.isFile();
    let dp = "";
    if (isFile) {
      while (import_node_fs3.default.existsSync(destPath)) {
        const segments = destPath.split(".");
        const ext = segments.pop();
        destPath = `${segments.join(".")}-copia.${ext}`;
      }
      import_node_fs3.default.copyFileSync(originPath, destPath);
      dp = destPath;
    } else {
      while (import_node_fs3.default.existsSync(destPath)) {
        destPath += "-copia";
      }
      import_node_fs3.default.cpSync(originPath, destPath, { recursive: true });
      dp = destPath;
    }
    if (dp.split(this.paths.shared).length === 1) {
      import_node_child_process.default.execSync(`chown ${name} ${dp}`);
    } else {
      import_node_child_process.default.execSync(`chown :lc ${dp}`);
    }
    if (move) {
      import_node_fs3.default.rmSync(originPath, { recursive: true, force: true });
    }
  }
  rename(uuid, path3, newName) {
    const oldPath = this.resolvePath(uuid, path3, true);
    if (typeof oldPath === "boolean") {
      return;
    }
    const segments = [...path3];
    segments.pop();
    let newPath = this.resolvePath(uuid, [...segments, newName], true);
    if (typeof newPath === "string") {
      return;
    }
    newPath = this.resolvePath(uuid, [...segments, newName], false);
    import_node_fs3.default.renameSync(oldPath, newPath);
  }
};
__decorateClass([
  Library("paths")
], FileSystemModel.prototype, "paths", 2);

// models/shared.ts
var SharedModel = class {
  async find(query) {
    let strQuery = "SELECT * FROM shared";
    const opts = [];
    if (query) {
      const where = [];
      const entries = Object.entries(query);
      for (let [key, value] of entries) {
        if (key === "path") {
          opts.push(value.join("|"));
        } else {
          opts.push(value);
        }
        where.push(`${key} = ?`);
      }
      strQuery += ` WHERE ${where.join(" AND ")};`;
    }
    const results = await new Promise((resolve) => this.database.all(
      strQuery,
      opts,
      (error, rows) => error ? resolve([]) : resolve(rows)
    ));
    return results.map((item) => ({
      id: item.id,
      uid: item.uid,
      path: item.path.split("|")
    }));
  }
  create(shared) {
    return new Promise((resolve) => this.database.run(
      "INSERT INTO shared ( id, uid, path ) VALUES (?, ?, ?)",
      [shared.id, shared.uid, shared.path.join("|")],
      resolve
    ));
  }
  delete(id) {
    return new Promise((resolve) => this.database.run(
      "DELETE FROM shared WHERE id = ?",
      [id],
      resolve
    ));
  }
};
__decorateClass([
  Library("database")
], SharedModel.prototype, "database", 2);

// models/permissions.ts
var PermissionsModel = class {
  async find(query) {
    let strQuery = "SELECT * FROM permissions";
    const values = [];
    if (query) {
      const where = [];
      const entries = Object.entries(query);
      for (const [key, value] of entries) {
        where.push(`${key} = ?`);
        values.push(value);
      }
      strQuery += ` WHERE ${where.join(" AND ")}`;
    }
    const results = await new Promise((resolve) => this.database.all(
      strQuery,
      values,
      (error, rows) => error ? resolve([]) : resolve(rows)
    ));
    return results.map((result) => ({
      id: result.id_permission,
      package_name: result.package_name,
      api: result.api,
      justification: result.justification,
      active: result.active
    }));
  }
  async setActive(id, active) {
    await new Promise((resolve) => this.database.run(
      "UPDATE permissions set active = ? WHERE id_permission = ?",
      [active, id],
      resolve
    ));
  }
};
__decorateClass([
  Library("database")
], PermissionsModel.prototype, "database", 2);

// models/recycle-bin.ts
var import_node_fs4 = __toESM(require("node:fs"));
var import_uuid3 = require("uuid");
var RecycleBinModel = class {
  async moveToRecycleBin(user, strPath, path3) {
    const id = (0, import_uuid3.v4)();
    const newPath = this.paths.getRecycleBinItem(user.name, id);
    import_node_fs4.default.cpSync(strPath, newPath, { recursive: true });
    import_node_fs4.default.rmSync(strPath, { recursive: true, force: true });
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    await new Promise((resolve) => this.database.run(
      "INSERT INTO recycle_bin (id, uid, path, date) VALUES (?, ?, ?, ?)",
      [id, user.uid, path3.join("|"), `${year.toString()}/${month < 10 ? `0${month.toString()}` : month.toString()}/${day < 10 ? `0${day.toString()}` : day.toString()} ${hours < 10 ? `0${hours.toString()}` : hours.toString()}:${minutes < 10 ? `0${minutes.toString()}` : minutes.toString()}`],
      resolve
    ));
  }
  async findByUID(uid) {
    const results = await new Promise((resolve) => this.database.all(
      "SELECT * FROM recycle_bin WHERE uid = ?",
      [uid],
      (error, rows) => error ? resolve([]) : resolve(rows)
    ));
    return results.map((item) => ({
      id: item.id,
      uid: item.uid,
      path: item.path.split("|"),
      date: item.date
    }));
  }
  async findByID(id) {
    const item = await new Promise((resolve) => this.database.get(
      "SELECT * FROM recycle_bin WHERE id = ?",
      [id],
      (error, rows) => error ? resolve(void 0) : resolve(rows)
    ));
    let result = void 0;
    if (item) {
      result = {
        id: item.id,
        uuid: item.uid,
        path: item.path.split("|"),
        date: item.date
      };
    }
    return result;
  }
  async restore(name, id, path3) {
    let newPath = path3;
    const oldPath = this.paths.getRecycleBinItem(name, id);
    const stat = import_node_fs4.default.statSync(oldPath);
    const isFile = stat.isFile();
    if (isFile) {
      while (import_node_fs4.default.existsSync(newPath)) {
        const segments = newPath.split(".");
        const ext = segments.pop();
        newPath = `${segments.join(".")}-restaurado.${ext}`;
      }
    } else {
      while (import_node_fs4.default.existsSync(newPath)) {
        newPath += "-restaurado";
      }
    }
    import_node_fs4.default.cpSync(oldPath, newPath, { recursive: true });
    import_node_fs4.default.rmSync(oldPath, { recursive: true, force: true });
    await new Promise((resolve) => this.database.run(
      "DELETE FROM recycle_bin WHERE id = ?",
      [id],
      resolve
    ));
  }
  deleteFromDB(uid, id) {
    let strQuery = "DELETE FROM recycle_bin WHERE uid = ?";
    const opts = [uid];
    if (id) {
      strQuery += " AND id = ?";
      opts.push(id);
    }
    return new Promise((resolve) => this.database.run(
      strQuery,
      opts,
      resolve
    ));
  }
  async delete(user, id) {
    const path3 = this.paths.getRecycleBinItem(user.name, id);
    import_node_fs4.default.rmSync(path3, { recursive: true, force: true });
    await this.deleteFromDB(user.uid, id);
  }
  async clean(user) {
    const path3 = this.paths.getRecycleBin(user.name);
    import_node_fs4.default.rmSync(path3, { recursive: true, force: true });
    await this.deleteFromDB(user.uid);
  }
};
__decorateClass([
  Library("database")
], RecycleBinModel.prototype, "database", 2);
__decorateClass([
  Library("paths")
], RecycleBinModel.prototype, "paths", 2);

// models/sources.ts
var SourcesModel = class {
  async find(query) {
    let strQuery = "SELECT * FROM secure_sources";
    const values = [];
    if (query) {
      const where = [];
      const entries = Object.entries(query);
      for (const [key, value] of entries) {
        where.push(`${key} = ?`);
        values.push(value);
      }
      strQuery += ` WHERE ${where.join(" AND ")}`;
    }
    const results = await new Promise((resolve) => this.database.all(
      strQuery,
      values,
      (error, rows) => error ? resolve([]) : resolve(rows)
    ));
    return results.map((result) => ({
      id: result.id_source,
      package_name: result.package_name,
      type: result.type,
      source: result.source,
      justification: result.justification,
      active: result.active
    }));
  }
  async setActive(id, active) {
    await new Promise((resolve) => this.database.run(
      "UPDATE secure_sources set active = ? WHERE id_source = ?",
      [active ? 1 : 0, id],
      resolve
    ));
  }
};
__decorateClass([
  Library("database")
], SourcesModel.prototype, "database", 2);

// models/users.ts
var import_node_fs5 = __toESM(require("node:fs"));
var import_node_child_process2 = __toESM(require("node:child_process"));
var import_shell_quote = __toESM(require("shell-quote"));
var import_ini = __toESM(require("ini"));
var UsersModel = class {
  loadConfig(name) {
    const SMB_CONFIG = import_node_fs5.default.readFileSync(this.paths.samba, "utf8");
    const smbConfig = import_ini.default.parse(SMB_CONFIG);
    if (name) {
      return smbConfig[name];
    }
    return smbConfig;
  }
  writeConfig(config) {
    const smbStrConfig = import_ini.default.stringify(config);
    import_node_fs5.default.writeFileSync(this.paths.samba, smbStrConfig, "utf8");
    console.log(import_node_child_process2.default.execSync("/etc/init.d/smbd restart").toString("utf8"));
  }
  setConfig(name, config) {
    const smbConfig = this.loadConfig();
    smbConfig[name] = {};
    const entries = Object.entries(config);
    for (const [key, value] of entries) {
      smbConfig[name][key] = value;
    }
    this.writeConfig(smbConfig);
  }
  loadGroup() {
    const GROUP_CONTENT = import_node_fs5.default.readFileSync(this.paths.groups, "utf8");
    const GROUP_LINES = GROUP_CONTENT.split("\n").filter((line) => line !== "");
    const GROUPS = GROUP_LINES.map((line) => line.split(":")).map((line) => ({
      id: Number(line[2]),
      name: line[0],
      users: line[3].split(",")
    }));
    return GROUPS.filter((group) => group.name === "lc")[0];
  }
  loadUserList(filter = false) {
    const { users } = this.loadGroup();
    const PASSWD_CONTENT = import_node_fs5.default.readFileSync(this.paths.passwd, "utf8");
    const PASSWD_LINES = PASSWD_CONTENT.split("\n").filter((line) => line !== "");
    const USER_LIST = PASSWD_LINES.map((line) => {
      const user = line.split(":");
      const [full_name = "", email = "", phone = ""] = user[4].split(",");
      return {
        uid: Number(user[2]),
        name: user[0],
        full_name,
        email,
        phone
      };
    });
    if (filter) {
      return USER_LIST.filter((user) => users.includes(user.name));
    }
    return USER_LIST;
  }
  loadHash(name) {
    const SHADOW_CONTENT = import_node_fs5.default.readFileSync(this.paths.shadow, "utf8");
    const SHADOW_LINES = SHADOW_CONTENT.split("\n").filter((line) => line !== "");
    const [[_, hash]] = SHADOW_LINES.map((line) => line.split(":")).filter((shadow) => shadow[0] === name);
    return hash;
  }
  async createUser(user) {
    const { name, password, full_name = "", email = "", phone = "" } = user;
    const PASSWORD = this.encrypt.createHash(password);
    const cmd = `useradd -p '${PASSWORD}' -m -G lc -s /bin/bash -c ${import_shell_quote.default.quote([[full_name, email, phone].join(",")]).replace(/\\/g, "")} ${name}`;
    await new Promise((resolve) => import_node_child_process2.default.exec(cmd, () => resolve()));
    await new Promise((resolve) => {
      const child_process = import_node_child_process2.default.spawn("smbpasswd", ["-a", name]);
      child_process.on("close", resolve);
      child_process.stdin.write(`${password}
`);
      child_process.stdin.write(`${password}
`);
      child_process.stdin.end();
    });
    this.setConfig(name, {
      comment: `Directorio de ${name}`,
      path: `/home/${name}`,
      browsable: "yes",
      writable: "yes",
      "guest ok": "no",
      "valid users": name,
      "write list": name,
      "read only": "yes"
    });
  }
  getUser(name) {
    const USER_LIST = this.loadUserList(true);
    const [user] = USER_LIST.filter((user2) => user2.name === name);
    return user;
  }
  getUserByUID(uid) {
    const USER_LIST = this.loadUserList(true);
    const [user] = USER_LIST.filter((user2) => user2.uid === uid);
    return user;
  }
  getUsers() {
    const USER_LIST = this.loadUserList(true);
    return USER_LIST;
  }
  verifyPassword(name, password) {
    const hash = this.loadHash(name);
    return this.encrypt.verifyHash(password, hash);
  }
  updateUser(name, user) {
    const { full_name = "", email = "", phone = "" } = user;
    const newValue = [full_name, email, phone].join(",");
    const cmd = import_shell_quote.default.parse(
      'usermod -c "$GECOS" $USER_NAME',
      {
        GECOS: import_shell_quote.default.quote([newValue]),
        USER_NAME: name
      }
    ).join(" ");
    console.log(`(${cmd}):`, import_node_child_process2.default.execSync(cmd).toString("utf8"));
  }
  async updatePassword(name, password) {
    const PASSWORD = this.encrypt.createHash(password);
    let cmd = import_shell_quote.default.parse(
      `usermod PASSWORD $USER_NAME`,
      { USER_NAME: import_shell_quote.default.quote([name]) }
    ).join(" ").replace("PASSWORD", `-p '${PASSWORD}'`);
    console.log(`(${cmd}):`, import_node_child_process2.default.execSync(cmd).toString("utf8"));
    cmd = import_shell_quote.default.parse(
      `smbpasswd -x $USER_NAME`,
      { USER_NAME: import_shell_quote.default.quote([name]) }
    ).join(" ");
    console.log(`(${cmd}):`, import_node_child_process2.default.execSync(cmd).toString("utf8"));
    await new Promise((resolve) => {
      const child_process = import_node_child_process2.default.spawn("smbpasswd", [name]);
      child_process.on("close", resolve);
      child_process.stdin.write(`${password}
`);
      child_process.stdin.write(`${password}
`);
      child_process.stdin.end();
    });
  }
  async deleteUser(name) {
    const USER_NAME = import_shell_quote.default.quote([name]);
    await new Promise((resolve) => {
      const child_process = import_node_child_process2.default.spawn("smbpasswd", ["-x", USER_NAME]);
      child_process.stderr.on("error", (error) => console.trace(error));
      child_process.on("close", resolve);
    });
    await new Promise((resolve) => {
      const child_process = import_node_child_process2.default.spawn("pkill", ["-u", USER_NAME]);
      child_process.stderr.on("error", (error) => console.trace(error));
      child_process.on("close", resolve);
    });
    await new Promise((resolve) => {
      const child_process = import_node_child_process2.default.spawn("userdel", ["-r", USER_NAME]);
      child_process.stderr.on("error", (error) => console.trace(error));
      child_process.on("close", resolve);
    });
    const smbConfig = this.loadConfig();
    delete smbConfig[name];
    this.writeConfig(smbConfig);
  }
  async assignApp(uid, package_name) {
    await new Promise((resolve) => this.database.run(
      "INSERT INTO users_to_apps (uid, package_name) VALUES (?, ?);",
      [uid, package_name],
      resolve
    ));
  }
  async unassignApp(uid, package_name) {
    await new Promise((resolve) => this.database.run(
      "DELETE FROM users_to_apps WHERE uid = ? AND package_name = ?;",
      [uid, package_name],
      resolve
    ));
  }
};
__decorateClass([
  Library("paths")
], UsersModel.prototype, "paths", 2);
__decorateClass([
  Library("encrypt")
], UsersModel.prototype, "encrypt", 2);
__decorateClass([
  Library("database")
], UsersModel.prototype, "database", 2);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppsModel,
  BuilderModel,
  DevModeModel,
  FileSystemModel,
  PermissionsModel,
  RecycleBinModel,
  SharedModel,
  SourcesModel,
  UsersModel
});
//# sourceMappingURL=models.js.map
