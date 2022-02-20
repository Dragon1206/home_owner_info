'use strict';
const {model} = require('../../database/core/model');
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
        userSchema.deleteMany(query).then((result) => {
          resolve(result);
        }).catch((error) => {
          console.log(error); reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

const resourceDelete = new ResourceDelete();
module.exports = {resourceDelete};
