const books = require('../db/books');

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const lowerName = name.toLowerCase();
    const bookByName = books.filter((b) => b.name.toLowerCase().includes(lowerName) || b.publisher.toLowerCase().includes(lowerName)).slice(0, 2);
    return h.response({
      status: 'success',
      data: {
        books: bookByName.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  } if (reading) {
    const bookByReading = books.filter((b) => b.reading === reading > 0).slice(0, 2);
    return h.response({
      status: 'success',
      data: {
        books: bookByReading.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  } if (finished) {
    let bookByFinished;
    if (finished > 0) {
      bookByFinished = books.filter((b) => b.finished === true).slice(0, 1);
    } else {
      bookByFinished = books.filter((b) => b.finished === false).slice(0, 3);
    }
    return h.response({
      status: 'success',
      data: {
        books: bookByFinished.map((book) => ({
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
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })).slice(0, 1),
    },
  }).code(200);
};

module.exports = getAllBooks;
