import { getDb } from "../util/database";
import mongodb from "mongodb";
import bcrypt from "bcrypt";

export default class CreateUser {
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
