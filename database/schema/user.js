'use strict';
const mongoose = require('mongoose');

/**
 * @class
 */
class UserSchema {
  /**
  * @method getUserSchema
  * @return {Object}
  */
  getUserSchema() {
    const object = new mongoose.Schema({any: mongoose.Schema.Types.Mixed}, {versionKey: false, strict: false});
    return object;
  }
}
const userSchema = new UserSchema();
module.exports = {userSchema};
