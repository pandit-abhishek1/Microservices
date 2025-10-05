import winston, { log, Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  LogData,
  TransformedData,
} from 'winston-elasticsearch';

const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};
export const winstonLogger = (
  elasticsearchNode: string,
  name: string,
  level: string
): Logger => {
  const esTransportOpts = {
    console: {
      level: level,
      handleExceptions: true,
      json: false,
      colorsize: true,
    },
    elasticsearch: {
      level,
      transformer: esTransformer,
      clientOpts: {
        node: elasticsearchNode,
        log: level,
        maxRetries: 2,
      },
    },
  };
  const esTransport: ElasticsearchTransport = new ElasticsearchTransport(
    esTransportOpts.elasticsearch
  );
    const logger: Logger = winston.createLogger({
        exitOnError: false, // do not exit on handled exceptions
        defaultMeta: { service: name },
        
        transports: [new winston.transports.Console(esTransportOpts.console), esTransport],
  });

  return logger;
};
