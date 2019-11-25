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
const Post_1 = __importDefault(require("../models/Post"));
const Comment_1 = __importDefault(require("../models/Comment"));
const socket_1 = require("../util/socket");
exports.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    console.log(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    }
    else {
        const requestData = Object.assign({}, req.body, { userId: req.userId });
        const post = new Post_1.default(requestData);
        try {
            yield post.savePostToDb();
            socket_1.getIo().emit("post", {
                action: "create",
                post: post.postToSaveToDb()
            });
            res.status(200).json({ message: "Post has been added!" });
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const getPosts = Post_1.default.getPosts;
    const getTotalPostNumber = Post_1.default.countPosts;
    const offset = req.body.offset;
    const limit = req.body.limit;
    const tag = req.body.tag;
    try {
        const postsList = yield getPosts({
            limit,
            offset,
            tag
        });
        const postsTotalNumber = yield getTotalPostNumber(tag);
        const response = {
            isError: false,
            posts: postsList,
            total: postsTotalNumber
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    }
    else {
        const constructorParams = Object.assign({}, req.body, { userId: req.userId, postId: req.params.postId });
        const comment = new Comment_1.default(constructorParams);
        try {
            yield comment.addComment();
            res.status(200).json({ message: "Post has been added!" });
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.getComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        const commentsList = yield Comment_1.default.getComments(postId);
        res.status(200).json(commentsList);
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=posts.js.map