'use strict';
const {resourceProcess} = require('../service/resource/process');
const {resourceCreate} = require('../service/resource/create');
const {resourceRead} = require('../service/resource/read');
const {resourceUpdate} = require('../service/resource/update');
const {resourceDelete} = require('../service/resource/delete');
const {logger} = require('../logger/logger');

/**
 * class
 */
class ResourceController {
  /**
   * @method readXmlData
   * @param {Object} req
   * @param {Object} res
   */
  readXmlData(req, res) {
    const fileLocation = `./resource/sample.xml`;
    logger.debug(fileLocation);
    resourceProcess.readXmlData(fileLocation)
        .then(resourceCreate.saveResource)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
  }
  /**
 * @method search
 * @param {*} req
 * @param {*} res
 */
  search(req, res) {
    const object = {req: req.body};
    resourceRead.findData(object)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
  }

  /**
 * @method update
 * @param {*} req
 * @param {*} res
 */
  update(req, res) {
    const object = {req: req.body};
    resourceUpdate.updateResource(object)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
  }

  /**
 * @method delete
 * @param {*} req
 * @param {*} res
 */
  delete(req, res) {
    const object = {req: req.body};
    resourceDelete.deleteResource(object)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
  }
}
module.exports = {ResourceController};
