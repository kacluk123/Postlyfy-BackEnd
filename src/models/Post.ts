import { getDb } from '../util/database'
import mongodb from 'mongodb'

type postList = Array<{
    _id: string;
    createdBy: string;
    postContent: string;
    addedAt: string
}>

export default class createPost {
    post: string
    userName: string

    constructor({ post, userName }) {
        this.post = post 
        this.userName = userName
    }

    public savePostToDb(): Promise<mongodb.InsertOneWriteOpResult> {
        const db = getDb()

        return db.collection('posts')
            .insertOne(this.postToSaveToDb())
    }

    public postToSaveToDb() {
        return {
            createdBy: this.userName,
            postContent: this.post,
            addedAt: new Date()
        }
    }

    public static getPosts({ limit, offset }: { limit: number, offset: number }): Promise<postList> {
        const db = getDb()
        
        return db.collection('posts')
        .find()
        .limit(limit)
        .skip(offset)
        .sort({ addedAt: -1 })
        .toArray()
    }

    public static countPosts(): Promise<number> {
        const db = getDb()

        return db.collection('posts').count()
    }
}