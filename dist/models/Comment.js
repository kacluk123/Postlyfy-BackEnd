"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
const mongodb_1 = __importStar(require("mongodb"));
class Comment {
    constructor({ comment, userName, postId }) {
        this.addComment = () => __awaiter(this, void 0, void 0, function* () {
            const db = database_1.getDb();
            const convertedToMongoObjectIdPostId = new mongodb_1.default.ObjectId(this.postId);
            yield db.collection("posts").updateOne({ _id: convertedToMongoObjectIdPostId }, {
                $addToSet: {
                    comments: this.commentInstance,
                },
            });
        });
        this.content = comment;
        this.author = userName;
        this.postId = postId;
        this.addedAt = new Date();
        this._id = new mongodb_1.ObjectId();
    }
    get commentInstance() {
        const _a = this, { addComment } = _a, commentData = __rest(_a, ["addComment"]);
        return commentData;
    }
}
Comment.getComments = (postId, skip) => {
    const db = database_1.getDb();
    const convertedToMongoObjectIdPostId = new mongodb_1.default.ObjectId(postId);
    return db.collection("posts").aggregate([
        { $match: { _id: convertedToMongoObjectIdPostId } },
        {
            $project: {
                _id: 0,
                comments: 1,
            },
        },
    ]).toArray();
};
exports.default = Comment;
//# sourceMappingURL=Comment.js.map