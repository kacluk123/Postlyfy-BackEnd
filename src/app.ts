import express from "express";
import signupRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import tagsRoutes from "./routes/tags";
import userRoutes from "./routes/user";
import bodyPaser from "body-parser";
import mongoConnect from "./util/database";
import mongodb from "mongodb";
import fileUpload from 'express-fileupload';
import socketIo from "socket.io";
import { init } from "./util/socket";
import cookieParser from "cookie-parser";
export let mySocket: socketIo.Socket;
const app = express();
const port = 3000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Origin, X-Requested-With"
  );
  next();
});
app.use(fileUpload());
app.use(cookieParser());
app.use(bodyPaser.json({ limit: '50mb'}));
app.use(signupRoutes);
app.use(postRoutes);
app.use(tagsRoutes);
app.use(userRoutes);
const server = app.listen(port);
const dbConnect = (client: mongodb.MongoClient) => {
  const io = init(server);
  io.on("connection", (socket: socketIo.Socket) => {
    console.log('Client connected')
    mySocket = socket;
  });
};

mongoConnect({
  cb: dbConnect,
});

// export function getSocket() {
//   return mySocket;
// }
