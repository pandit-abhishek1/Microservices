import express, { Router} from 'express';
import { createAuthUserController } from '@authservices/controller/signup.controller';
const router: Router = express.Router();

export function  authRoutes  (): Router {
  router.post('/signup', createAuthUserController);
  return router;
}