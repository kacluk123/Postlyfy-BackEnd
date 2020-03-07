import { validationResult, body } from "express-validator";
import Posts from "../models/Post";
import Comment from "../models/Comment";
import { Request, Response, RequestHandler } from "express";
import Tags from "../models/Tags";
import { getIo } from "../util/socket";
import { mySocket } from '../app'; 
import { ISort, Sorting } from '../helpers/createSort'
import socketIo from 'socket.io';
interface ICreatePostRequest extends Request {
  userId: string;
  params: {
    tag: string;
  };
}

export const createPost: RequestHandler = async (
  req: ICreatePostRequest,
  res: Response,
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
      const getTotalNumberOfPostsInTag = await Posts.countPosts({tags: tag});
      res.status(200).json(createdPost.ops[0]);

      mySocket.broadcast.emit('posts', {
        action: 'create',
        getTotalNumberOfPostsInTag,
        serverTag: tag,
      });

    } catch  {
      res.status(500).json([{ msg: "Internal server error" }]);
    }
  }
};

interface IDeletePostRequest extends Request {
  userId: string;
  params: {
    postId: string;
  };
}

export const deletePost: RequestHandler = async (
  req: IDeletePostRequest,
  res: Response,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  } else {
    const userId = req.userId;
    const postId = req.params.postId;

    try {
      await Posts.deletePost(userId, postId);
      
      res.status(200).json({
        isError: false,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

interface IGetPostsRequest extends Request {
  query: {
    offset: string;
    limit: string;
    sorting: string;
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
  const filters: ISort = JSON.parse(req.query.sorting);
  const sorting = new Sorting(filters);

  try {
    const postsList = await getPosts({
      limit,
      offset,
      sorting,
    });
    const postsTotalNumber = await getTotalPostNumber(sorting.match.$match);

    const response = {
      isError: false,
      posts: postsList,
      offset: Number(offset),
      limit: Number(limit),
      total: postsTotalNumber,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

interface ITogglePostLikeRequest extends Request {
  userId: string;
  params: {
    postId: string;
  };
}

export const togglePostLike = async (
  req: ITogglePostLikeRequest,
  res: Response,
) => {
    const userId = req.userId;
    const postId = req.params.postId;
    try {
      await Posts.togglePostLike(userId, postId);
      res.status(200).json({ isError: false });
    } catch (err) {
      console.log(err);
    }
};

interface ICommentRequest extends ICreatePostRequest {
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
