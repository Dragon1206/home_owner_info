'use strict';

const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

/**
 * @class
 */
class DbConnector {
  /**
     * @method getMongoDbServer
     * @return {Promise}
     */
  async getMongoDbServer() {
    const mongod = await MongoMemoryServer.create();
    return mongod;
  }
  /**
     * @method getMongoDbConn
     * @param {String} uri
     * @return { Promise}
     */
  getMongoDbConn(uri) {
    return new Promise((resolve, reject) => {
      mongoose.connect(uri,
          {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
     * @method closeMongoDbConnection
     * @param {Object} mongod
     */
  async closeMongoDbConnection(mongod) {
    if (mongod) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongod.stop();
    }
  }
}

const dbConnector = new DbConnector();
module.exports = {dbConnector};
