// Imports
require('dotenv').config();
const chalk = require('chalk');
const debug = require('debug')('diveServer');
const express = require('express');
const morgan = require('morgan');

// DDBB connection
require('./src/config/ddbbConfig');

// Server Vars
const server = express();
const port = process.env.PORT || 5009;

// Server Routes
const equipmentRoutes = require('./src/routes/equipmentRoutes');
const immersionRoutes = require('./src/routes/immersionRoutes');
const userRoutes = require('./src/routes/userRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Server Config
server
  .use(morgan('dev'))
  .use(express.json())
  .use('/dive/equipment', equipmentRoutes)
  .use('/dive/immersion', immersionRoutes)
  .use('/dive/user', userRoutes)
  .use('/dive/item', itemRoutes)
  .use('/auth', authRoutes);

// Server Start
server.listen(
  port,
  () => { debug(`Server is running on ${chalk.magentaBright(`http://localhost:${port}`)}`); }
);
