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
const Tags_1 = __importDefault(require("../models/Tags"));
exports.getTags = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const date = req.query.date;
        const tags = yield Tags_1.default.getAllTags(date);
        res.status(200).json({
            isError: false,
            tags,
        });
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=tags.js.map