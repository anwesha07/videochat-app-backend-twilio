// create the express app here

const express = require('express');
const { createServer } = require('http');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const router = require('./route');
const { globalErrorHandler } = require('./utils');
const createSocketServer = require('./socket');

const app = express();
app.use(cors());
const httpServer = createServer(app);
createSocketServer(httpServer);

app.use(express.json());

app.use('/api', router);

app.use(globalErrorHandler);
module.exports = httpServer;
