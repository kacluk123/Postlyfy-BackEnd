"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.createPost = [
    express_validator_1.check('post')
        .not().isEmpty()
        .isLength({ min: 10 })
        .withMessage('must be at least 10 chars long'),
];
//# sourceMappingURL=posts.js.map