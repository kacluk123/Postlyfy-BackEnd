import { validationResult, body } from "express-validator";
import Posts from "../models/Post";
import Comment from "../models/Comment";
import { Request, Response, RequestHandler } from "express";
import Tags from "../models/Tags";
import { getIo } from "../util/socket";
import User from '../models/User';

interface IGetUserRequest extends Request {
  userId: string;
}

export const getUserDara: RequestHandler = async (
  req: IGetUserRequest,
  res: Response,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  } else {
    const userId = req.userId;

    try {
      const userData = await User.getUserById(userId);
      res.status(200).json({
        isError: false,
        user: userData,
      });
    } catch (err) {
      console.log(err);
    }
  }
};