import { getDb } from "../util/database";

class Tags {
  public static getAllTags() {
    const db = getDb();

    return db
      .collection("posts")
      .aggregate([
        { $unwind: "$tags" },
        {
          $group: {
            _id: { $toLower: "$tags" },
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 50 }
      ])
      .toArray();
  }
}

export default Tags;
