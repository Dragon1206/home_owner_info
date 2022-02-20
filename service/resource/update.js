'use strict';
const {model} = require('../../database/core/model');
/**
 * @class
 */
class ResourceUpdate {
  /**
       * @method updateResource
       * @param {Object} obj
       * @return {Promise}
       */
  updateResource(obj) {
    return new Promise((resolve, reject) => {
      try {
        const {req} = obj;
        const userSchema = model.getUserSchema();
        // eslint-disable-next-line prefer-const
        let update = {}; let filter = {};
        filter.CustomerId = [String(req.CustomerId)];
        req.ContactName !== null && req.ContactName !== undefined ?
          update.ContactName = [req.ContactName] : null;
        req.DateOfBirth !== null && req.DateOfBirth !== undefined ?
          update.DateOfBirth = [req.DateOfBirth] : null;
        req.Phone !== null && req.Phone !== undefined ?
          update.Phone = [req.Phone] : null;
        req.Address !== null && req.Address !== undefined ?
          update.Address = [req.Address] : null;
        req.City !== null && req.City !== undefined ?
          update.City = [req.City] : null;
        req.Region !== null && req.Region !== undefined ?
          update.Region = [req.Region] : null;
        req.PostalCode !== null && req.PostalCode !== undefined ?
          update.PostalCode = [req.PostalCode] : null;
        req.Country !== null && req.Country !== undefined ?
          update.Country = [req.Country] : null;
        userSchema.updateMany(filter, update)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

const resourceUpdate = new ResourceUpdate();
module.exports = {resourceUpdate};
