"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
// addedAt: "$addedAt",
// postContent: "$postContent",
// tags: "$tags"
class Posts {
    static getPosts({ limit, offset, tag }) {
        const db = database_1.getDb();
        console.log(limit, offset, tag);
        return db
            .collection("posts")
            .aggregate([
            { $sort: { addedAt: -1 } },
            { $match: { tags: tag } },
            // { $addFields: { comments: { $reverseArray: "$comments" } }},
            { $addFields: {
                    postsId: { $toObjectId: "$createdBy" },
                    comments: { $slice: ["$comments", 3] },
                    totalComments: { $size: "$comments" }
                } },
            {
                $lookup: {
                    from: "Users",
                    localField: "postsId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $addFields: {
                    createdBy: {
                        $cond: {
                            if: { $ne: ["$userDetails", []] },
                            then: { $arrayElemAt: ["$userDetails.name", 0] },
                            else: "$createdBy",
                        },
                    },
                    userPicture: { $arrayElemAt: ["$userDetails.userPicture", 0] },
                },
            },
            // { $unwind: "$comments" },
            // { $addFields: { authorId: { $toObjectId: "$comments.author" } } },
            // {
            //   $lookup: {
            //     from: "Users",
            //     localField: "authorId",
            //     foreignField: "$_id",
            //     as: "commentAuthorDetails"
            //   }
            // },
            // {
            //   $group: {
            //     _id: {
            //       author: "$commentAuthorDetails.name",
            //       _id: "$comments._id"
            //     }
            //   }
            // },
            {
                $project: {
                    postsId: 0,
                    userDetails: 0,
                },
            },
            { $skip: Number(offset) },
            { $limit: Number(limit) },
        ])
            .toArray();
    }
    static countPosts(tag) {
        const db = database_1.getDb();
        return db
            .collection("posts")
            .find({ tags: tag })
            .count();
    }
    constructor({ post, userId, tags }) {
        this.post = post;
        this.userId = userId;
        this.tags = tags;
    }
    savePostToDb() {
        const db = database_1.getDb();
        return db.collection("posts").insertOne(this.postToSaveToDb());
    }
    postToSaveToDb() {
        return {
            createdBy: this.userId,
            postContent: this.post,
            tags: this.removeHashTags(this.tags),
            addedAt: new Date(),
            comments: []
        };
    }
    removeHashTags(arratToRemoveFirstLetter) {
        return arratToRemoveFirstLetter.map((word) => word.substr(1));
    }
}
exports.default = Posts;
//# sourceMappingURL=Post.js.map