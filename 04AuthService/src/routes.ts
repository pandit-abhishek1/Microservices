import {Application} from 'express';

export function appRoutes(app: Application): void{
  app.use('', ()=>console.log('Auth Service is up and running'));

}
