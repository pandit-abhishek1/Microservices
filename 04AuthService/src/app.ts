import express, {Express } from 'express';

import {start} from '@authservices/server';
import { connectToDatabase } from './database';





const initialize = ():void => {
  const app: Express = express();
  connectToDatabase();
  start(app);
}
initialize();
