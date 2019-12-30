"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../util/database");
const mongodb_1 = __importDefault(require("mongodb"));
// addedAt: "$addedAt",
// postContent: "$postContent",
// tags: "$tags"
class Posts {
    static getPosts({ limit, offset, tag }) {
        const db = database_1.getDb();
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
                    likes: { $size: "$likes" },
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
    static togglePostLike(userId, postId) {
        const db = database_1.getDb();
        const convertedToMongoObjectIdPostId = new mongodb_1.default.ObjectId(postId);
        db.collection("posts").aggregate([{ $match: { _id: convertedToMongoObjectIdPostId, likes: userId } }], (err, result) => {
            console.log(result);
        });
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
            likes: [],
            comments: [],
        };
    }
    removeHashTags(arratToRemoveFirstLetter) {
        return arratToRemoveFirstLetter.map((word) => word.substr(1));
    }
}
exports.default = Posts;
//# sourceMappingURL=Post.js.map