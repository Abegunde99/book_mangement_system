const express = require('express');
const app = express();
const bookRouter = require('./routes/book');
const cors = require('cors');

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use(cors());

//routes
app.get('/', (req, res) => { 
    res.status(200).json({ success: true, message: 'Welcome to the Book API' });
});

app.use('/api/v1/books', bookRouter)



//error handler
const { errorHandler } = require('./middlewares/error');
app.use(errorHandler);


module.exports = app;
