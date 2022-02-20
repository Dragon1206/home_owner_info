'use strict';
const {ResourceController} = require('../../controller/resourceController');
/**
 * @class
 */
class Resource {
  /**
     * @constructor
     */
  constructor() { }

  /**
     * @member initResource
     * @param {Object} router
     * @return {Router}
     */
  initResource(router) {
    try {
      const routerController = new ResourceController();
      router.get('/get/xml', (req, res, next) => {
        routerController.readXmlData(req, res);
      });
      router.post('/search', (req, res, next) => {
        routerController.search(req, res);
      });
      router.post('/update', (req, res, next) => {
        routerController.update(req, res);
      });
      router.post('/delete', (req, res, next) => {
        routerController.delete(req, res);
      });
      return router;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {Resource};
