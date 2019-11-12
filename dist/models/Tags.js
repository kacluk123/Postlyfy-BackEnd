"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class Tags {
    static getAllTags() {
        const db = database_1.getDb();
        return db
            .collection("posts")
            .find({}, { fields: { _id: 0, createdBy: 0, postContent: 0, addedAt: 0 } })
            .toArray();
    }
}
exports.default = Tags;
//# sourceMappingURL=Tags.js.map