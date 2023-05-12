// create the express app here

const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

const dotenv = require('dotenv');

dotenv.config();

const router = require('./route');
const { globalErrorHandler } = require('./utils');

app.use('/api', router);

app.use(globalErrorHandler);
module.exports = app;
