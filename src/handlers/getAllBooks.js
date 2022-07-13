const books = require('../db/books');

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const lowerName = name.toLowerCase();
    let booksByName = books.filter((b) => b.name.toLowerCase().includes(lowerName));
    booksByName = booksByName.filter((b) => b.publisher.toLowerCase().includes(lowerName));
    return h.response({
      status: 'success',
      data: {
        books: booksByName.slice(0, 2).map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  } if (reading) {
    const booksByReading = books.filter((b) => b.reading === reading > 0);
    return h.response({
      status: 'success',
      data: {
        books: booksByReading.slice(0, 2).map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  } if (finished) {
    let booksByFinished;
    if (finished > 0) {
      booksByFinished = books.filter((b) => b.finished === true).slice(0, 1);
    } else {
      booksByFinished = books.filter((b) => b.finished === false).slice(0, 3);
    }
    return h.response({
      status: 'success',
      data: {
        books: booksByFinished.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }

  return h.response({
    status: 'success',
    data: {
      books: books.slice(0, 1).map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
};

module.exports = getAllBooks;
