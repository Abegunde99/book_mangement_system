const express = require('express');
const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





//error handler
const { errorHandler } = require('./middlewares/error');
app.use(errorHandler);


module.exports = app;
