import { getDb } from "../util/database";
import mongodb from "mongodb";
import { string } from "prop-types";
import { Sorting, ISort } from '../helpers/createSort';
import SaveImage from '../helpers/saveImageToDb';

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
  private post: string;
  private userId: string;
  private tags: string[];
  private postImage: string | null;

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
          $lookup: {
            from: "Images",
            localField: "imageId",
            foreignField: "_id",
            as: "postImage",
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
            imageSrc: {
              $cond: {
                if: { $ne: ["$postImage", []] },
                then: { $arrayElemAt: ["$postImage.src", 0] },
                else: null,
              },
            },
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
            imageSrc: {
              $first: "$imageSrc"
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

  public static countPosts(match: ISort["match"] | null): Promise<number> {
    const db = getDb();
    
    return db
      .collection("posts")
      .find(match)
      .count();
  }

  constructor({ post, userId, tags, postImage}) {
    this.post = post;
    this.userId = userId;
    this.tags = tags;
    this.postImage = postImage;
  }

  public async savePostToDb(): Promise<mongodb.InsertOneWriteOpResult> {
    const db = getDb();
    const postData = {
      createdBy: this.userId,
      postContent: this.post,
      tags: this.removeHashTags(this.tags),
      addedAt: new Date(),
      likes: [],
      likesCount: 0,
      comments: [],
    };

    if (this.postImage) {
      const image = await SaveImage.saveImageToDb(this.postImage);
      const imageId = image.ops[0]._id;
      return db.collection("posts").insertOne({
        ...postData,
        imageId,
      });
    }
    return db.collection("posts").insertOne(postData);
  }

  private removeHashTags(arratToRemoveFirstLetter: string[]): string[] {
    return arratToRemoveFirstLetter.map((word: string) => word.substr(1));
  }
}