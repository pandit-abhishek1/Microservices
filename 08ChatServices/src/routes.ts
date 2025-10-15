import {Application} from 'express';
import { verifyGatewayRequest } from '@pandit-abhishek1/sharedservices';

const BASE_PATH = '/api/v1/chat';
export function appRoutes(app: Application): void{

  app.use('',verifyGatewayRequest, ()=>console.log('Chat Service is up and running'));
}
