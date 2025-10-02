import { Client } from "@elastic/elasticsearch";
import { ClusterHealthResponse } from "@elastic/elasticsearch/lib/api/types";
import {config }from '@notification/config';
import { winstonLogger } from "@pandit-abhishek1/sharedservices";
import { Logger } from "winston";

const client = new Client({ node: config.ELASTIC_SEARCH_URL });

const logger: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'elasticsearch on notification service', 'debug');
export async function getElasticSearchConnection() {
  let isConnected: boolean = false;
  while (!isConnected) {
    try {
      await client.ping();
      isConnected = true;
      const health: ClusterHealthResponse = await client.cluster.health({});
      logger.info(`Connected to ElasticSearch: ${JSON.stringify(health)}`);
    } catch (error) {
      logger.error(`ElasticSearch not connected, retrying in 5 seconds...${error}`);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}
