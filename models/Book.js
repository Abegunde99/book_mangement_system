class Book {
    constructor(id, title, author, year, isbn) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isbn = isbn;
    }

    static createBook({ id, title, author, year, isbn }) { 
        return new Book(id, title, author, year, isbn);
    }
}

module.exports = { Book };