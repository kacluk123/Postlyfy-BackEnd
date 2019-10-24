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
const checkForTags = (value, { req }) => __awaiter(this, void 0, void 0, function* () {
    if (!Array.isArray(value)) {
        return Promise.reject("Must be an array!");
    }
});
exports.createPost = [
    express_validator_1.check("post")
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("must be at least 10 chars long"),
    express_validator_1.check("tags")
        .not()
        .isEmpty()
        .isLength({ min: 1 })
        .withMessage("Must contains at least one tag")
        .custom(checkForTags)
];
//# sourceMappingURL=posts.js.map