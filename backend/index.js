// imports
require('dotenv').config();
const chalk = require('chalk');
const debug = require('debug')('diveServer');
const express = require('express');
const morgan = require('morgan');

// Server Vars
const server = express();
const port = process.env.PORT || 5009;

// Server Config
server
  .use(morgan('dev'))
  .use(express.json());

// Server Start
server.listen(
  port,
  () => { debug(`Server is running on ${chalk.green(`http://localhost:${port}`)}`); }
);
