import { getDb } from "../util/database";
import mongodb, { ObjectId } from "mongodb";

interface ICommentConstructorParams {
  userId: string;
  comment: string;
  postId: string;
}

export default class Comment {
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
    const postId = new mongodb.ObjectId(this.postId);
    const commentId = new ObjectId();

    db.collection("posts").updateOne(
      { _id: postId },
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
