import express, {Express } from 'express';
import {config} from '@authservices/config';
import {start} from '@authservices/server';
import { connectToDatabase } from './database';





const initialize = ():void => {
  const app: Express = express();
  connectToDatabase();
  config.cloudinaryConfig();
  start(app);
}
initialize();
