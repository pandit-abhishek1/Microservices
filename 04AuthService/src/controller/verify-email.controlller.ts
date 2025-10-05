import { Request, Response } from 'express';
import { BadRequestError, IAuthDocument} from '@pandit-abhishek1/sharedservices';
import { StatusCodes } from 'http-status-codes';
import {  getAuthUserByPasswordToken, updateVerifyEmailField } from '@authservices/services/auth.services';

import { omit } from 'lodash';

export async function verifyEmailController(req: Request, res: Response): Promise<void> {
     const { token } = req.params;
     if(!token){
        throw new BadRequestError('Invalid request. Token is missing', 'VerifyEmail validation() method error');
     }
     const existingUser: IAuthDocument = await getAuthUserByPasswordToken(token) as IAuthDocument;
     if (!existingUser) {
        throw new BadRequestError('Invalid token or token expired', 'VerifyEmail validation() method error');
     }
      await updateVerifyEmailField( existingUser.id!,true, token);

     const userData: IAuthDocument =  omit (existingUser, ['password']) as IAuthDocument;
     res.status(StatusCodes.OK).json({ message: 'Email verified successfully', data: userData });
}
