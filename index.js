const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)});

const express = require('express');
const cors = require('cors');

const {router} = require('./router/router');
const port = process.env.PORT;
module.exports = {init, port};

/**
 * @function init
 * @return {Object}
 */
function init() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.set(port);
    app.use(cors());
    app.use((err, req, res, next) => {
      if (err.status === 400) {
        console.log(err);
        return res.sendStatus(err.status);
      }
      return next(err);
    });
    const appRoute = router.initialiseRouter(app, express);
    return appRoute;
  } catch (error) {
    console.log(error);
  }
}

