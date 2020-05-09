"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageMimeTypes = [
    'image/bmp',
    'image/gif',
    'image/jpeg',
];
const isImage = (req, res, next) => {
    // console.log(req.files.file);
    // if (imageMimeTypes.includes(req.files[0].m)) {
    //   next(req);
    // } else {
    //   res
    //     .status(400)
    //     .json({ messages: [{ msg: "Wrong file format" }], isError: true });
    // }
};
exports.default = isImage;
//# sourceMappingURL=is-image.js.map