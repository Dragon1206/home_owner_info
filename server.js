'use strict';
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.resolve(__dirname, `config/${process.env.NODE_ENV}.env`)});
const host = process.env.HOST;

const {mongo} = require('./database/core/mongo');
const {init, port} = require('./index.js');
initServer();
/**
 * @function
 */
async function initServer() {
  const server = init();
  await mongo.getMongoConn();
  server.listen(port, host, () => {
    console.log(`server started on port:[${port}]`);
  });
}
