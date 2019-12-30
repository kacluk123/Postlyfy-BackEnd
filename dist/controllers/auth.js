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
// import CreateUser from '../models/createUser'
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const database_1 = require("../util/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret_key_1 = __importDefault(require("../util/jwt_secret_key"));
exports.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ messages: errors.array(), isError: true });
    }
    else {
        const user = new User_1.default(req.body);
        try {
            yield user.addUserToDb();
            res.status(201).json({
                messages: [{ msg: "User has been created!" }],
                isError: false
            });
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ messages: errors.array(), isError: true });
    }
    const db = database_1.getDb();
    const searchedUser = yield db
        .collection("Users")
        .findOne({ name: req.body.name });
    if (!searchedUser) {
        return res
            .status(422)
            .json({ messages: [{ msg: "User not exist" }], isError: true });
    }
    const isPasswordEqual = yield bcrypt_1.default.compare(req.body.password, searchedUser.password);
    if (!isPasswordEqual) {
        return res
            .status(422)
            .json({ messages: [{ msg: "Password is not correct" }], isError: true });
    }
    const token = jsonwebtoken_1.default.sign({
        email: searchedUser.email,
        userId: searchedUser._id.toString(),
        userName: searchedUser.name,
    }, jwt_secret_key_1.default, { expiresIn: "24h" });
    res
        .cookie("token", token, { httpOnly: true, secure: false })
        .sendStatus(200);
});
exports.logout = (req, res, next) => {
    res.clearCookie("token")
        .sendStatus(200);
};
//# sourceMappingURL=auth.js.map