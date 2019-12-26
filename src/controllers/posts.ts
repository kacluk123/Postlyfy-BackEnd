import { validationResult, body } from "express-validator";
import Posts from "../models/Post";
import Comment from "../models/Comment";
import { Request, Response, RequestHandler } from "express";
import Tags from "../models/Tags";
import { getIo } from "../util/socket";
import { mySocket } from '../app'; 
import socketIo from 'socket.io';
interface createPostRequest extends Request {
  userId: string;
  params: {
    tag: string;
  };
}

export const createPost: RequestHandler = async (
  req: createPostRequest,
  res: Response
) => {
  const errors = validationResult(req);
  const tag = req.params.tag;

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  } else {
    const requestData = { ...req.body, userId: req.userId };
    const post: Posts = new Posts(requestData);

    try {
      const createdPost = await post.savePostToDb();
      const getTotalNumberOfPostsInTag = await Posts.countPosts(tag);
      
      res.status(200).json(createdPost.ops[0]);
      // getIo().broadcast.emit('posts', {
      //   action: 'create',
      //   getTotalNumberOfPostsInTag,
      //   serverTag: tag,
      // });
      mySocket.broadcast.emit('posts', {
        action: 'create',
        getTotalNumberOfPostsInTag,
        serverTag: tag,
      });

      // getIo().on('connection', (socket: socketIo.Socket) => {
      //   console.log(socket)
      //   socket.on('send-post', (data) => {
      //     socket.broadcast.emit('msg', {
      //       action: 'create',
      //       getTotalNumberOfPostsInTag,
      //       serverTag: tag,
      //     });
      //   })
      // });
    } catch (err) {
      console.log(err);
    }
  }
};

interface IGetPostsRequest extends Request {
  query: {
    offset: string;
    limit: string;
  };
  params: {
    tag: string;
  };
}

export const getPosts: RequestHandler = async (
  req: IGetPostsRequest,
  res: Response,
) => {
  const getPosts = Posts.getPosts;
  const getTotalPostNumber = Posts.countPosts;

  const offset = req.query.offset;
  const limit = req.query.limit;
  const tag = req.params.tag;

  try {
    const postsList = await getPosts({
      limit,
      offset,
      tag,
    });

    const postsTotalNumber = await getTotalPostNumber(tag);

    const response = {
      isError: false,
      posts: postsList,
      offset: Number(offset),
      total: postsTotalNumber,
      limit: Number(limit),
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

interface ICommentRequest extends createPostRequest {
  params: {
    postId: string;
  };
  userName: string;
}

export const addComment: RequestHandler = async (
  req: ICommentRequest,
  res: Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  } else {
    const constructorParams = {
      ...req.body,
      postId: req.params.postId,
      userName: req.userName,
    };
    const comment: Comment = new Comment(constructorParams);

    try {
      await comment.addComment();
      
      res.status(200).json({ isError: false, comment: comment.commentInstance });
    } catch (err) {
      console.log(err);
    }
  }
};

interface IGetCommentRequest {
  query: {
    skip: number;
  };
  params: {
    postId: string;
  };
}

export const getComments: RequestHandler = async (
  req: IGetCommentRequest,
  res: Response,
) => {
  const postId = req.params.postId;
  const skip = Number(req.query.skip);

  try {
    const [ commentsList ] = await Comment.getComments(postId, skip);

    res.status(200).json({
      comments: commentsList.comments,
      postId,
      isError: false,
    });
  } catch (err) {
    console.log(err);
  }
};
