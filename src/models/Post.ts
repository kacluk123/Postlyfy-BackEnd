import { getDb } from "../util/database";
import mongodb from "mongodb";

type postList = Array<{
  _id: string;
  createdBy: string;
  postContent: string;
  addedAt: string;
  tags: string;
}>;

export default class createPost {
  protected post: string;
  protected userName: string;
  protected tags: string;

  constructor({ post, userName, tags }) {
    this.post = post;
    this.userName = userName;
    this.tags = tags;
  }

  public savePostToDb(): Promise<mongodb.InsertOneWriteOpResult> {
    const db = getDb();

    return db.collection("posts").insertOne(this.postToSaveToDb());
  }

  public postToSaveToDb() {
    return {
      createdBy: this.userName,
      postContent: this.post,
      tags: this.tags,
      addedAt: new Date()
    };
  }

  public static getPosts({
    limit,
    offset,
    tag
  }: {
    limit: number;
    offset: number;
    tag: string;
  }): Promise<postList> {
    const db = getDb();

    return db
      .collection("posts")
      .find({ tags: tag })
      .limit(limit)
      .skip(offset)
      .sort({ addedAt: -1 })
      .toArray();
  }

  public static countPosts(): Promise<number> {
    const db = getDb();

    return db.collection("posts").count();
  }
}
