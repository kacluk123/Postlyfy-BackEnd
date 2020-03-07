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
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
exports.getUserData = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    }
    else {
        const userId = req.userId;
        try {
            const [userData] = yield User_1.default.getUserById(userId);
            res.status(200).json({
                isError: false,
                user: userData,
            });
        }
        catch (err) {
            console.log(err);
        }
    }
});
//# sourceMappingURL=user.js.map