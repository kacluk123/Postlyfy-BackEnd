import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const databaseUrl = "mongodb+srv://TestUser:123@cluster0-ow3p8.mongodb.net/test?retryWrites=true&w=majority";

interface IMongoConnect {
    cb: (client: mongodb.MongoClient) => void;
}

let _db: mongodb.MongoClient;

const dbconnect = async (dbUrl: string) => await MongoClient.connect(dbUrl);

const mongoConnect = async ({ cb }: IMongoConnect) => {
  try {
    _db = await dbconnect(databaseUrl);
    cb(_db);
  } catch (err) {
    console.log(err);
  }
};

export const getDb = () => {
  if (_db) {
    return _db.db("test");
  }

  throw new Error("Database not found");
};

export default mongoConnect;