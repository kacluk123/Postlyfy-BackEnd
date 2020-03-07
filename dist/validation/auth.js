"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const database_1 = require("../util/database");
const checkForUserDataExist = ({ errorText, body }) => (value, { req }) => __awaiter(this, void 0, void 0, function* () {
    const db = database_1.getDb();
    const searchedValue = yield db.collection('Users').findOne({ [body]: value });
    if (searchedValue) {
        return Promise.reject(errorText);
    }
});
const checkForEmailExist = checkForUserDataExist({
    errorText: 'That email already exist',
    body: 'email'
});
const checkForNameExist = checkForUserDataExist({
    errorText: 'That name already exist',
    body: 'name'
});
exports.createUser = [
    express_validator_1.check('name')
        .not().isEmpty()
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .custom(checkForNameExist),
    express_validator_1.check('password')
        .not().isEmpty()
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long'),
    express_validator_1.check('email')
        .isEmail()
        .withMessage('must be a email')
        .custom(checkForEmailExist)
];
exports.loginUser = [
    express_validator_1.check('name')
        .not().isEmpty(),
    express_validator_1.check('password')
        .not().isEmpty()
];
//# sourceMappingURL=auth.js.map