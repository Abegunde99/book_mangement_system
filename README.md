# Book Management System

The Book Management System is a simple Node.js application that allows users to manage a collection of books. It provides a RESTful API for performing CRUD operations (Create, Read, Update, Delete) on books and includes a command-line interface (CLI) for interacting with the API.

## Documentation
```bash
https://documenter.getpostman.com/view/21616732/2s946maAKR
```

##  Hosted Application

```bash
https://book-management-system-gzjd.onrender.com
```

## Requirements

- Node.js and npm should be installed on your system.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/abegunde99/book_management_system.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory of the project. The file should contain the following environment variables:

    ```bash
    touch .env
    ```

    ```bash
    # .env
    
    PORT=5009
    ```
4. Start the server:

    ```bash
    npm start
    ```
    
    The server will run on `http://localhost:5009`.

## API Endpoints

The API provides the following endpoints:

- `POST /api/v1/books`: Create a new book.
- `GET /api/v1/books`: View all books.
- `GET /api/v1/books/:isbn`: View a single book by its ISBN number.
- `PUT /api/v1/books/:id`: Update book details.
- `DELETE /api/v1/books/:id`: Delete a book.
- `GET /api/v1/books/search?title=${the title} || author=${the author}`: Search for a book by title or author.

## Book Object

A book object has the following properties:

- `title` (string): The title of the book.
- `author` (string): The author of the book.
- `year` (number): The publication year of the book.
- `isbn` (string): The ISBN number of the book.

## CLI Usage

The CLI allows you to interact with the API from the terminal. To use the CLI, run the following command:

```bash
    npm run cli
    
    # OR

    node book-cli.js
    
```
    

The CLI provides the following options:

1. Create Book: Add a new book to the collection.
2. View All Books: Display all books in the collection.
3. View Book by ISBN: View a specific book by its ISBN number.
4. Update Book: Update book details.
5. Delete Book: Remove a book from the collection.
6. Search Books: Search for a book by title or author.
7. Exit: Quit the CLI.

## Unit Tests

To run unit tests, use the following command:

```bash
npm test
```


The tests are implemented using Jest and test the functionality of the API endpoints.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).
