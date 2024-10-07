const {
  addData,
  showAll,
  findOne,
  updateById,
  deleteById,
} = require('./handler');

const routes = [
  {method: 'GET', path: '/books/{id}', handler: findOne},
  {method: 'PUT', path: '/books/{id}', handler: updateById},
  {method: 'DELETE', path: '/books/{id}', handler: deleteById},
  {method: 'POST', path: '/books', handler: addData},
  {method: 'GET', path: '/books', handler: showAll},
];

module.exports = routes;
