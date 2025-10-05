import { config } from '@authservices/config';
import { winstonLogger } from '@pandit-abhishek1/sharedservices';
import { Channel } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@authservices/queues/connections';

const log: Logger = winstonLogger(`${config.ELASTICSEARCH_URL}`, 'authServiceProducer', 'debug');

export async function publishDirectMessage(
  channel: Channel,
  exchangeName: string,
  routingKey: string,
  message: string,
  logMessage: string
): Promise<void> {
  try {
    if (!channel) {
      channel = await createConnection() as Channel;
    }
    await channel.assertExchange(exchangeName, 'direct');
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'AuthService Provider publishDirectMessage() method error:', error);
  }
}
