'use strict';
const {Resource} = require( './resource/resource.js');
/**
 * @class Router
 */
class Router {
  /**
   * @constructor
   */
  constructor() {}
  /**
   * @method initialiseRouter
   * @param {Object} app
   * @param {Object} express
   * @param {Object} schema
   * @return {String}
   */
  initialiseRouter(app, express) {
    try {
      // eslint-disable-next-line new-cap
      const router = express.Router();
      const resourceRoute = new Resource();
      resourceRoute.initResource(router);
      app.use('/sample', router);
      return app;
    } catch (error) {
      throw error;
    }
  }
}

const router = new Router();
module.exports= {router};
