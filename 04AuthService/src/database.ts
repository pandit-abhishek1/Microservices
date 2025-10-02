import { Logger } from 'winston'
import {config} from '@authservices/config'
import { winstonLogger } from '@pandit-abhishek1/sharedservices'

const logger: Logger = winstonLogger(`${config.ELASTICSEARCH_URL}`,'AuthService Database connection','debug')

import {Sequelize } from 'sequelize';
console.log(`Database URL: ${config.MYSQL_DB}`)
export const sequelize: Sequelize = new Sequelize(`${config.MYSQL_DB}`, {
    dialect: 'mysql',
    logging: false,
    dialectOptions:{
      multipleStatements: true
    },
     pool: {
    max: 10,    // max connections in pool
    min: 0,     // min connections
    acquire: 30000, // 30s before giving up on connection
    idle: 10000    // close idle connection after 10s
  }
});

export async function connectToDatabase(): Promise<void> {
   try{
    await sequelize.authenticate();
    logger.log('info', 'AuthServices Database connected successfully')
   }
    catch(error){
       logger.error(`Error connecting to the database: ${error}`);
       logger.log('error', 'AuthServices Database connection failed', error)
   }
  }
