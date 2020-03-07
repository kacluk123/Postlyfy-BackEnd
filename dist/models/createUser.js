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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../util/database");
class User {
    constructor({ name, email, password }) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    addUserToDb() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = database_1.getDb();
            yield this.cryptPassword();
            return db.collection("Users").insertOne(this);
        });
    }
    cryptPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cryptedPassword = yield bcrypt_1.default.hash(this.password, 12);
                this.password = cryptedPassword;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = User;
//# sourceMappingURL=createUser.js.map