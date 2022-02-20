'use strict';
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, `config/${process.env.NODE_ENV}.env`)});
const {logger} = require('./logger/logger');
const host = process.env.HOST;

const {mongo} = require('./database/core/mongo');
const {init, port} = require('./index.js');
initServer();
/**
 * @function
 */
async function initServer() {
  const server = init();
  try {
    await mongo.getMongoConn();
    server.listen(port, host, () => {
      logger.info(`server started on port -> ${port}`);
    });
  } catch (error) {
    logger.error(error);
  }
}
