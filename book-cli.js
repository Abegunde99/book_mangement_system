const axios = require('axios');
const readline = require('readline');

const BASE_URL = 'http://localhost:5009/api/v1/books'; // Replace with your actual API URL

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createBook() {
  rl.question('Enter book title: ', (title) => {
    rl.question('Enter book author: ', (author) => {
      rl.question('Enter publication year: ', (year) => {
        rl.question('Enter ISBN number: ', (isbn) => {
          const newBook = { title, author, year: parseInt(year), isbn };
          axios.post(BASE_URL, newBook)
            .then(response => {
              console.log('Book created:', response.data);
              displayMenu();
              rl.prompt();
            })
            .catch(error => {
              console.error('Error creating book:', error.response.data);
              displayMenu();
              rl.prompt();
            });
        });
      });
    });
  });
}

function viewAllBooks() {
  axios.get(BASE_URL)
    .then(response => {
      console.log('All Books:', response.data);
      displayMenu();
      rl.prompt();
    })
    .catch(error => {
      console.error('Error viewing all books:', error.response.data);
      displayMenu();
      rl.prompt();
    });
}

function viewBookByISBN() {
  rl.question('Enter ISBN number of the book to view: ', (isbn) => {
    axios.get(`${BASE_URL}/${isbn}`)
      .then(response => {
        console.log('Book:', response.data);
        displayMenu();
        rl.prompt();
      })
      .catch(error => {
        console.error('Error viewing book:', error.response.data);
        displayMenu();
        rl.prompt();
      });
  });
}

function updateBook() { 
    rl.question('Enter ID of the book to update: ', (id) => {
        rl.question('Enter book title: ', (title) => { 
            rl.question('Enter book author: ', (author) => { 
                rl.question('Enter publication year: ', (year) => { 
                    rl.question('Enter ISBN number: ', (isbn) => { 
                        const newBook = { title, author, year: parseInt(year), isbn };
                        axios.put(`${BASE_URL}/${id}`, newBook)
                            .then(response => {
                                console.log('Book updated:', response.data);
                                displayMenu();
                                rl.prompt();
                            })
                            .catch(error => {
                                console.error('Error updating book:', error.response.data);
                                displayMenu();
                                rl.prompt();
                            });
                    });
                });
            });
        })
    });
}

function deleteBook() { 
    rl.question('Enter ID of the book to delete: ', (id) => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(response => {
                console.log('Book deleted:', response.data);
                displayMenu();
                rl.prompt();
            })
            .catch(error => {
                console.error('Error deleting book:', error.response.data);
                displayMenu();
                rl.prompt();
            });
    });
}

function searchBookByTitle() { 
    rl.question('Enter title of the book to search: ', (title) => { 
        axios.get(`${BASE_URL}/search?title=${title}`)
            .then(response => {
                console.log('Book searched:', response.data);
                displayMenu();
                rl.prompt();
            })
            .catch(error => {
                console.error('Error searching book:', error.response.data);
                displayMenu();
                rl.prompt();
            });
    });
}

function searchBookByAuthor() { 
    rl.question('Enter author of the book to search: ', (author) => { 
        axios.get(`${BASE_URL}/search?author=${author}`)
            .then(response => {
                console.log('Book searched:', response.data);
                displayMenu();
                rl.prompt();
            })
            .catch(error => {
                console.error('Error searching book:', error.response.data);
                displayMenu();
                rl.prompt();
            });
    });
}

function displayMenu() {
  console.log('\nBook Management CLI:');
  console.log('1. Create Book');
  console.log('2. View All Books');
    console.log('3. View Book by ISBN');
    console.log('4. Update Book');
    console.log('5. Delete Book');
    console.log('6. Search Book by Title');
    console.log('7. Search Book by Author');
  console.log('8. Exit');
}

function handleUserInput(choice) {
  switch (choice) {
    case '1':
      createBook();
      break;
    case '2':
      viewAllBooks();
      break;
    case '3':
      viewBookByISBN();
          break;
      case '4':
          updateBook();
          break;
      case '5':
          deleteBook();
          break;
      case '6':
          searchBookByTitle();
          break;
      case '7':
          searchBookByAuthor();
          break;
    case '8':
      console.log('Exiting...');
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      displayMenu();
      rl.prompt();
  }
}

function main() {
  displayMenu();
  rl.prompt();

  rl.on('line', (line) => {
    handleUserInput(line.trim());
  });

  rl.on('close', () => {
    console.log('Goodbye!');
  });
}

main();
