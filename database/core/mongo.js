'use strict';

const mongoose = require('mongoose');
const {logger} = require('../../logger/logger');

/**
 * @class Mongo
 */
class Mongo {
  /**
   * @constructor
   */
  constructor() { }

  /**
   * @method initMongo
   * @return {String}
   */
  async getMongoConn() {
    return new Promise((resolve, reject) => {
      try {
        const mongoConfig = {
          user: process.env.MONGO_USER,
          pass: process.env.MONGO_PWD,
          autoIndex: process.env.MONGO_AUTO_INDEX,
          autoCreate: process.env.MONGO_AUTO_CREATE,
          maxPoolSize: process.env.MONGO_POOL,
          useNewUrlParser: process.env.MONGO_URL_PARSER,
          useUnifiedTopology: process.env.MONGO_TOPOLOGY,
        };
        mongoose.connect(process.env.MONGO_URI + process.env.MONGO_DB, mongoConfig)
            .then((connection) => {
              logger.info(`getMongoConn [Coonection successfull]`);
              resolve(connection);
            }).catch((error) => {
              reject(error);
            });
      } catch (error) {
        reject(error);
      }
    });
  }
}

const mongo = new Mongo();
module.exports = {mongo};
