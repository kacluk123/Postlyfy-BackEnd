"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class Tags {
    static getAllTags() {
        const db = database_1.getDb();
        return db
            .collection("posts")
            .aggregate([
            { $unwind: "$tags" },
            {
                $group: {
                    _id: { $toLower: "$tags" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 50 }
        ])
            .toArray();
    }
}
exports.default = Tags;
//# sourceMappingURL=Tags.js.map