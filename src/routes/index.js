const booksRoutes = require('./books.routes');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'BookSelf API',
  },
  {
    method: '*',
    path: '/{any*}',
    handler: () => '404 | Not Found!',
  },
  ...booksRoutes,
];

module.exports = routes;
