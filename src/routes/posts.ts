import express from "express";
import * as controller from "../controllers/posts";
import { createPost } from "../validation/posts";
import isImage from '../middleware/is-image'
import { createComment } from "../validation/comment";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.post("/posts/add-post/:tag", createPost, isAuth, controller.createPost);
router.post("/posts/upload-image", isAuth, isImage, controller.uploadImage);
router.get("/posts/get-posts", controller.getPosts);
router.patch(
  "/posts/add-comment/:postId",
  createComment,
  isAuth,
  controller.addComment,
);
router.post("/posts/toggle-like/:postId", isAuth, controller.togglePostLike);
router.delete("/posts/delete-post/:postId", isAuth, controller.deletePost);
router.get("/posts/comments/:postId", controller.getComments);
export default router;
