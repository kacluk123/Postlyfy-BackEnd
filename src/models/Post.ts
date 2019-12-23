import { getDb } from "../util/database";
import mongodb from "mongodb";
import { string } from "prop-types";

type postList = Array<{
  _id: string;
  createdBy: string;
  postContent: string;
  addedAt: string;
  tags: string;
  comments: [];
}>;
// addedAt: "$addedAt",
// postContent: "$postContent",
// tags: "$tags"
export default class Posts {
  public static getPosts({
    limit,
    offset,
    tag
  }: {
    limit: string;
    offset: string;
    tag: string;
  }): Promise<postList> {
    const db = getDb();
    console.log(limit, offset, tag);
    return db
      .collection("posts")
      .aggregate([
        { $sort: { addedAt : -1 }},
        { $match: { tags: tag } },
        // { $addFields: { comments: { $reverseArray: "$comments" } }},
        { $addFields: {
          postsId: { $toObjectId: "$createdBy" },
          comments: { $slice: [ "$comments", 3 ] },
          totalComments: { $size: "$comments" } } },
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

  public static countPosts(tag: string): Promise<number> {
    const db = getDb();

    return db
      .collection("posts")
      .find({ tags: tag })
      .count();
  }

  protected post: string;
  protected userId: string;
  protected tags: string[];

  constructor({ post, userId, tags }) {
    this.post = post;
    this.userId = userId;
    this.tags = tags;
  }

  public savePostToDb(): Promise<mongodb.InsertOneWriteOpResult> {
    const db = getDb();

    return db.collection("posts").insertOne(this.postToSaveToDb());
  }

  public postToSaveToDb() {
    return {
      createdBy: this.userId,
      postContent: this.post,
      tags: this.removeHashTags(this.tags),
      addedAt: new Date(),
      comments: []
    };
  }

  private removeHashTags(arratToRemoveFirstLetter: string[]): string[] {
    return arratToRemoveFirstLetter.map((word: string) => word.substr(1));
  }
}
