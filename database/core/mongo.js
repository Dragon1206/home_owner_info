'use strict';

const mongoose = require('mongoose');

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
        console.log(mongoConfig)
        mongoose.connect(process.env.MONGO_URI + process.env.MONGO_DB, mongoConfig)
            .then((connection) => {
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
