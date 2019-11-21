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
            const postId = new mongodb_1.default.ObjectId(this.postId);
            const commentId = new mongodb_1.ObjectId();
            db.collection("posts").updateOne({ _id: postId }, {
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
exports.default = Comment;
//# sourceMappingURL=Comment.js.map