const express = require('express');
const app = express();
const bookRouter = require('./routes/book');

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use('/api/v1/books', bookRouter)



//error handler
const { errorHandler } = require('./middlewares/error');
app.use(errorHandler);


module.exports = app;
