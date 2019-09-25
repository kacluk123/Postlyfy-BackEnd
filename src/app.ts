import express from 'express';
import signupRoutes from './routes/auth'
import postRoutes from './routes/posts'
import bodyPaser from 'body-parser'
import mongoConnect from './util/database'
import mongodb from 'mongodb'
import socketIo from 'socket.io'
import { init } from './util/socket'
import cookieParser from 'cookie-parser'

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', "Content-Type, Accept");
  next();
});
app.use(cookieParser())
app.use(bodyPaser.json())
app.use(signupRoutes)
app.use(postRoutes)

const dbConnect = (client: mongodb.MongoClient) => {
  const server = app.listen(port);

  const io = init(server)
  io.on('connection', (socket: socketIo.Socket) => {
    console.log('Client connected')
  });
}

mongoConnect({
  cb: dbConnect
})

