import express, { Router} from 'express';
import { createAuthUserController } from '@authservices/controller/signup.controller';
import { signInController } from '@authservices/controller/signin.controller';
import { verifyEmailController } from '@authservices/controller/verify-email.controlller';
import { forgotPassword } from '@authservices/controller/forget-passord.controller';
const router: Router = express.Router();

export function  authRoutes  (): Router {
  router.post('/signup', createAuthUserController);
  router.post('/signin', signInController);
  router.put('/verify-email/:token', verifyEmailController);
  router.put('/forget-password', forgotPassword);
  router.put('/reset-password/:token', forgotPassword);
  router.put('/change-password', forgotPassword);
  
  return router;
}
