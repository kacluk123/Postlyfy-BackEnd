import bcrypt from "bcrypt";
import mongodb from "mongodb";
import { getDb } from "../util/database";

interface IUserData {
  password: string;
  _id: string;
  name: string;
  email: string;
  userPicture: string | null;
}

export default class User {
  private name: string;
  private email: string;
  private password: string;
  private userPicture: string | null;

  public static async getUserById(userId: string): Promise<Array<Omit<IUserData, "password">>> {
    const userIdConvertedToMongoID = new mongodb.ObjectId(userId);
    const db = getDb();

    return db.collection("Users").aggregate<Omit<IUserData, "password">>([
      { $match: { _id: userIdConvertedToMongoID } },
      {
        $project: {
          password: 0,
        },
      },
    ]).toArray();
  }

  constructor({ name, email, password, userPicture }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userPicture = userPicture || null;
  }

  public async addUserToDb(): Promise<mongodb.InsertOneWriteOpResult> {
    const db = getDb();
    await this.cryptPassword();

    return db.collection("Users").insertOne(this);
  }

  private async cryptPassword(): Promise<void> {
    const cryptedPassword: string = await bcrypt.hash(this.password, 12);
    this.password = cryptedPassword;
  }
}