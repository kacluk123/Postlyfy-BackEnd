import { getDb } from "../util/database";

interface ITags {
  _id: string;
  count: number;
}

class Tags {
  public static getAllTags(): Promise<ITags[]> {
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
