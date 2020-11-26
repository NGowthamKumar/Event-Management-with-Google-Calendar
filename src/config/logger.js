const {createLogger, transports, format} = require('winston');
require('winston-mongodb');

export const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: 'info',
      db: process.env.DB_URI,
      collection: 'logs',
      format: format.combine(format.timestamp(), format.simple()),
    }),
  ],
});
