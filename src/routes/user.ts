import express from "express";
import * as controller from "../controllers/user";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.get("/users/get-user-data", isAuth, controller.getUserDara);

export default router;