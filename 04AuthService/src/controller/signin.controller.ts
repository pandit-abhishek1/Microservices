import { Request, Response } from 'express';
import { BadRequestError, IAuthDocument, isEmail } from '@pandit-abhishek1/sharedservices';
import { StatusCodes } from 'http-status-codes';
import { signinSchema } from '@authservices/schemes/signin';
import {  getUserByEmail, getUserByUsername, signToken } from '@authservices/services/auth.services';
import { AuthModel } from '@authservices/models/auth.schema';
import { omit } from 'lodash';
export async function signInController(req: Request, res: Response): Promise<void> {
    const { error } = await Promise.resolve(signinSchema.validate(req.body));
    if (error?.details) {
      throw new BadRequestError(error?.details[0]?.message!);
    }
    const { username, password } = req.body;
    const isValidEmail: boolean = isEmail(username);
    let existingUser: IAuthDocument;
    if(isValidEmail){
        existingUser = await getUserByEmail( username) as IAuthDocument;
    }
    else {
        existingUser = await getUserByUsername(username) as IAuthDocument;
    }
    // Your sign-in logic here
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials. User not found', 'SignIn validation() method error');
    }
    const isPasswordMatch: boolean =  await AuthModel.prototype.comparePassword(password, `${existingUser.password}`);
    if(!isPasswordMatch){
        throw new BadRequestError('Invalid credentials. Password mismatch', 'SignIn validation() method error');
    }
    const userJwt: string = signToken(existingUser.id!, existingUser.email!, existingUser.username!);
    const userData: IAuthDocument =  omit (existingUser, ['password']) as IAuthDocument;
    res.status(StatusCodes.OK).json({ message: 'Sign-in successful', token: userJwt, data: userData });

}
