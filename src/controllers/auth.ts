// import CreateUser from '../models/createUser'
import { validationResult } from 'express-validator'
import CreateUser from '../models/createUser'
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { getDb } from '../util/database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import secretKey from '../util/jwt_secret_key'

export const signup: RequestHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json({messages: errors.array(), isError: true});
    } else {
        const user: CreateUser = new CreateUser(req.body)

        try { 
            await user.addUserToDb()
            res.status(201).json({messages: [{ msg: 'User has been created!' }], isError: false})
        } catch (err) {
            console.log(err)
        }
    }
}

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json({messages: errors.array(), isError: true});
    } 

    const db = getDb()
    const searchedUser = await db.collection('Users').findOne({ name: req.body.name })

    if (!searchedUser) {
        return res.status(422).json({messages: [{msg: "User not exist"}], isError: true});
    }

    const isPasswordEqual = await bcrypt.compare(req.body.password, searchedUser.password)

    if (!isPasswordEqual) {
        return res.status(422).json({messages: [{msg: "Password is not correct"}], isError: true});
    }

    const token = jwt.sign(
        {
          email: searchedUser.email,
          userId: searchedUser._id.toString(),
          userName: searchedUser.name
        },
        secretKey,
        { expiresIn: '24h' }
      );

      res.cookie('token', token, { httpOnly: false }).sendStatus(200)
}
