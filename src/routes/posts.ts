import express from 'express'
import * as controller from '../controllers/posts' 
import { createPost } from '../validation/posts'
import isAuth from '../middleware/is-auth'

const router = express.Router();

router.post('/add-post', createPost, isAuth, controller.createPost)
router.post('/get-posts', controller.getPosts)

export default router