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
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'jobber-email-notification';
    const routingkey = 'auth-email';
    const queueName = 'auth-email-queue';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    const queue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(queue.queue, exchangeName, routingkey);
    channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
      if (msg) {
        const {
          receiveEmail,
          username,
          template,
          sender,
          offerLink,
          amount,
          buyerUsername,
          sellerUsername,
          title,
          description,
          deliveryDays,
          orderId,
          orderDue,
          requirements,
          orderUrl,
          originalDate,
          newDate,
          reason,
          subject,
          header,
          type,
          message,
          serviceFee,
          total
        } = JSON.parse(msg.content.toString());
        const locals: IEmailLocals = {
          appLink: config.CLIENT_URL || 'http://localhost:3000',
          appIcon: 'https://unsplash.com/photos/a-man-wearing-a-garment-UsOq2e-y2xc',
          username,
          sender,
          offerLink,
          amount,
          buyerUsername,
          sellerUsername,
          title,
          description,
          deliveryDays,
          orderId,
          orderDue,
          requirements,
          orderUrl,
          originalDate,
          newDate,
          reason,
          subject,
          header,
          type,
          message,
          serviceFee,
          total
        };
        if(template=== 'orderPlaced'){
          await sendEmail("orderPlaced",receiveEmail, locals);
          await sendEmail('orderReceipt',receiveEmail, locals);
       }
       else {
         await sendEmail(template,receiveEmail, locals);
        }
       channel.ack(msg!);
      }
    });
    log.info(`Waiting for messages in queue: ${queueName}`);
  } catch (error) {
    log.error(`Error asserting queue ${queueName}:`, error);
  }

  channel.consume(queueName, (message: ConsumeMessage | null) => {
    if (message) {
      log.info(`Received message from queue ${queueName}: ${message.content.toString()}`);
      channel.ack(message);
    }
  });
}

async function consumeOrderMessages(channel: Channel, queueName: string): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'jobber-order-notification';
    const routingkey = 'order-email';
    const queueName = 'order-email-queue';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    const queue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(queue.queue, exchangeName, routingkey);
    channel.consume(queue.queue, (message: ConsumeMessage | null) => {
      if (message) {
        log.info(`Received message from queue ${queueName}: ${message.content.toString()}`);
        //    send email and acknowledge message
        channel.ack(message);
      }
    });
    log.info(`Waiting for messages in queue: ${queueName}`);
  } catch (error) {
    log.error(`Error asserting queue ${queueName}:`, error);
  }

  channel.consume(queueName, (message: ConsumeMessage | null) => {
    if (message) {
      log.info(`Received message from queue ${queueName}: ${message.content.toString()}`);
      channel.ack(message);
    }
  });
}

export { consumeAuthEmailMessages, consumeOrderMessages };
