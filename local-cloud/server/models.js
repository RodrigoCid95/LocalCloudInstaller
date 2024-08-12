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
  StorageModel: () => StorageModel,
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
var import_node_crypto = __toESM(require("node:crypto"));
var import_unzipper = __toESM(require("unzipper"));
var AppsModel = class {
  constructor() {
    this.isJSON = (text) => /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""));
  }
  get appsCollection() {
    return this.db.collection("apps");
  }
  get u2aCollection() {
    return this.db.collection("users_to_apps");
  }
  async getAppsByUID(uid) {
    const appList = [];
    const assignments = await this.u2aCollection.find({ uid }).toArray();
    for (const assignment of assignments) {
      const app = await this.appsCollection.findOne({ package_name: assignment.package_name });
      if (app) {
        appList.push({
          package_name: app.package_name,
          title: app.title,
          description: app.description,
          author: app.author,
          useTemplate: app.useTemplate
        });
      }
    }
    return appList;
  }
  async getApps() {
    const results = await this.appsCollection.find({}).toArray();
    return results.map(({ package_name, title, description, author, useTemplate }) => ({ package_name, title, description, author, useTemplate }));
  }
  getAppByPackageName(package_name) {
    return this.appsCollection.findOne({ package_name });
  }
  async install(package_name, data, update = false) {
    if (update) {
      await this.uninstall(package_name, true);
    }
    const tempDir = import_node_path.default.join(this.paths.apps, "temp", import_node_crypto.default.randomUUID());
    import_node_fs.default.mkdirSync(tempDir, { recursive: true });
    await import_unzipper.default.Open.buffer(data).then((d) => d.extract({ path: tempDir }));
    let useTemplate = false;
    let template = '{% layout "layout.liquid" %}';
    const headPath = import_node_path.default.join(tempDir, "head.html");
    if (import_node_fs.default.existsSync(headPath)) {
      useTemplate = true;
      const headContent = import_node_fs.default.readFileSync(headPath, "utf8");
      template += `{% block head %}${headContent}{% endblock %}`;
    }
    const bodyPath = import_node_path.default.join(tempDir, "body.html");
    if (import_node_fs.default.existsSync(bodyPath)) {
      useTemplate = true;
      const bodyContent = import_node_fs.default.readFileSync(bodyPath, "utf8");
      template += `{% block body %}${bodyContent}{% endblock %}`;
    }
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
    const { title, description = "Sin descripci\xF3n", author, permissions: permissionList = {}, sources = {}, extensions = [], "use-storage": useStorage = false } = manifestContent;
    const permissions = Object.keys(permissionList).map((api) => ({
      api,
      justification: permissionList[api]
    }));
    await this.appsCollection.insertOne({
      package_name,
      title,
      description,
      author,
      extensions: extensions.join("|"),
      useStorage,
      useTemplate
    });
    for (const permission of permissions) {
      await this.db.collection("permissions").insertOne({
        package_name,
        api: permission.api,
        justification: permission.justification || "Sin justificaci\xF3n.",
        active: true
      });
    }
    for (const [name, srcs] of Object.entries(sources)) {
      if (["image", "media", "object", "script", "style", "worker", "font", "connect"].includes(name)) {
        for (const src of srcs) {
          await this.db.collection("secure_sources").insertOne({
            package_name,
            type: name,
            source: src.source,
            justification: src.justification || "Sin justificaci\xF3n.",
            active: true
          });
        }
      }
    }
    import_node_fs.default.cpSync(import_node_path.default.join(tempDir, "code"), this.paths.getApp(package_name), { recursive: true });
    const storagePath = this.paths.getAppGlobalStorage(package_name);
    if (useStorage) {
      import_node_fs.default.mkdirSync(storagePath, { recursive: true });
    } else {
      if (import_node_fs.default.existsSync(storagePath)) {
        import_node_fs.default.rmSync(storagePath, { recursive: true });
      }
    }
    const templatePath = import_node_path.default.join(this.paths.appsTemplates, `${package_name.replace(/\./g, "-")}.liquid`);
    if (useTemplate) {
      if (!import_node_fs.default.existsSync(this.paths.appsTemplates)) {
        import_node_fs.default.mkdirSync(this.paths.appsTemplates, { recursive: true });
      }
      import_node_fs.default.writeFileSync(templatePath, template, "utf8");
    } else {
      if (import_node_fs.default.existsSync(templatePath)) {
        import_node_fs.default.rmSync(templatePath, { recursive: true });
      }
    }
    import_node_fs.default.rmSync(tempDir, { recursive: true, force: true });
    return true;
  }
  async uninstall(package_name, skipAssignments = false) {
    await this.db.collection("secure_sources").deleteMany({ package_name });
    await this.db.collection("permissions").deleteMany({ package_name });
    if (!skipAssignments) {
      await this.u2aCollection.deleteMany({ package_name });
    }
    await this.appsCollection.deleteMany({ package_name });
    if (!skipAssignments) {
      const appStorage = this.paths.getAppStorage(package_name);
      if (import_node_fs.default.existsSync(appStorage)) {
        import_node_fs.default.rmSync(appStorage, { force: true, recursive: true });
      }
    }
    const appPath = this.paths.getApp(package_name);
    import_node_fs.default.rmSync(appPath, { recursive: true, force: true });
    const templatePath = import_node_path.default.join(this.paths.appsTemplates, `${package_name.replace(/\./g, "-")}.liquid`);
    if (import_node_fs.default.existsSync(templatePath)) {
      import_node_fs.default.rmSync(templatePath, { recursive: true, force: true });
    }
  }
};
__decorateClass([
  Library("mongo")
], AppsModel.prototype, "db", 2);
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
var import_node_crypto2 = __toESM(require("node:crypto"));
var DevModeModel = class {
  getUser() {
    const PASSWD_CONTENT = import_node_fs2.default.readFileSync(this.paths.passwd, "utf8");
    const PASSWD_LINES = PASSWD_CONTENT.split("\n").filter((line) => line !== "");
    const USER_LIST = PASSWD_LINES.map((line) => line.split(":"));
    const result = USER_LIST.find((us) => us[0] === this.devMode.user);
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
    const apps = await this.db.collection("apps").find({ uid }).toArray().then((results) => results.map(({ package_name, title, description, author, useTemplate }) => ({ package_name, title, description, author, useTemplate })));
    const appList = {};
    for (const app of apps) {
      const sessionApp = {
        token: import_node_crypto2.default.randomUUID(),
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
  Library("mongo")
], DevModeModel.prototype, "db", 2);
__decorateClass([
  Library("paths")
], DevModeModel.prototype, "paths", 2);

// models/fs.ts
var import_node_fs3 = __toESM(require("node:fs"));
var import_node_path2 = __toESM(require("node:path"));
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
  lsSharedDirectory(path5) {
    const sharedPath = this.paths.resolveSharedPath({ segments: path5 });
    return this.resolveFileOrDirectory(sharedPath);
  }
  lsUserDirectory(name, path5) {
    const userPath = this.paths.resolveUserPath({ segments: path5, name });
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
  async writeToShared(segments, data) {
    const filePath = this.paths.resolveSharedPath({ segments, verify: false });
    import_node_fs3.default.writeFileSync(filePath, data, { encoding: "utf-8" });
    await this.run({
      title: "Set Permission To Shared Item",
      command: "chown",
      args: [":lc", filePath]
    });
  }
  async writeToUser(name, segments, data) {
    const filePath = this.paths.resolveUserPath({ name, segments, verify: false });
    import_node_fs3.default.writeFileSync(filePath, data, { encoding: "utf-8" });
    await this.run({
      title: "Set Owner To User",
      command: "chown",
      args: [name, filePath]
    });
  }
  async mkdirToShared(segments) {
    const dirPath = this.paths.resolveSharedPath({ segments, verify: false });
    if (!import_node_fs3.default.existsSync(dirPath)) {
      import_node_fs3.default.mkdirSync(dirPath, { recursive: true });
      await this.run({
        title: "Set Permission To Shared Dir",
        command: "chown",
        args: ["-R", "lc", dirPath]
      });
    }
  }
  async mkdirToUser(name, segments) {
    const dirPath = this.paths.resolveUserPath({ name, segments, verify: false });
    if (!import_node_fs3.default.existsSync(dirPath)) {
      import_node_fs3.default.mkdirSync(dirPath, { recursive: true });
      await this.run({
        title: "Set Permission To User Dir",
        command: "chown",
        args: [name, dirPath]
      });
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
  async copy(name, origin, dest, move = false) {
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
        destPath += " - copia";
      }
      import_node_fs3.default.cpSync(originPath, destPath, { recursive: true });
      dp = destPath;
    }
    if (dp.split(this.paths.shared).length === 1) {
      await this.run({
        title: "Set Permission To User Dir",
        command: "chown",
        args: [name, dp]
      });
    } else {
      await this.run({
        title: "Set Permission To Shared Item",
        command: "chown",
        args: [":lc", dp]
      });
    }
    if (move) {
      import_node_fs3.default.rmSync(originPath, { recursive: true, force: true });
    }
  }
  rename(uuid, path5, newName) {
    const oldPath = this.resolvePath(uuid, path5, true);
    if (typeof oldPath === "boolean") {
      return;
    }
    const segments = [...path5];
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
__decorateClass([
  Library("process")
], FileSystemModel.prototype, "run", 2);

// models/shared.ts
var import_mongodb = require("mongodb");
var SharedModel = class {
  get collection() {
    return this.db.collection("shared");
  }
  async find(query = {}) {
    const filter = {};
    const keys = Object.keys(query);
    for (const key of keys) {
      if (key === "id") {
        filter["_id"] = new import_mongodb.ObjectId(query[key]);
      } else {
        filter[key] = query[key];
      }
    }
    const results = await this.collection.find(filter).toArray();
    return results.map((item) => ({
      id: item._id.toString(),
      uid: item.uid,
      path: item.path
    }));
  }
  async create(shared) {
    await this.collection.insertOne(shared);
  }
  async delete(id) {
    await this.collection.deleteOne({ _id: new import_mongodb.ObjectId(id) });
  }
};
__decorateClass([
  Library("mongo")
], SharedModel.prototype, "db", 2);

// models/permissions.ts
var import_mongodb2 = require("mongodb");
var PermissionsModel = class {
  get collection() {
    return this.db.collection("permissions");
  }
  async find(query = {}) {
    return this.collection.find(query).toArray().then((results) => results.map(({ _id, package_name, api, justification, active }) => ({ id: _id.toString(), package_name, api, justification, active })));
  }
  async setActive(id, active) {
    await this.collection.updateOne({ _id: new import_mongodb2.ObjectId(id) }, { $set: { active } });
  }
};
__decorateClass([
  Library("mongo")
], PermissionsModel.prototype, "db", 2);

// models/recycle-bin.ts
var import_mongodb3 = require("mongodb");
var import_node_fs4 = __toESM(require("node:fs"));
var RecycleBinModel = class {
  get collection() {
    return this.db.collection("recycle_bin");
  }
  async moveToRecycleBin(user, strPath, path5) {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const res = await this.collection.insertOne({
      uid: user.uid,
      path: path5,
      date: `${year.toString()}/${month < 10 ? `0${month.toString()}` : month.toString()}/${day < 10 ? `0${day.toString()}` : day.toString()} ${hours < 10 ? `0${hours.toString()}` : hours.toString()}:${minutes < 10 ? `0${minutes.toString()}` : minutes.toString()}`
    });
    const id = res.insertedId.toString();
    const newPath = this.paths.getRecycleBinItem(user.name, id);
    import_node_fs4.default.cpSync(strPath, newPath, { recursive: true });
    import_node_fs4.default.rmSync(strPath, { recursive: true, force: true });
  }
  async findByUID(uid) {
    const results = await this.collection.find({ uid }).toArray();
    return results.map((item) => ({
      id: item._id.toString(),
      uid: item.uid,
      path: item.path,
      date: item.date
    }));
  }
  async findByID(id) {
    const result = await this.collection.findOne({ _id: new import_mongodb3.ObjectId(id) });
    if (result) {
      return {
        id: result._id.toString(),
        uid: result.uid,
        path: result.path,
        date: result.date
      };
    }
    return null;
  }
  async restore(name, id, path5) {
    let newPath = path5;
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
    await this.collection.deleteOne({ _id: new import_mongodb3.ObjectId(id) });
  }
  async deleteFromDB(uid, id) {
    const query = { uid };
    if (id) {
      query["_id"] = new import_mongodb3.ObjectId(id);
    }
    await this.collection.deleteMany(query);
  }
  async delete(user, id) {
    const path5 = this.paths.getRecycleBinItem(user.name, id);
    import_node_fs4.default.rmSync(path5, { recursive: true, force: true });
    await this.deleteFromDB(user.uid, id);
  }
  async clean(user) {
    const path5 = this.paths.getRecycleBin(user.name);
    import_node_fs4.default.rmSync(path5, { recursive: true, force: true });
    await this.deleteFromDB(user.uid);
  }
};
__decorateClass([
  Library("paths")
], RecycleBinModel.prototype, "paths", 2);
__decorateClass([
  Library("mongo")
], RecycleBinModel.prototype, "db", 2);

// models/sources.ts
var import_mongodb4 = require("mongodb");
var SourcesModel = class {
  get collection() {
    return this.db.collection("secure_sources");
  }
  async find(query = {}) {
    const filter = {};
    const keys = Object.keys(query);
    for (const key of keys) {
      if (key === "id") {
        filter["_id"] = new import_mongodb4.ObjectId(query[key]);
      } else {
        filter[key] = query[key];
      }
    }
    const results = await this.collection.find(filter).toArray();
    return results.map((result) => ({
      id: result._id.toString(),
      package_name: result.package_name,
      type: result.type,
      source: result.source,
      justification: result.justification,
      active: result.active
    }));
  }
  async setActive(id, active) {
    await this.collection.updateOne({ _id: new import_mongodb4.ObjectId(id) }, { $set: { active } });
  }
};
__decorateClass([
  Library("mongo")
], SourcesModel.prototype, "db", 2);

// models/storages.ts
var import_node_fs5 = __toESM(require("node:fs"));
var import_node_path3 = __toESM(require("node:path"));
var StorageModel = class {
  resolveTempGlobalItem(item) {
    const path5 = this.paths.getAppGlobalStorageItem({ packageName: "app-temp", item });
    return path5;
  }
  resolveTempUserItem(item) {
    const path5 = this.paths.getAppUserStorageItem({ item, packageName: "app-temp", user: "user-temp" });
    return path5;
  }
  resolveGlobalItem(packageName, item) {
    const path5 = this.paths.getAppGlobalStorageItem({ packageName, item });
    if (import_node_fs5.default.existsSync(path5)) {
      return path5;
    }
  }
  resolveUserItem(packageName, name, item) {
    const path5 = this.paths.getAppUserStorageItem({ packageName, user: name, item });
    if (import_node_fs5.default.existsSync(path5)) {
      return path5;
    }
  }
  loadStorage(path5) {
    if (import_node_fs5.default.existsSync(path5)) {
      let contentStorage = import_node_fs5.default.readFileSync(path5, "utf8") || "{}";
      contentStorage = JSON.parse(contentStorage);
      return contentStorage;
    }
    return null;
  }
  writeContent(pathStorage, content) {
    const dirName = import_node_path3.default.dirname(pathStorage);
    if (!import_node_fs5.default.existsSync(dirName)) {
      import_node_fs5.default.mkdirSync(dirName, { recursive: true });
    }
    let contentStorage = "null";
    if (content) {
      contentStorage = JSON.stringify(content);
    }
    import_node_fs5.default.writeFileSync(pathStorage, contentStorage, "utf8");
  }
};
__decorateClass([
  Library("paths")
], StorageModel.prototype, "paths", 2);

// models/users.ts
var import_node_fs6 = __toESM(require("node:fs"));
var import_node_path4 = __toESM(require("node:path"));
var import_ini = __toESM(require("ini"));
var UsersModel = class {
  get u2aCollection() {
    return this.db.collection("users_to_apps");
  }
  loadConfig(name) {
    const SMB_CONFIG = import_node_fs6.default.readFileSync(this.paths.samba, "utf8");
    const smbConfig = import_ini.default.parse(SMB_CONFIG);
    if (name) {
      return smbConfig[name];
    }
    return smbConfig;
  }
  async writeConfig(config) {
    const smbStrConfig = import_ini.default.stringify(config);
    import_node_fs6.default.writeFileSync(this.paths.samba, smbStrConfig, "utf8");
    await this.run({
      title: "Restart Samba",
      command: "/etc/init.d/smbd",
      args: ["restart"]
    });
  }
  async setConfig(name, config) {
    const smbConfig = this.loadConfig();
    smbConfig[name] = {};
    const entries = Object.entries(config);
    for (const [key, value] of entries) {
      smbConfig[name][key] = value;
    }
    await this.writeConfig(smbConfig);
  }
  loadGroup() {
    const GROUP_CONTENT = import_node_fs6.default.readFileSync(this.paths.groups, "utf8");
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
    const PASSWD_CONTENT = import_node_fs6.default.readFileSync(this.paths.passwd, "utf8");
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
    const SHADOW_CONTENT = import_node_fs6.default.readFileSync(this.paths.shadow, "utf8");
    const SHADOW_LINES = SHADOW_CONTENT.split("\n").filter((line) => line !== "");
    const [[_, hash]] = SHADOW_LINES.map((line) => line.split(":")).filter((shadow) => shadow[0] === name);
    return hash;
  }
  async createUser(user) {
    const { name, password, full_name = "", email = "", phone = "" } = user;
    console.log(`---------------------------- Create User: ${name} ----------------------------`);
    const PASSWORD = this.encrypt.createHash(password);
    await this.run({
      title: "Create User",
      command: "/usr/sbin/useradd",
      args: ["-p", PASSWORD, "-m", "-G", "lc", "-s", "/bin/bash", "-c", [full_name, email, phone].join(","), name]
    });
    await this.run({
      title: "Set New User In Samba",
      command: "smbpasswd",
      args: ["-a", name],
      proc(stdin) {
        stdin.write(`${password}
`);
        stdin.write(`${password}
`);
        stdin.end();
      }
    });
    await this.setConfig(name, {
      comment: `Directorio de ${name}`,
      path: `/home/${name}`,
      browsable: "yes",
      writable: "yes",
      "guest ok": "no",
      "valid users": name,
      "write list": name,
      "read only": "yes"
    });
    console.log("------------------------------ End Create User ----------------------------------");
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
  async updateUser(name, user) {
    const { full_name = "", email = "", phone = "" } = user;
    await this.run({
      title: `Update User ${name}`,
      command: "/usr/sbin/usermod",
      args: ["-c", [full_name, email, phone].join(","), name]
    });
  }
  async updatePassword(name, password) {
    console.log(`----------------------------Update password: ${name}----------------------------`);
    await this.run({
      title: `Update Password To User ${name}`,
      command: "passwd",
      args: [name],
      proc(stdin) {
        stdin.write(`${password}
`);
        stdin.write(`${password}
`);
        stdin.end();
      }
    });
    await this.run({
      title: `Delete ${name} In Samba`,
      command: "smbpasswd",
      args: ["-x", name]
    });
    await this.run({
      title: `Set User ${name} In Samba`,
      command: "smbpasswd",
      args: ["-a", name],
      proc(stdin) {
        stdin.write(`${password}
`);
        stdin.write(`${password}
`);
        stdin.end();
      }
    });
    console.log("----------------------------End update password --------------------------------");
  }
  async deleteUser(name) {
    console.log(`---------------------------- Delete User: ${name} ----------------------------`);
    await this.run({
      title: `Delete User ${name} In Samba`,
      command: "smbpasswd",
      args: ["-x", name]
    });
    await this.run({
      title: `Kill proccess Of ${name}`,
      command: "pkill",
      args: ["-u", name]
    });
    await this.run({
      title: `Delete User ${name}`,
      command: "/usr/sbin/userdel",
      args: ["-r", name]
    });
    const smbConfig = this.loadConfig();
    delete smbConfig[name];
    await this.writeConfig(smbConfig);
    const items = import_node_fs6.default.readdirSync(this.paths.storages);
    for (const item of items) {
      const userStorage = import_node_path4.default.join(item, name);
      if (import_node_fs6.default.existsSync(userStorage)) {
        import_node_fs6.default.rmSync(userStorage, { recursive: true, force: true });
      }
    }
    console.log("------------------------------ End Delete User ----------------------------------");
  }
  async assignApp(uid, package_name) {
    await this.u2aCollection.insertOne({ uid, package_name });
  }
  async unassignApp(uid, package_name) {
    await this.u2aCollection.deleteMany({ uid, package_name });
  }
  getUserConfig(name) {
    const userHomePath = import_node_path4.default.join(this.paths.getUser(name), ".lc");
    if (import_node_fs6.default.existsSync(userHomePath)) {
      const configContent = import_node_fs6.default.readFileSync(userHomePath, "utf8");
      return JSON.parse(configContent || "{}");
    }
    return {};
  }
  setUserConfig(name, config) {
    const userHomePath = import_node_path4.default.join(this.paths.getUser(name), ".lc");
    const configContent = JSON.stringify(config);
    import_node_fs6.default.writeFileSync(userHomePath, configContent, "utf8");
  }
};
__decorateClass([
  Library("paths")
], UsersModel.prototype, "paths", 2);
__decorateClass([
  Library("encrypt")
], UsersModel.prototype, "encrypt", 2);
__decorateClass([
  Library("mongo")
], UsersModel.prototype, "db", 2);
__decorateClass([
  Library("process")
], UsersModel.prototype, "run", 2);
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
  StorageModel,
  UsersModel
});
//# sourceMappingURL=models.js.map
