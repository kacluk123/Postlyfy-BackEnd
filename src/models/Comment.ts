import { getDb } from "../util/database";
import mongodb, { ObjectId } from "mongodb";

interface ICommentConstructorParams {
  userId: string;
  comment: string;
  postId: string;
}

export default class Comment {
  public static getComments = (postId: string) => {
    const db = getDb();
    const convertedToMongoObjectIdPostId = new mongodb.ObjectId(postId);

    return db.collection("posts").aggregate([
      { $match: { _id: convertedToMongoObjectIdPostId } },
      {
        $project: {
          comments: { $slice: ["$comments", -3] }
        }
      }
    ]);
  };

  userId: string;
  comment: string;
  postId: string;

  constructor({ comment, userId, postId }: ICommentConstructorParams) {
    this.comment = comment;
    this.userId = userId;
    this.postId = postId;
  }

  public addComment = () => {
    const db = getDb();
    const convertedToMongoObjectIdPostId = new mongodb.ObjectId(this.postId);
    const commentId = new ObjectId();

    db.collection("posts").updateOne(
      { _id: convertedToMongoObjectIdPostId },
      {
        $addToSet: {
          comments: {
            _id: commentId,
            content: this.comment,
            author: this.userId,
            addedAt: new Date()
          }
        }
      }
    );
  };
}
