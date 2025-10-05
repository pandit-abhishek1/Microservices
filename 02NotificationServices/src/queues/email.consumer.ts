import { Channel, ConsumeMessage } from 'amqplib';
import { config } from '@notification/config';
import { IEmailLocals, winstonLogger } from '@pandit-abhishek1/sharedservices';
import { Logger } from 'winston';
import { createConnection } from './connection';
import { sendEmail } from './mail.transpost';
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'emailConsumer', 'debug');
// Channel.assertExchange('emainotification', 'direct', { durable: true });
// Channel.publish('emainotification', 'auth-email', 'auth-email', 'this is a test message');
async function consumeAuthEmailMessages(channel: Channel, queueName: string): Promise<void> {
  try {
    if (!channel) {
      channel = await createConnection() as Channel;
    }
    const exchangeName = 'jobber-email-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
      const { receiverEmail, username, verifyLink, resetLink, template } = JSON.parse(msg!.content.toString());
      const locals: IEmailLocals = {
        appLink: `${config.CLIENT_URL}`,
        appIcon: 'https://i.ibb.co/Kyp2m0t/cover.png',
        username,
        verifyLink,
        resetLink
      };
      await sendEmail(template, receiverEmail, locals);
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'NotificationService EmailConsumer consumeAuthEmailMessages() method error:', error);
  }
}
// async function consumeOrderMessages(channel: Channel, queueName: string): Promise<void> {
//   try {
//     if (!channel) {
//       channel = (await createConnection()) as Channel;
//     }
//     const exchangeName = 'jobber-order-notification';
//     const routingkey = 'order-email';
//     const queueName = 'order-email-queue';

//     await channel.assertExchange(exchangeName, 'direct', { durable: true });
//     const queue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
//     await channel.bindQueue(queue.queue, exchangeName, routingkey);
//     channel.consume(queue.queue, (message: ConsumeMessage | null) => {
//       if (message) {
//         log.info(`Received message from queue ${queueName}: ${message.content.toString()}`);
//         //    send email and acknowledge message
//         channel.ack(message);
//       }
//     });
//     log.info(`Waiting for messages in queue: ${queueName}`);
//   } catch (error) {
//     log.error(`Error asserting queue ${queueName}:`, error);
//   }

//   channel.consume(queueName, (message: ConsumeMessage | null) => {
//     if (message) {
//       log.info(`Received message from queue ${queueName}: ${message.content.toString()}`);
//       channel.ack(message);
//     }
//   });
// }

export { consumeAuthEmailMessages };
