import { getDb } from "../util/database";
import mongodb, { ObjectId } from "mongodb";
import User from '../models/User';

interface ICommentConstructorParams {
  userName: string;
  comment: string;
  postId: string;
  commentAuthorId: string;
}

export default class Comment {
  public static getComments = (postId: string, skip: number) => {
    const db = getDb();
    const convertedToMongoObjectIdPostId = new mongodb.ObjectId(postId);

    return db.collection("posts").aggregate([
      { $match: { _id: convertedToMongoObjectIdPostId } },
      {
        $project: {
          _id: 0,
          comments: 1,
        },
      },
    ]).toArray();
  };

  private author: string;
  private content: string;
  private postId: string;
  private addedAt: Date;
  private commentAuthorId: string
  private _id: mongodb.ObjectId;

  constructor({ comment, userName, postId, commentAuthorId }: ICommentConstructorParams) {
    this.content = comment;
    this.author = userName;
    this.postId = postId;
    this.commentAuthorId = commentAuthorId;
    this.addedAt = new Date();
    this._id = new ObjectId();
  }

  public get commentInstance() {
    const { addComment, ...commentData } = this;

    return commentData;
  }

  public async getResponseComment(userId: string) {
    const [commentAuthor] = await User.getUserById(userId);
    
    return {
      _id: this._id,
      postId: this.postId,
      commentAuthor: {
        name: commentAuthor.name,
        picture: commentAuthor.userPicture
      },
      commentData: {
        addedAt: this.addedAt,
        content: this.content,
      }
    };
  }

  public addComment = async () => {
    const db = getDb();
    const convertedToMongoObjectIdPostId = new mongodb.ObjectId(this.postId);

    await db.collection("posts").updateOne(
      { _id: convertedToMongoObjectIdPostId },
      {
        $addToSet: {
          comments: this.commentInstance,
        },
      },
    );
  }
}
