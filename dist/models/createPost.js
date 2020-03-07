"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class createPost {
    constructor({ post, userId }) {
        this.post = post;
        this.userId = userId;
    }
    savePostToDb() {
        const db = database_1.getDb();
        return db.collection('posts').insertOne({
            createdBy: this.userId,
            postContent: this.post,
            addedAt: new Date()
        });
    }
    static getPosts({ limit, offset }) {
        const limitToNumber = limit;
        const offsetToNumber = offset;
        const db = database_1.getDb();
        return db.collection('posts')
            .find()
            .limit(limitToNumber)
            .skip(offsetToNumber)
            .toArray();
    }
    static countPosts() {
        const db = database_1.getDb();
        return db.collection('posts').count();
    }
}
exports.default = createPost;
//# sourceMappingURL=createPost.js.map