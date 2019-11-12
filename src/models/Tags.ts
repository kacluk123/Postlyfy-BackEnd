import { getDb } from "../util/database";
import mongodb from "mongodb";

class Tags {
  public static getAllTags() {
    const db = getDb();

    return db
      .collection("posts")
      .find(
        {},
        { fields: { _id: 0, createdBy: 0, postContent: 0, addedAt: 0 } }
      )
      .toArray();
  }
}

export default Tags;
