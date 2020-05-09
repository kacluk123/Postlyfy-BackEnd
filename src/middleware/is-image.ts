import { Request, Response, RequestHandler, NextFunction } from "express";

const imageMimeTypes = [
  'image/bmp',
  'image/gif',
  'image/jpeg',
];

const isImage: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // console.log(req.files.file);

  // if (imageMimeTypes.includes(req.files[0].m)) {
  //   next(req);
  // } else {
  //   res
  //     .status(400)
  //     .json({ messages: [{ msg: "Wrong file format" }], isError: true });
  // }
};

export default isImage;
