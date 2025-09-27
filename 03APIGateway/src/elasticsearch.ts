import { winstonLogger } from "@pandit-abhishek1/sharedservices";
import { Logger } from "winston";
import {config } from "@gateway/config";
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from "@elastic/elasticsearch/lib/api/types";
const logger : Logger = winstonLogger(`${config.ELASTIC_APM_SERVER_URL}`, "API-Gateway", 'debug');

class ElasticSearch {
  private elasticsearchClient: Client;
  constructor() {
    this.elasticsearchClient = new Client({ node: `${config.ELASTICSEARCH_URL}` });
    node: `${config.ELASTICSEARCH_URL}`
  }
  public async checkConnection(): Promise<boolean> {
    let isConnected = false;
    while( !isConnected ) {
      logger.info('Attempting to connect to Elasticsearch...');
      try {
          const health: ClusterHealthResponse = await this.elasticsearchClient.cluster.health({});

      logger.info(`Elasticsearch cluster health: ${health.status}`);
      isConnected = true;
      }
      catch (error) {
        logger.error(`Connection with elasticsearch failed, retrying...: ${error}`);
        logger.log('error', 'GatewayService checkconnection() method', error);
      }
    }
    return isConnected;
  }
}

export const elasticSearch: ElasticSearch = new ElasticSearch();
