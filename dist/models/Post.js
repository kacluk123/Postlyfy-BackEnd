"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static getPosts({ limit, offset, sorting, }) {
        const db = database_1.getDb();
        return db
            .collection("posts")
            .aggregate([
            ...sorting.allSorting,
            // { $addFields: { comments: { $reverseArray: "$comments" } }},
            { $addFields: {
                    postsId: { $toObjectId: "$createdBy" },
                    comments: { $slice: ["$comments", 3] },
                    totalComments: { $size: "$comments" }
                },
            },
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
    static togglePostLike(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = database_1.getDb();
            const convertedToMongoObjectIdPostId = new mongodb_1.default.ObjectId(postId);
            yield db.collection("posts").findOne({ _id: convertedToMongoObjectIdPostId, likes: userId }, (err, result) => {
                if (!result) {
                    db.collection("posts").updateOne({ _id: convertedToMongoObjectIdPostId }, { $push: { likes: userId }, $inc: { likesCount: 1 } });
                }
                else {
                    db.collection("posts").updateOne({ _id: convertedToMongoObjectIdPostId }, { $pull: { likes: userId }, $inc: { likesCount: -1 } });
                }
            });
        });
    }
    static deletePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = database_1.getDb();
            const convertedToMongoObjectIdPostId = new mongodb_1.default.ObjectId(postId);
            yield db.collection("posts").findOne({ _id: convertedToMongoObjectIdPostId }, (err, result) => {
                if (result.createdBy === userId) {
                    db.collection("posts").deleteOne({ _id: convertedToMongoObjectIdPostId });
                }
                else {
                    console.log('error');
                }
            });
        });
    }
    static countPosts(match) {
        const db = database_1.getDb();
        return db
            .collection("posts")
            .find(match)
            .count();
    }
    constructor({ post, userId, tags }) {
        this.post = post;
        this.userId = userId;
        this.tags = tags;
    }
    savePostToDb() {
        const db = database_1.getDb();
        return db.collection("posts").insertOne({
            createdBy: this.userId,
            postContent: this.post,
            tags: this.removeHashTags(this.tags),
            addedAt: new Date(),
            likes: [],
            likesCount: 0,
            comments: [],
        });
    }
    removeHashTags(arratToRemoveFirstLetter) {
        return arratToRemoveFirstLetter.map((word) => word.substr(1));
    }
}
exports.default = Posts;
//# sourceMappingURL=Post.js.map