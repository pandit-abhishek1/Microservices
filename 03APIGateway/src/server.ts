
const SERVER_PORT = 4000;
import { CustomError, IErrorResponse, winstonLogger } from "@pandit-abhishek1/sharedservices";
import {Logger} from "winston";
import { Application, json, NextFunction, Request, Response,urlencoded } from "express";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieSession from "cookie-session";
import { StatusCodes } from "http-status-codes";
import http from "http";
import {config} from "@gateway/config";
import {elasticSearch } from "@gateway/elasticsearch";
import { appRoutes } from "@gateway/routes";
import { axiosAuthInstance } from "@gateway/services/api/auth.services";


const logger: Logger = winstonLogger(`${config.ELASTICSEARCH_URL}`,"API-Gateway", 'debug');

export class Server {
    private app : Application ;
    constructor(app: Application) {
        this.app = app;
    }
    public start(): void{
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        // this.startElasticSearch(this.app);
        this.errorMiddleware(this.app);
        this.startServer(this.app);
    }
    private securityMiddleware(app: Application): void {
        // Implement security middleware here (e.g., Helmet, CORS)
        app.set('trust proxy', 1); // Trust first proxy
        app.use(
            cookieSession({
                name: 'jobbersession',
                keys: [ `${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
                maxAge: 24 * 60 * 60 * 1000, // 24 hours
                secure: config.NODE_ENV === 'production', // Use secure cookies in production
                httpOnly: true, // Prevent client-side JS from accessing the cookie
                sameSite: 'lax', // CSRF protection
            })
        );
        app.use(hpp());
        app.use(helmet());
        app.use(cors({
            origin: config.CLIENT_URL,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        }));
        app.use((req: Request, _res: Response, next: NextFunction) => {
            if(req.session?.jwt) {
              axiosAuthInstance.defaults.headers['Authorization'] = `Bearer ${req.session?.jwt}`;
            }
            next();
        });
        logger.info("Security middleware applied");
    }
private standardMiddleware(app: Application): void {
       app.use(compression());
       app.use(json({ limit: '50mb' }));
       app.use(urlencoded({ extended: true, limit: '50mb' }));
       logger.info("Standard middleware applied");
   }
private routesMiddleware(app: Application): void {
     appRoutes(app);
    console.log("Routes middleware applied");
    logger.info("Routes middleware applied");

}
private startElasticSearch(app: Application): void {
      elasticSearch.checkConnection();
      logger.info("Elasticsearch connection initiated");
}
private errorMiddleware(app: Application): void {
    app.use( (req: Request, res: Response, next: NextFunction) => {
        const fulUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        logger.log('error', `Route not found: ${fulUrl}`);
        res.status(StatusCodes.NOT_FOUND).json({ message: 'the endpoint does not exist' });
    });
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
            logger.log('error', `GatewayService ${error.comingFrom}:`, error);
        res.status(error.statusCode).json(error.serializeErrors());
      }
        next();
    });
}
    private async startServer(app: Application): Promise<void> {
        try {
            const httpServer: http.Server = new http.Server(app);
            await this.startHttpServer(httpServer);

        } catch (error) {
            logger.log('error', 'Error starting server:', error);
        }

    }
 private async startHttpServer(httpServer: http.Server): Promise<void> {
   try {
    logger.info(`Gateway Server has started with process ${process.pid} on port ${SERVER_PORT}`);
    httpServer.listen(SERVER_PORT, () => {
        logger.info(`Gateway Server is listening on port ${SERVER_PORT}`);
    });
   } catch (error) {
    logger.log('error', 'GatewayServices startHttpServer: medthod', error);
   }

}
}


