"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const MongoClient = mongodb_1.default.MongoClient;
const databaseUrl = "mongodb+srv://sakuy:123@szkolna17-k7gpb.mongodb.net/szkolna17?retryWrites=true&w=majority";
let _db;
const dbconnect = (dbUrl) => __awaiter(this, void 0, void 0, function* () { return yield MongoClient.connect(dbUrl); });
const mongoConnect = ({ cb }) => __awaiter(this, void 0, void 0, function* () {
    try {
        _db = yield dbconnect(databaseUrl);
        cb(_db);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getDb = () => {
    if (_db) {
        return _db.db("szkolna17-db");
    }
    throw new Error("Database not found");
};
exports.default = mongoConnect;
//# sourceMappingURL=database.js.map