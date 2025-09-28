import * as connection from '@notification/queues/connection'
import amqp from 'amqplib'
import abhi from '@pandit-abhishek1/sharedservices'
import {consumeAuthEmailMessages} from '@notification/queues/email.consumer'
jest.mock('@notification/queues/connection')
jest.mock('amqplib');
jest.mock('@pandit-abhishek1/sharedservices');

describe('Email Consumer',()=>{
  beforeEach(()=> {
    jest.resetAllMocks();
  })
  afterEach(()=>{
    jest.clearAllMocks();
  })
  describe('consumeAuthEmail method',()=>{
    it('should consume email messages and acknowledge them',async ()=>{
      const channel =  {
         assertExchange: jest.fn(),
         publish: jest.fn(),
         assertQueue: jest.fn(),
         bindQueue: jest.fn(),
         consume: jest.fn()
      }
      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({queue: 'auth-email-queue', messageCount:0, consumerCount:0});
      jest.spyOn(connection, 'createConnection').mockReturnValue(channel as never);
      const connectionChannel : amqp.Channel | undefined  = await connection.createConnection();
      await consumeAuthEmailMessages(connectionChannel!);
      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('jobber-email-notification', 'direct');
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('auth-email-queue', 'jobber-email-notification', 'auth-email');
    })
  })
})

