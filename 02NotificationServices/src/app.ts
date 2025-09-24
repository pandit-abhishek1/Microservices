
import { Logger } from 'winston';
import { config } from '@notification/config';
import express, { Express } from 'express';
import { start } from '@notification/server';

import { winstonLogger } from '@pandit-abhishek1/sharedservices';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationApp', 'debug');

function initialize(): void {
  const app: Express = express();
  start(app);
  log.info('Notification Service Initialized');
}
initialize();