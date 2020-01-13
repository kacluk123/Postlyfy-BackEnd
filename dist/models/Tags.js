"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
class Tags {
    static getAllTags(date) {
        const db = database_1.getDb();
        const wantedDate = new Date(date);
        return db
            .collection("posts")
            .aggregate([
            { $match: Object.assign({}, (date ? { addedAt: { $gt: date ? wantedDate : 0 } } : {})) },
            { $unwind: "$tags" },
            {
                $group: {
                    _id: { $toLower: "$tags" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 50 },
        ])
            .toArray();
    }
}
exports.default = Tags;
//# sourceMappingURL=Tags.js.map