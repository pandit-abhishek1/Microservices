import dotenv from 'dotenv';
dotenv.config();


class Config {
public NODE_ENV : string |undefined ;
public  GATEWAY_JWT_TOKEN : string |undefined;
public  JWT_TOKEN : string |undefined;
public  SECRET_KEY_ONE : string |undefined;
public  SECRET_KEY_TWO : string |undefined;
public  CLIENT_URL : string |undefined;
public  AUTH_BASE_URL : string |undefined;
public  USER_BASE_URL : string |undefined;

public  REDIS_HOST : string |undefined;
public  ELASTICSEARCH_URL : string |undefined;
public  ELASTIC_APM_SERVER_URL : string |undefined;
public  ELASTIC_APM_SECRET_TOKEN : string |undefined;

constructor(){
    this.NODE_ENV = process.env.NODE_ENV;
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.AUTH_BASE_URL = process.env.AUTH_BASE_URL;
    this.USER_BASE_URL = process.env.USER_BASE_URL;

    this.REDIS_HOST = process.env.REDIS_HOST;
    this.ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;
    this.ELASTIC_APM_SERVER_URL = process.env.ELASTIC_APM_SERVER_URL;
    this.ELASTIC_APM_SECRET_TOKEN = process.env.ELASTIC_APM_SECRET_TOKEN;
}
}
export const config: Config = new Config();
