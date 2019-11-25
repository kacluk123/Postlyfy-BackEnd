"use strict";
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
    constructor({ comment, userId, postId }) {
        this.addComment = () => {
            const db = database_1.getDb();
            const convertedToMongoObjectIdPostId = new mongodb_1.default.ObjectId(this.postId);
            const commentId = new mongodb_1.ObjectId();
            db.collection("posts").updateOne({ _id: convertedToMongoObjectIdPostId }, {
                $addToSet: {
                    comments: {
                        _id: commentId,
                        content: this.comment,
                        author: this.userId,
                        addedAt: new Date()
                    }
                }
            });
        };
        this.comment = comment;
        this.userId = userId;
        this.postId = postId;
    }
}
Comment.getComments = (postId) => {
    const db = database_1.getDb();
    const convertedToMongoObjectIdPostId = new mongodb_1.default.ObjectId(postId);
    return db.collection("posts").aggregate([
        { $match: { _id: convertedToMongoObjectIdPostId } },
        {
            $project: {
                comments: { $slice: ["$comments", -3] }
            }
        }
    ]);
};
exports.default = Comment;
//# sourceMappingURL=Comment.js.map