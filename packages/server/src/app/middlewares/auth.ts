import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { app_secret } from "../../config";

export default async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  const [, token] = auth!.split(' ')

  try {
    jwt.verify(token, app_secret as string, (options, decoded) => {
      req.headers.playerId = decoded!.playerId
      return next()
    })
  } catch(e) {
    res.status(401).json({ message: 'Token is not valid' })
  }

  return next()
}