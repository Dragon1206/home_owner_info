'use strict';

const {model} = require('../../database/core/model');
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
              // eslint-disable-next-line prefer-promise-reject-errors
                reject('no data inserted');
              }
            })
            .catch((error) => {
              reject(error);
            });
      } catch (error) {
        reject(error);
      }
    });
  }
}

const resourceCreate = new ResourceCreate();
module.exports = {resourceCreate};
