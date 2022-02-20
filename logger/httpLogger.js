'use strict';
const morgan = require('morgan');
const json = require('morgan-json');
const {logger} = require('./logger');


const getHttpLogger = () => {
  const format = json({
    method: ':method',
    url: ':url',
    status: ':status',
    contentLength: ':res[content-length]',
    responseTime: ':response-time',
  });
  return morgan(format, {
    stream: {
      write: (message) => {
        const {method, url, status, contentLength, responseTime} = JSON.parse(message);
        logger.info(`Http logs:: method->[${method}], url->[${url}], status->[${status}], 
        contentLength->[${contentLength}], responseTime->[${responseTime}]`);
      },
    },
  });
};

module.exports = {getHttpLogger};
