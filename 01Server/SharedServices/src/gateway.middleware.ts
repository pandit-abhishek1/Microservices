import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from './error.handler';


const token: string[]= ['auth', 'seller', 'gig','search','buyer','message', 'order','review','offer'];
export function  verifyGatewayRequest (req: Request, res: Response, next: NextFunction): void {
    if(!req.headers?.gatewayToken){
      throw new NotAuthorizedError('Invalid request', 'veryfyGatewayRequest(): request is not comming from gateway');
    }
    const gatewaytoken: string = req.headers?.gatewayToken as string;
    if(!gatewaytoken){
      throw new NotAuthorizedError('Invalid request', 'veryfyGatewayRequest(): request is not comming from gateway');
    }

    try {
       const payload :{id:string, iat: number}= jsonwebtoken.verify(gatewaytoken, 'your-secret-key') as {id:string, iat: number};
         if(!payload || !payload.id || !token.includes(payload.id)){ 
           throw new NotAuthorizedError('Invalid request', 'veryfyGatewayRequest(): request payload from gateway is invalid');
         }
    } catch (error) {
       throw new NotAuthorizedError('Invalid request', 'veryfyGatewayRequest(): request is not comming from gateway');
    }
}