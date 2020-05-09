import { getDb } from "../util/database";
import mongodb from "mongodb";
import { string } from "prop-types";
import { Sorting, ISort } from '../helpers/createSort' 

type postList = Array<{
  _id: string;
  createdBy: string;
  addedAt: string;
  postContent: string;
  tags: string;
  likes: [];
  likesCount: number
  comments: [];
}>;
// addedAt: "$addedAt",
// postContent: "$postContent",
// tags: "$tags"
export default class Posts {
  public static getPosts({
    limit,
    offset,
    sorting,
  }: {
    limit: string;
    offset: string;
    sorting: Sorting;
  }): Promise<postList> {
    const db = getDb();
    return db
      .collection("posts")
      .aggregate([
        ...sorting.allSorting,
        { $skip: Number(offset) },
        { $limit: Number(limit) },
        { $addFields: {
          postsId: { $toObjectId: "$createdBy" },
          comments: { $slice: [ "$comments", 3 ] },
          totalComments: { $size: "$comments" } },
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
        {
          $project: {
            postsId: 0,
            userDetails: 0,
          },
        },
        {
          $unwind:  {
            path: "$comments",
            preserveNullAndEmptyArrays: true
          }
        },
        { $addFields: { authorCommentId: { $toObjectId: "$comments.commentAuthorId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "authorCommentId",
            foreignField: "_id",
            as: "commentAuthorDetails",
          },
        },
        {
          $group: {
            _id: "$_id",
            postContent: {
              $first: "$postContent"
            },
            addedAt: {
              $first: "$addedAt"
            },
            createdBy: {
              $first: "$createdBy"
            },
            userPicture: {
              $first: "$userPicture"
            },
            likesCount: {
              $first: "$likesCount"
            },
            likes: {
              $first: "$likes"
            },
            tags: {
              $first: "$tags"
            },
            totalComments: {
              $first: "$totalComments"
            },
            comments: {
              $push: {
                $cond: {
                  if: { $ne: ["$commentAuthorDetails", []] },
                  then: {
                    _id: "$comments._id",
                    postId: "$_id",
                    commentData: {
                      content: "$comments.content",
                      addedAt: "$comments.addedAt"
                    },
                    commentAuthor: {
                      name: { $arrayElemAt: ["$commentAuthorDetails.name", 0] },
                      picture: { $arrayElemAt: ["$commentAuthorDetails.picture", 0] }
                    }
                  },
                  else: null,
                }
              }
            }
        }
      },
      ])
      .toArray();
  }


  // $push: {
    // _id: "$comments._id",
    // postId: "$_id",
    // commentData: {
    //   content: "$comments.content",
    //   addedAt: "$comments.addedAt"
    // },
    // commentsAuthor: {
    //   name: { $arrayElemAt: ["$commentAuthorDetails.name", 0] },
    //   picture: { $arrayElemAt: ["$commentAuthorDetails.picture", 0] }
    // }
  // }
  public static async togglePostLike(userId: string, postId: string) {
    const db = getDb();
    const convertedToMongoObjectIdPostId = new mongodb.ObjectId(postId);
    
    await db.collection("posts").findOne(
      { _id: convertedToMongoObjectIdPostId, likes: userId},
      (err, result) => {
        if (!result) {
          db.collection("posts").updateOne(
            { _id: convertedToMongoObjectIdPostId },
            { $push: {likes: userId}, $inc: { likesCount: 1 }},
          );
        } else {
          db.collection("posts").updateOne(
            { _id: convertedToMongoObjectIdPostId },
            { $pull: {likes: userId}, $inc: { likesCount: -1 }},
          );
        }
      },
    );
  }

  public static async deletePost(userId: string, postId: string) {
    const db = getDb();
    const convertedToMongoObjectIdPostId = new mongodb.ObjectId(postId);
  
    await db.collection("posts").findOne(
      { _id: convertedToMongoObjectIdPostId},
      (err, result) => {
        if (result.createdBy === userId) {
          db.collection("posts").deleteOne( { _id: convertedToMongoObjectIdPostId });
        } else {
          console.log('error')
        }
      },
    );
  }

  public static countPosts(match: ISort["match"]): Promise<number> {
    const db = getDb();
    
    return db
      .collection("posts")
      .find(match)
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

  private removeHashTags(arratToRemoveFirstLetter: string[]): string[] {
    return arratToRemoveFirstLetter.map((word: string) => word.substr(1));
  }
}