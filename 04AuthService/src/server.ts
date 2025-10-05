import 'express-async-errors';
import { IAuthPayload, winstonLogger,IErrorResponse, CustomError } from '@pandit-abhishek1/sharedservices';
import { config } from '@authservices/config';
import {Logger} from 'winston';
import { StatusCodes } from 'http-status-codes';
const SERVER_PORT= 4002;
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import {verify} from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import {appRoutes} from '@authservices/routes';
import { Channel } from 'amqplib';
import { createConnection } from './queues/connections';
const  logger: Logger= winstonLogger(`${config.ELASTICSEARCH_URL}`, 'AuthService server', 'debug');
export let authChannel: Channel;
export function start(app: Application){
            securityMiddleware(app);
            standardMiddleware(app);
            routesMiddleware(app);
            startQueues();
            errorMiddleware(app);
            startServer(app);
}
function securityMiddleware(app: Application): void{
  app.set('trust proxy', 1); // trust first proxy
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATWAY_URL,
      credentials: true,
      methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ],

    })
  );
  //
  app.use((req:Request, _res:Response, next: NextFunction)=>{
      if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        const payload : IAuthPayload  = verify( token, config.JWT_TOKEN!) as IAuthPayload;
        req.currentUser = payload;
      }
      next();
  })
}

function standardMiddleware(app: Application): void{
  app.use(compression());
  app.use(express.json({ limit: '200mb' }));
  app.use(express.urlencoded({ extended: true, limit: '200mb' }));

}

function routesMiddleware(app: Application):void{
     appRoutes(app);
}
async function startQueues(): Promise<void> {
  authChannel = await createConnection() as Channel;
}


function errorMiddleware(app: Application): void{
   app.use( (req: Request, res: Response, next: NextFunction) => {
        const fulUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        logger.log('error', `Route not found: ${fulUrl}`);
        res.status(StatusCodes.NOT_FOUND).json({ message: 'the endpoint does not exist' });
        next();
      });
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
            logger.log('error', `GatewayService ${error.comingFrom}:`, error);
        res.status(error.statusCode).json(error.serializeErrors());
      }
        next();
    });
}

function startServer(app: Application): void{

  try {
    const httpServer= new http.Server(app);
    logger.log('info', `AuthService: process running with processId ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      logger.log('info', `AuthService: Server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    logger.log('error', `AuthServices: :`, error);
  }
}
