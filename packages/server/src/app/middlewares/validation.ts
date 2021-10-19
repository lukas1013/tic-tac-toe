import { NextFunction, Request, Response } from "express";
import { validate } from "isemail";

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  
  //if any is missing
  if (!email || !password || !name) {
    return res.status(400).send({ message: 'Bad request, is missing a parameter' })
  }

  if (validate(email) && password.length > 7) {
    return next()
  }
  
  return res.status(400).send({ message: 'Bad request, the crendentials isnt valids' })
}