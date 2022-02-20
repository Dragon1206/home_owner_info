'use strict';

const {createLogger, format, transports} = require('winston');
const consoleLogLev = process.env.CONSOLE_LEVEL;
const infoDirLoc = process.env.INFO_DIR;
const infoDirLev = process.env.INFO_LEVEL;
const errorDirLoc = process.env.ERROR_DIR;
const errorDirLev = process.env.ERROR_LEVEL;


const ennumerate = format((info) => {
  if (info.message instanceof Error) {
    info.message = Object.assign({
      message: info.message.message,
      stack: info.message.stack,
    },
    info.message,
    );
  }

  if (info instanceof Error) {
    return Object.assign({
      message: info.message,
      stack: info.stack,
    },
    info,
    );
  }
  return info;
});


const logFormat =
    (info) => {
      let message = `[${info.timestamp}][${info.level}][${info.message}]`;
      if (info.stack !== undefined) {
        message += `\nstack: ${info.stack}`;
      }
      if (info.code !== undefined) {
        message += `\nstack: ${info.code}`;
      }
      return message;
    };

// eslint-disable-next-line max-len
const color = {level: true, message: true, colors: {info: 'blue', debug: 'green', error: 'red', warn: 'yellow'}};

const logger = createLogger({
  format: format.combine(
      format.timestamp(),
      format.printf(logFormat),
      format.colorize(color),
      ennumerate(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.printf(logFormat)),
      level: consoleLogLev,
    }),
    new transports.File({
      filename: infoDirLoc,
      level: infoDirLev,
    }),
    new transports.File({
      filename: errorDirLoc,
      level: errorDirLev,
    }),

  ],
});

module.exports = {logger};
