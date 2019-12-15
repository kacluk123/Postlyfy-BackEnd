import bcrypt from "bcrypt";
import mongodb from "mongodb";
import { getDb } from "../util/database";

export default class User {
  public static async getUserById(userId: string): Promise<void> {
    const userIdConvertedToMongoID = new mongodb.ObjectId(userId);
    const db = getDb();
    const searchedUser = await db.collection("Users").findOne({ _id: userIdConvertedToMongoID });

    return searchedUser;
  }

  private name: string;
  private email: string;
  private password: string;

  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public async addUserToDb(): Promise<mongodb.InsertOneWriteOpResult> {
    const db = getDb();
    await this.cryptPassword();

    return db.collection("Users").insertOne(this);
  }

  private async cryptPassword(): Promise<void> {
    try {
      const cryptedPassword: string = await bcrypt.hash(this.password, 12);
      this.password = cryptedPassword;
    } catch (err) {
      console.log(err);
    }
  }
}
