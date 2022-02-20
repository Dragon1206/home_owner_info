'use strict';
const fs = require('fs');
const xml2js = require('xml2js');
const axios = require('axios').default;
const googleApi = process.env.GOOGLE_API;
const googleApiKey = process.env.GOOGLE_KEY;
/**
 * @class
 */
class ResourceProcess {
  /**
     * @method readXmlData
     * @param {Object} obj
     * @return {Promise}
     */
  async readXmlData(obj) {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(obj, (error, xml) => {
          xml2js.parseString(xml, async (err, data) => {
            const length = data.Root.Customer.length;
            // eslint-disable-next-line prefer-const
            for (let i = 0; i < length; i++) {
              data.Root.Customer[i].Age = this.getAge(data.Root.Customer[i].DateOfBirth[0]);
              const url = this.getGeoLocationUrl(data.Root.Customer[i].Address[0], data.Root.Customer[i].Region[0]);
              data.Root.Customer[i].GeoLocation = await this.getGeoLocation(url);
            }
            const object = {data};
            resolve(object);
          });
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  /**
   * @method getAge
   * @param {String} date
   * @return {Number}
   */
  getAge(date) {
    try {
      const customerDateOfBirth = new Date(date);
      const getUtcDate = new Date();
      if (customerDateOfBirth < getUtcDate) {
        const timeDiff = getUtcDate.getTime() - customerDateOfBirth.getTime();
        /** Number of seconds in a year without counting leap years */
        const getDayDiff = (timeDiff / 31536000000).toFixed(0);
        return [getDayDiff];
      } else {
        return [null];
      }
    } catch (error) {
      return [null];
    }
  }

  /**
   * @method getGeoLocationUrl
   * @param {String} customerAddress
   * @param {String} customerRegion
   * @return {String}
   */
  getGeoLocationUrl(customerAddress, customerRegion) {
    try {
      let url = googleApi;
      const address = customerAddress.split(' ');
      const region = customerRegion;
      if (address.length > 0) {
        for (const i in address) {
          if (i < address.length - 1) {
            url += address[i] + '+';
          } else {
            url += address[i];
          }
        }
        if (region !== null) {
          url += `+${region}`;
        }
      }
      url += googleApiKey;
      return url;
    } catch (error) {
      return null;
    }
  }

  /**
   * @method getGeoLocation
   * @param {Object} object
   * @return {Promise}
   */
  async getGeoLocation(object) {
    try {
      const coordinates = await axios.get(object);
      if (coordinates.data.status === 'REQUEST_DENIED') {
        return [null];
      } else {
        return coordinates.data.results;
      }
    } catch (error) {
      return error;
    }
  }
}
const resourceProcess = new ResourceProcess();
module.exports = {resourceProcess};
