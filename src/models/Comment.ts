import { getDb } from "../util/database";
import mongodb, { ObjectId } from "mongodb";

interface ICommentConstructorParams {
  userName: string;
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

  private author: string;
  private content: string;
  private postId: string;
  private addedAt: Date;
  private _id: mongodb.ObjectId;

  constructor({ comment, userName, postId }: ICommentConstructorParams) {
    this.content = comment;
    this.author = userName;
    this.postId = postId;
    this.addedAt = new Date();
    this._id = new ObjectId();
  }

  public get commentInstance() {
    const { addComment, ...commentData } = this;

    return commentData;
  }

  public addComment = async () => {
    const db = getDb();
    const convertedToMongoObjectIdPostId = new mongodb.ObjectId(this.postId);
    const commentId = new ObjectId();
    await db.collection("posts").updateOne(
      { _id: convertedToMongoObjectIdPostId },
      {
        $addToSet: {
          comments: this.commentInstance;
        },
      },
    );
  }
}
