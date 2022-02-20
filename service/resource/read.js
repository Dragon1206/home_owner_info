'use strict';
const {model} = require('../../database/core/model');
/**
 * @class
 */
class ResourceRead {
  /**
       * @method findData
       * @param {*} obj
       * @return {Promise}
       */
  findData(obj) {
    return new Promise((resolve, reject) => {
      try {
        const {req} = obj;
        // eslint-disable-next-line new-cap
        const search = {};
        req.CustomerId !== null && req.CustomerId !== undefined ?
        search.CustomerId = [req.CustomerId] : null;
        req.ContactName !== null && req.ContactName !== undefined ?
          search.ContactName = [req.ContactName] : null;
        req.DateOfBirth !== null && req.DateOfBirth !== undefined ?
          search.DateOfBirth = [req.DateOfBirth] : null;
        req.Phone !== null && req.Phone !== undefined ?
          search.Phone = [req.Phone] : null;
        req.Address !== null && req.Address !== undefined ?
          search.Address = [req.Address] : null;
        req.City !== null && req.City !== undefined ?
          search.City = [req.City] : null;
        req.Region !== null && req.Region !== undefined ?
          search.Region = [req.Region] : null;
        req.PostalCode !== null && req.PostalCode !== undefined ?
          search.PostalCode = [req.PostalCode] : null;
        req.Country !== null && req.Country !== undefined ?
          search.Country = [req.Country] : null;
        req.Age !== null && req.Age !== undefined ?
          search.Age = [req.Age] : null;
        const userSchema = model.getUserSchema();
        userSchema.find(search, {_id: 0}).then((result) => {
          resolve(result);
        }).catch((error) => {
          console.log(error); reject(error);
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
const resourceRead = new ResourceRead();
module.exports = {resourceRead};
