import jwt from 'jsonwebtoken'
import jwtKey from '../util/jwt_secret_key'
import { Request, Response, RequestHandler, NextFunction } from 'express';

interface isAuthRequest extends Request {
    userId: string
    userName: string
}

const isAuth: RequestHandler = (req: isAuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  console.log(token)
  if (!token) {
    const error = new Error('Not authenticated.');
    res.status(422).json({ messages: [{msg: "Not authenticated"}], isError: true })
    throw error;
  }
  
  let decodedToken;
  
  try {
    decodedToken = jwt.verify(token, jwtKey);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    res.status(422).json({ messages: [{msg: "Not authenticated"}], isError: true })
    throw error;
  }
 
  req.userId = decodedToken.userId;
  req.userName = decodedToken.userName;

  next();
};

export default isAuth