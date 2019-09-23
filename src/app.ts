import express from 'express';
import signupRoutes from './routes/auth'
import postRoutes from './routes/posts'
import bodyPaser from 'body-parser'
import mongoConnect from './util/database'
import mongodb from 'mongodb'
import socketIo from 'socket.io'
import { init } from './util/socket'

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

