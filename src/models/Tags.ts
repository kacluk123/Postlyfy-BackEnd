import { getDb } from "../util/database";
import moment from 'moment';

interface ITags {
  _id: string;
  count: number;
}

class Tags {
  public static getAllTags(date?: Date): Promise<ITags[]> {
    const db = getDb();
    const wantedDate = new Date(date);

    return db
      .collection("posts")
      .aggregate([
        { $match: { ...(date ? {addedAt: { $gt: date ? wantedDate : 0 }} : {})}},
        { $unwind: "$tags" },
        {
          $group: {
            _id: { $toLower: "$tags" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 50 },
      ])
      .toArray();
  }
}

export default Tags;
