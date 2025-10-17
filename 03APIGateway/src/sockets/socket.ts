import {io, Socket as SocketClient} from "socket.io-client";

import { winstonLogger } from "@pandit-abhishek1/sharedservices";
import { config } from "@gateway/config";
import { Server, Socket } from "socket.io";

const logger = winstonLogger(`${config.ELASTICSEARCH_URL}`,"SocketClient","debug");

let chatSocketClient: SocketClient;
export class SocketIOAppHandler {
   private io: Server;
  gatewayCache: any;
    constructor(io: Server) {
      this.io = io;
      this.chatSocketServiceIOConnections();
    }
public listen(): void {
    this.chatSocketServiceIOConnections();
    // this.orderSocketServiceIOConnections();
    this.io.on('connection', async (socket: Socket) => {
      socket.on('getLoggedInUsers', async () => {
        const response: string[] = await this.gatewayCache.getLoggedInUsersFromCache('loggedInUsers');
        this.io.emit('online', response);
      });

      socket.on('loggedInUsers', async (username: string) => {
        const response: string[] = await this.gatewayCache.saveLoggedInUserToCache('loggedInUsers', username);
        this.io.emit('online', response);
      });

      socket.on('removeLoggedInUser', async (username: string) => {
        const response: string[] = await this.gatewayCache.removeLoggedInUserFromCache('loggedInUsers', username);
        this.io.emit('online', response);
      });

      socket.on('category', async (category: string, username: string) => {
        await this.gatewayCache.saveUserSelectedCategory(`selectedCategories:${username}`, category);
      });
    });
  }

  private chatSocketServiceIOConnections():void {
  chatSocketClient = io(`${config.SOCKET_URL}`, {
    transports: ['websocket', 'polling', 'flashsocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 5000,
    secure: true,
  });
chatSocketClient.on('connect', ()=>{
    logger.info("Chat socket connected");
});

chatSocketClient.on("disconnect", (reason:SocketClient.DisconnectReason) => {
  logger.log('error',"Disconnected from chat socket", reason);
  chatSocketClient.connect();
  })
chatSocketClient.on("connect_error", (error:Error) => {
  logger.log('error',"Gateway Chat socket connection error", error);
  chatSocketClient.connect();
  })
}
}
