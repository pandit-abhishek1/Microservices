import {Application} from 'express';

import { verifyGatewayRequest } from '@pandit-abhishek1/sharedservices';
import { authRoutes } from '@authservices/routes/auth.routes';
const BASE_PATH = '/api/v1/auth';
export function appRoutes(app: Application): void{
 
  app.use(BASE_PATH,  authRoutes());
  app.use('',verifyGatewayRequest, ()=>console.log('Auth Service is up and running'));
}
