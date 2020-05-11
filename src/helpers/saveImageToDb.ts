import { getDb } from "../util/database";
import mongodb from "mongodb";

class SaveImage {
  public static async saveImageToDb(image: string): Promise<mongodb.InsertOneWriteOpResult> {
    const db = getDb();

    return db.collection("Images").insertOne({
      src: image
    });
  }
};

export default SaveImage;