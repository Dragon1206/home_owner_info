'use strict';
const {model} = require('../../database/core/model');
const {logger} = require('../../logger/logger');
/**
 * @class
 */
class ResourceDelete {
  /**
     * @method deleteResource
     * @param {Object} obj
     * @return {Promise}
     */
  deleteResource(obj) {
    return new Promise((resolve, reject) => {
      try {
        const {req} = obj;
        const userSchema = model.getUserSchema();
        const input = req.CustomerId;

        const query = {
          'CustomerId': {
            $in: input,
          },
        };
        logger.info(`deleteResource query:[${query}]`);
        userSchema.deleteMany(query).then((result) => {
          logger.info(result);
          resolve(result);
        }).catch((error) => {
          logger.error(error); reject(error);
        });
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    });
  }
}

const resourceDelete = new ResourceDelete();
module.exports = {resourceDelete};
