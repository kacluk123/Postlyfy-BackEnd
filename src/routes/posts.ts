import express from "express";
import * as controller from "../controllers/posts";
import { createPost } from "../validation/posts";
import { createComment } from "../validation/comment";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.post("/posts/add-post", createPost, isAuth, controller.createPost);
router.post("/posts/get-posts", controller.getPosts);
router.patch(
  "/posts/add-comment/:postId",
  createComment,
  isAuth,
  controller.addComment
);
router.get("/posts/comments/:postId", controller.getComments);
export default router;
