"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret_key_1 = __importDefault(require("../util/jwt_secret_key"));
const isAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        const error = new Error('Not authenticated.');
        res.status(422).json({ messages: [{ msg: "Not authenticated" }], isError: true });
        throw error;
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, jwt_secret_key_1.default);
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        res.status(422).json({ messages: [{ msg: "Not authenticated" }], isError: true });
        throw error;
    }
    req.userId = decodedToken.userId;
    req.userName = decodedToken.userName;
    next();
};
exports.default = isAuth;
//# sourceMappingURL=is-auth.js.map