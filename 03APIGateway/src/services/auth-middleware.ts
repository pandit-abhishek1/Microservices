import { BadRequestError, IAuthPayload, NotAuthorizedError } from "@pandit-abhishek1/sharedservices";
import { Request,Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import { config } from "@gateway/config";


class AuthMiddleware {

public verifyUser(req:Request, res:Response, next:NextFunction): void {
  if(!req.session?.jwt){
    throw new NotAuthorizedError('You are not logged in');
  }
 try {
  const payload : IAuthPayload = verify(req.session?.jwt, `${config.JWT_TOKEN}`) as IAuthPayload;
  req.currentUser = payload;
 } catch (error) {
  throw new BadRequestError('You are not logged in');
 }
 next();
}
public checkAuthentication (req: Request, _res: Response, next:NextFunction): void{
  if(!req.session?.jwt){
    throw new BadRequestError('You are not logged in');
  }
  next();
}
}
export const authMiddleware: AuthMiddleware = new AuthMiddleware();
