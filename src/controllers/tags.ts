import { Request, Response, RequestHandler } from "express";
import Tags from "../models/Tags";

interface IGetTagsRequest extends Request {
  query: {
    date: Date;
  };
}

export const getTags: RequestHandler = async (req: IGetTagsRequest, res: Response) => {
  try {
    const date = req.query.date;
    console.log(date)
    const tags = await Tags.getAllTags(date);
    res.status(200).json({
      isError: false,
      tags,
    });
  } catch (err) {
    console.log(err);
  }
};
