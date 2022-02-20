const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)});

const express = require('express');
const cors = require('cors');
const {logger} = require('./logger/logger');
const {getHttpLogger} = require('./logger/httpLogger');
const {router} = require('./router/router');
const port = process.env.PORT;
module.exports = {init, port};

/**
 * @function init
 * @return {Object}
 */
function init() {
  try {
    logger.info('server intialising');
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.set(port);
    app.use(cors());
    app.use((err, req, res, next) => {
      if (err.status === 400) {
        logger.error(err);
        return res.sendStatus(err.status);
      }
      return next(err);
    });
    app.use(getHttpLogger());
    const appRoute = router.initialiseRouter(app, express);
    return appRoute;
  } catch (error) {
    logger.error(error);
  }
}

