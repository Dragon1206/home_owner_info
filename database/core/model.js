'use strict';
const {mongoose} = require('mongoose');
const {userSchema} = require('../schema/user.js');

/**
 * @class
 */
class Model {
  /**
   * @constructor
   */
  constructor() {
    this.userModel = mongoose.model('user', userSchema.getUserSchema(), 'user');
  }
  /**
 * @method getUserSchema
 * @return {Object}
 */
  getUserSchema() {
    try {
      return this.userModel;
    } catch (error) {
      return error;
    }
  };
}

const model = new Model();
module.exports = {model};
