"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.createComment = [
    express_validator_1.check("comment")
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("must be at least 10 chars long")
];
//# sourceMappingURL=comment.js.map