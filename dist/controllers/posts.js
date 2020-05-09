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
const app_1 = require("../app");
const createSort_1 = require("../helpers/createSort");
exports.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    const tag = req.params.tag;
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    }
    else {
        const requestData = Object.assign({}, req.body, { userId: req.userId });
        const post = new Post_1.default(requestData);
        try {
            const createdPost = yield post.savePostToDb();
            const getTotalNumberOfPostsInTag = yield Post_1.default.countPosts({ tags: tag });
            res.status(200).json(createdPost.ops[0]);
            app_1.mySocket.broadcast.emit('posts', {
                action: 'create',
                getTotalNumberOfPostsInTag,
                serverTag: tag,
            });
        }
        catch (_a) {
            res.status(500).json([{ msg: "Internal server error" }]);
        }
    }
});
exports.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    }
    else {
        const userId = req.userId;
        const postId = req.params.postId;
        try {
            yield Post_1.default.deletePost(userId, postId);
            res.status(200).json({
                isError: false,
            });
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const getPosts = Post_1.default.getPosts;
    const getTotalPostNumber = Post_1.default.countPosts;
    const offset = req.query.offset;
    const limit = req.query.limit;
    const filters = JSON.parse(req.query.sorting);
    const sorting = new createSort_1.Sorting(filters);
    try {
        const postsList = yield getPosts({
            limit,
            offset,
            sorting,
        });
        const postsTotalNumber = yield getTotalPostNumber(sorting.match.$match);
        const response = {
            isError: false,
            posts: postsList.map(post => {
                return Object.assign({}, post, { comments: post.comments.filter(Boolean) });
            }),
            offset: Number(offset),
            limit: Number(limit),
            total: postsTotalNumber,
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.togglePostLike = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const userId = req.userId;
    const postId = req.params.postId;
    try {
        yield Post_1.default.togglePostLike(userId, postId);
        res.status(200).json({ isError: false });
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
        const constructorParams = Object.assign({}, req.body, { postId: req.params.postId, userName: req.userName, commentAuthorId: req.userId });
        const comment = new Comment_1.default(constructorParams);
        try {
            yield comment.addComment();
            res.status(200).json({ isError: false, comment: comment.commentInstance });
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.getComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.params.postId;
    const skip = Number(req.query.skip);
    try {
        const [commentsList] = yield Comment_1.default.getComments(postId, skip);
        res.status(200).json({
            comments: commentsList.comments,
            postId,
            isError: false,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.uploadImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.files);
});
//# sourceMappingURL=posts.js.map