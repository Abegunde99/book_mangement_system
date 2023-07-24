const { Book } = require('../models/Book');
const { ErrorResponse } = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const books = require('../data/books.json');

// @desc    create a book
// @route   POST /api/v1/books
// @access  Public
const createBook = asyncHandler(async (req, res, next) => { 
    let id = books.length + 1;
    const { title, author, year, isbn } = req.body;
    
    //check if the required fields are provided
    if (!title || !author || !year || !isbn) { 
        return next(new ErrorResponse('Please provide all the fields', 400));
    }

    //check if the book already exists
    const bookExists = books.find(book => book.isbn === isbn);
    if (bookExists) { 
        return next(new ErrorResponse('Book already exists', 400));
    }

    //create the book
    const book = Book.createBook({ id, title, author, year, isbn });
    books.push(book);
    res.status(201).json({ success: true, data: book });
})


// @desc    get all books
// @route   GET /api/v1/books
// @access  Public
const getBooks = asyncHandler(async (req, res, next) => { 
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < books.length) {
        results.next = {
            page: page + 1,
        }
    }

    if (startIndex > 0) { 
        results.previous = {
            page: page - 1,
        }
    }

    results.books = books.slice(startIndex, endIndex);
    results.total = books.length;

    res.status(200).json({ success: true, data: results });
});


// @desc    get a book
// @route   GET /api/v1/books/:isbn
// @access  Public
const getBook = asyncHandler(async (req, res, next) => { 
    const { isbn } = req.params;
    if (!isbn) {
        return next(new ErrorResponse('Please provide a valid isbn', 400));
    }
   
    const book = books.find(book => book.isbn === isbn.toString());
    if (!book) { 
        return next(new ErrorResponse('Book not found', 404));
    }
    res.status(200).json({ success: true, data: book });
});


// @desc    update a book
// @route   PUT /api/v1/books/:isbn
// @access  Public
const updateBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    //check if id is provided
    if (!id) {
        return next(new ErrorResponse('Please provide a valid id', 400));
    }

    //check if the book exists
    const book = books.find(book => book.id === parseInt(id));
    if (!book) {
        return next(new ErrorResponse('Book not found', 404));
    }

    //update the book with the provided data
    const { title, author, year, isbn } = req.body;

    //check if no data is provided
    if (!title && !author && !year && !isbn) { 
        return next(new ErrorResponse('Please provide the data to be updated', 400));
    }

    if (title) { 
        book.title = title;
    }
    if (author) { 
        book.author = author;
    }
    if (year) { 
        book.year = year;
    }
    if (isbn) { 
        book.isbn = isbn;
    }

    res.status(200).json({ success: true, data: book });
});


// @desc    delete a book
// @route   DELETE /api/v1/books/:id
// @access  Public
const deleteBook = asyncHandler(async (req, res, next) => { 
    const { id } = req.params;

    //check if the book exists
    const book = books.find(book => book.id === parseInt(id));
    if (!book) {
        return next(new ErrorResponse('Book not found', 404));
    }

    //delete the book
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.status(200).json({ success: true, data: {} });
});


//@desc    search for a book by author or title
//@route   GET /api/v1/books/search
//@access  Public
const searchBook = asyncHandler(async (req, res, next) => { 
    const { author, title } = req.query;

    //check if the author or title is provided
    if (!author && !title) { 
        return next(new ErrorResponse('Please provide an author or title', 400));
    }

    //search for the book
    let book;
    if (author) { 
        book = books.filter(book => book.author.toLowerCase() === author.toLowerCase());
    }
    if (title) { 
        book = books.filter(book => book.title.toLowerCase() === title.toLowerCase());
    }

    if (book.length === 0) { 
        return next(new ErrorResponse('Book not found', 404));
    }

    res.status(200).json({ success: true, data: book });
});


module.exports = { createBook, getBooks, getBook, updateBook, deleteBook, searchBook };