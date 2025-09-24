import {IEmailLocals, winstonLogger } from "@pandit-abhishek1/sharedservices";
import {config} from '@notification/config';
import { Logger } from "winston";
import { emailTemplates } from "@notification/helper";
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail( template: string, receivedEmailLocals:  string, locals: IEmailLocals): Promise<void> {
   try {
       await emailTemplates(template, receivedEmailLocals, locals);
   } catch (error) {
       log.error(`Error sending email: ${error}`);
   }
}

export {sendEmail};