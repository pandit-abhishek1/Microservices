import 'express-async-errors';
import { Application } from 'express';
import http from 'http';
import { config } from '@notification/config';
import { winstonLogger } from '@pandit-abhishek1/sharedservices';
import { Logger} from 'winston';
import {healthRoutes} from './routes';

const SERVER_PORT = config.SERVER_PORT || 4001;

const log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'NotificationService','debug') as Logger;


 export   function start (app: Application) : void {
       startServer(app);
       startElasticSearch();
       startQueues();
       app.use(healthRoutes());
    }

    function startElasticSearch(): void {}
    
    async function startQueues(): Promise<void> {

    }

    
    function startServer(app: Application): void {
        try {
            const httpServer: http.Server = new http.Server(app);
            log.info(`worker with process id of ${process.pid}  at notification service`);
            httpServer.listen(SERVER_PORT, ()=>{
                log.info(`Server started on port ${SERVER_PORT} at notification service`);
            });
        } catch (error) {
            log.log('error', 'NotificationService startServer() method:', error);
        }
    }