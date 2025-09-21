import dotenv from "dotenv";
dotenv.config();

class Config  {
  public NODE_ENV: string | undefined;
  public SERVER_PORT: number | undefined;
  public CLIENT_URL: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;

  constructor(){
     this.NODE_ENV = process.env.NODE_ENV;
     this.SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 4001;
     this.CLIENT_URL = process.env.CLIENT_URL;
     this.SENDER_EMAIL = process.env.SENDER_EMAIL;
     this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD;
     this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL;
     this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT;
  }

} 
export const config: Config = new Config();