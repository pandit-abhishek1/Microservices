
import {signupSchema} from '@authservices/schemes/signup'
import { Request, Response } from "express"
import { BadRequestError, firstLetterUppercase, IAuthDocument,
  IMessageDetails,
  upload
 } from "@pandit-abhishek1/sharedservices";
import { getUserByUsernameOrEmail,
  signToken
 } from "@authservices/services/auth.services";
import { UploadApiResponse } from 'cloudinary';
import { v4 as uuidV4 } from 'uuid';
import crypto from 'crypto';
import { config } from '@authservices/config';
import  {createAuthUser} from '@authservices/services/auth.services';
import { publishDirectMessage } from '@authservices/queues/auth.producer';
import { authChannel } from '@authservices/server';
import { StatusCodes } from 'http-status-codes';
export async function createAuthUserController( req: Request, res: Response ): Promise<void>{

      try {
       const { error } = await Promise.resolve( signupSchema.validate(req.body));
         if(error?.details){
        throw new BadRequestError(error?.details[0]?.message!);
      }
      } catch (error) {
        throw new BadRequestError('Invalid request data', `SignUp create() method error, ${error}`);
      }
      try {
      const { username, email, password , country, profilePicture } = req.body;
      const checkIfUserExists = await getUserByUsernameOrEmail(username, email);
      if (checkIfUserExists){
         throw new BadRequestError('Invalid credentials. Email or Username', 'SignUp create() method error');
      }
      const publicProfileId = uuidV4();
      const uploadResult: UploadApiResponse = await upload(profilePicture, publicProfileId,true, true) as UploadApiResponse;
      if(!uploadResult?.public_id){
        throw new BadRequestError('Error uploading profile picture', 'SignUp validation() method error');
      }
      const  randombytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
      const randomCharacter: string = randombytes.toString('hex');
      const authData : IAuthDocument={
         username: firstLetterUppercase(username),
          email: email.toLowerCase(email),
          profilePicture: uploadResult?.secure_url!,
          password,
          country,
          emailVerificationToken: randomCharacter,
      } as IAuthDocument;
      console.log('Auth Data: ', authData);
      const result : IAuthDocument= await createAuthUser(authData) as IAuthDocument;
      const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${randomCharacter}`;
      const messageDetails : IMessageDetails = {
        receiverEmail: result.email,
        verifyLink: verificationLink,
        template: 'verifyEmail',
      } as IMessageDetails;
      await publishDirectMessage(
        authChannel,
        'jobber-email-verification',
        'email-verification',
        JSON.stringify(messageDetails),
        'verify email message sent to notification services'
      );
      const userJwt = signToken(result.id!, result.email!, result.username!);
      res.status(StatusCodes.CREATED).json({ message: 'User created successfully',
        data: result, token: userJwt

      });
 } catch (error) {
        throw new BadRequestError('error in signup controller', `SignUp create() method error${error}`);
      }
}
