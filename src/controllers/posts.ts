import { validationResult, body } from "express-validator";
import Posts from "../models/Post";
import Comment from "../models/Comment";
import { Request, Response, RequestHandler } from "express";
import Tags from "../models/Tags";
import { getIo } from "../util/socket";
interface createPostRequest extends Request {
  userId: string;
}

export const createPost: RequestHandler = async (
  req: createPostRequest,
  res: Response
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  } else {
    const requestData = { ...req.body, userId: req.userId };
    const post: Posts = new Posts(requestData);

    try {
      const createdPost = await post.savePostToDb();
      // getIo().emit("post", {
      //   action: "create",
      //   post: post.postToSaveToDb()
      // });
      res.status(200).json(createdPost.ops[0]);
    } catch (err) {
      console.log(err);
    }
  }
};

interface GetPostsRequest extends Request {
  query: {
    offset: string;
    limit: string;
  };
  params: {
    tag: string;
  };
}

export const getPosts: RequestHandler = async (
  req: GetPostsRequest,
  res: Response
) => {
  const getPosts = Posts.getPosts;
  const getTotalPostNumber = Posts.countPosts;

  const offset = req.query.offset;
  const limit = req.query.limit;
  const tag = req.params.tag;
  console.log(offset, limit, tag);
  try {
    const postsList = await getPosts({
      limit: Number(limit),
      offset: Number(offset),
      tag
    });

    const postsTotalNumber = await getTotalPostNumber(tag);

    const response = {
      isError: false,
      posts: postsList,
      total: postsTotalNumber
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
}

export const addComment: RequestHandler = async (
  req: ICommentRequest,
  res: Response
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  } else {
    const constructorParams = {
      ...req.body,
      userId: req.userId,
      postId: req.params.postId
    };
    const comment: Comment = new Comment(constructorParams);

    try {
      await comment.addComment();
      res.status(200).json({ message: "Post has been added!" });
    } catch (err) {
      console.log(err);
    }
  }
};

export const getComments: RequestHandler = async (
  req: ICommentRequest,
  res: Response
) => {
  const postId = req.params.postId;

  try {
    const commentsList = await Comment.getComments(postId);

    res.status(200).json(commentsList);
  } catch (err) {
    console.log(err);
  }
};
