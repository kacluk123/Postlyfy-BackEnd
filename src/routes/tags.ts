import express from "express";
import * as controller from "../controllers/tags";

const router = express.Router();

router.get("/get-tags", controller.getTags);

export default router;
