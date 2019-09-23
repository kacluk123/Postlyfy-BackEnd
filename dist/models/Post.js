"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class createPost {
    constructor({ post, userName }) {
        this.post = post;
        this.userName = userName;
    }
    savePostToDb() {
        const db = database_1.getDb();
        return db.collection('posts')
            .insertOne(this.postToSaveToDb());
    }
    postToSaveToDb() {
        return {
            createdBy: this.userName,
            postContent: this.post,
            addedAt: new Date()
        };
    }
    static getPosts({ limit, offset }) {
        const db = database_1.getDb();
        return db.collection('posts')
            .find()
            .limit(limit)
            .skip(offset)
            .sort({ addedAt: -1 })
            .toArray();
    }
    static countPosts() {
        const db = database_1.getDb();
        return db.collection('posts').count();
    }
}
exports.default = createPost;
//# sourceMappingURL=Post.js.map