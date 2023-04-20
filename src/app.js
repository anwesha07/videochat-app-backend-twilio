// create the express app here

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const router = require('./route');
app.use('/api', router);

// const errorHandler = require('./utils');
// app.use(errorHandler);

module.exports = app;