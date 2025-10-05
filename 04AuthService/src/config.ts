import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
dotenv.config();

class Config {
    public GATEWAY_JWT_TOKEN: string | undefined;
    public JWT_TOKEN: string | undefined;
    public CLIENT_URL: string | undefined;
    public RABBITMQ_ENDPOINT: string | undefined;
    public NODE_ENV: string | undefined;
    public MYSQL_DB: string | undefined;
    public CLOUD_NAME: string | undefined;
    public CLOUD_API_KEY: string | undefined
    public CLOUD_API_SECRET: string | undefined
    public API_GATWAY_URL: string | undefined;
    public ELASTICSEARCH_URL: string | undefined;
    public ELASTIC_APM_SERVER_URL: string | undefined;
    public ELASTIC_APM_SECRET_TOKEN: string | undefined;

   constructor (){
       this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN;
       this.JWT_TOKEN = process.env.JWT_TOKEN;
        this.CLIENT_URL = process.env.CLIENT_URL;
       this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT;
       this.NODE_ENV = process.env.NODE_ENV;
       this.MYSQL_DB = process.env.MYSQL_DB;
       this.CLOUD_NAME = process.env.CLOUD_NAME;
       this.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
       this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
       this.API_GATWAY_URL = process.env.API_GATWAY_URL;
       this.ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;
       this.ELASTIC_APM_SERVER_URL = process.env.ELASTIC_APM_SERVER_URL;
       this.ELASTIC_APM_SECRET_TOKEN = process.env.ELASTIC_APM_SECRET_TOKEN;
   }

    public cloudinaryConfig(): void {
        cloudinary.v2.config({
            cloud_name: this.CLOUD_NAME,
            api_key: this.CLOUD_API_KEY,
            api_secret: this.CLOUD_API_SECRET,
            secure: true
        });
    }


}

const config = new Config();

export  {config};
