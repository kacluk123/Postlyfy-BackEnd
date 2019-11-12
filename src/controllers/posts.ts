import { validationResult, body } from "express-validator";
import Posts from "../models/Post";
import { Request, Response, RequestHandler } from "express";
import Tags from "../models/Tags";
import { getIo } from "../util/socket";
interface createPostRequest extends Request {
  userName: string;
}

export const createPost: RequestHandler = async (
  req: createPostRequest,
  res: Response
) => {
  const errors = validationResult(req);
  console.log(req);
  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  } else {
    const requestData = { ...req.body, userName: req.userName };
    const post: Posts = new Posts(requestData);

    try {
      await post.savePostToDb();
      getIo().emit("post", {
        action: "create",
        post: post.postToSaveToDb()
      });
      res.status(200).json({ message: "Post has been added!" });
    } catch (err) {
      console.log(err);
    }
  }
};

export const getPosts: RequestHandler = async (req: Request, res: Response) => {
  const getPosts = Posts.getPosts;
  const getTotalPostNumber = Posts.countPosts;
  const offset = req.body.offset;
  const limit = req.body.limit;
  const tag = req.body.tag;

  try {
    const postsList = await getPosts({
      limit,
      offset,
      tag
    });

    const x = await Tags.getAllTags();

    console.log(x);

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
