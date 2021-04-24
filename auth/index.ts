import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import config from "../config";

const secret = config.jwt.secret;

const signJWT = (data: any) => {

  return jwt.sign({ id: data.id }, secret, {
    expiresIn: 86400
  });

};

const TokenValidation = (req: Request, res: Response, next: NextFunction) => {

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, secret, (error: any, decoded: any) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error
        })
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Unauthotization",
    })
  }
}

export default {
  signJWT,
  TokenValidation
}