"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class Posts {
    static getPosts({ limit, offset, tag }) {
        const db = database_1.getDb();
        return db
            .collection("posts")
            .find({ tags: tag })
            .limit(limit)
            .skip(offset)
            .sort({ addedAt: -1 })
            .toArray();
    }
    static countPosts(tag) {
        const db = database_1.getDb();
        return db
            .collection("posts")
            .find({ tags: tag })
            .count();
    }
    constructor({ post, userName, tags }) {
        this.post = post;
        this.userName = userName;
        this.tags = tags;
    }
    savePostToDb() {
        const db = database_1.getDb();
        return db.collection("posts").insertOne(this.postToSaveToDb());
    }
    postToSaveToDb() {
        return {
            createdBy: this.userName,
            postContent: this.post,
            tags: this.removeHashTags(this.tags),
            addedAt: new Date()
        };
    }
    removeHashTags(arratToRemoveFirstLetter) {
        return arratToRemoveFirstLetter.map((word) => word.substr(1));
    }
}
exports.default = Posts;
//# sourceMappingURL=Post.js.map