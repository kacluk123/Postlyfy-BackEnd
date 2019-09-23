import { validationResult, body } from 'express-validator'
import Post from '../models/Post'
import { Request, Response, RequestHandler } from 'express';
import { getIo } from '../util/socket'
interface createPostRequest extends Request {
    userName: string
}

export const createPost: RequestHandler = async (req: createPostRequest, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    } else {
        const requestData = {...req.body, userName: req.userName}
        const post: Post= new Post(requestData)
        
        try { 
            await post.savePostToDb()
            getIo().emit('post', {
                action: 'create',
                post: post.postToSaveToDb()
            })
            res.status(200).json({ message: 'Post has been added!' })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getPosts: RequestHandler = async (req: Request, res: Response) => {
    const getPosts = Post.getPosts
    const getTotalPostNumber = Post.countPosts
    const offset = req.body.offset 
    const limit = req.body.limit
    try {
        const postsList = await getPosts({
            limit,
            offset,
        })

        const postsTotalNumber = await getTotalPostNumber()

        const response = {
            posts: postsList,
            total: postsTotalNumber,
        }

        res.status(200).json(response)
    } catch (err) {
        console.log(err)
    }
}