import { Request, Response, RequestHandler } from "express";
import Tags from "../models/Tags";

export const getTags: RequestHandler = async (req: Request, res: Response) => {
  try {
    const tags = await Tags.getAllTags();
    res.status(200).json({
      isError: false,
      tags
    });
  } catch (err) {
    console.log(err);
  }
};
