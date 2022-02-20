'use strict';
const {model} = require('../../database/core/model');
const {logger} = require('../../logger/logger');
/**
 * @class
 */
class ResourceCreate {
  /**
     * @method saveResource
     * @param {Object} obj
     * @return {Promise}
     */
  saveResource(obj) {
    return new Promise((resolve, reject) => {
      try {
        const {data} = obj;
        const userSchema = model.getUserSchema();
        userSchema.create(data.Root.Customer)
            .then((result) => {
              if (result.length > 0) {
                resolve(true);
              } else {
                logger.error(`saveResource [no data inserted]`);
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('no data inserted');
              }
            })
            .catch((error) => {
              logger.error(error);
              reject(error);
            });
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    });
  }
}

const resourceCreate = new ResourceCreate();
module.exports = {resourceCreate};
