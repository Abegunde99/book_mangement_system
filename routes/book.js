const { createBook, getBooks, getBook, updateBook, deleteBook, searchBook } = require('../controllers/book');
const express = require('express');
const router = express.Router();

router.route('/').post(createBook).get(getBooks);
router.route('/search').get(searchBook);
router.route('/:id').put(updateBook).delete(deleteBook);
router.route('/:isbn').get(getBook);

module.exports = router;