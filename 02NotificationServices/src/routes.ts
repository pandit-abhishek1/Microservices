import express , {Router, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

const router: Router = Router();
export function healthRoutes(): Router{
    router.get('/notification/health', async (req: Request, res: Response) => {
        res.status(StatusCodes.OK).send('Notification Service is healthy');
    });
    return router;
}