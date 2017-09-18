const knex = require('./connection.js');

function Book() {
  return knex('book');
}

// *** queries *** //

function getAll() {
  return Book().select('id', 'title', 'alias', 'category_id', 'author_id', 'description', 'image', 'published_at');
}

function getBookByAlias(alias) {
  return Book()
    .where('alias', alias)
    .first();
}

function getBookByCategory(categoryId) {
  return Book().select().where(knex.raw('? ILIKE ANY (category_id)', categoryId));
}

function createBook(book) {
  return Book()
    .insert(book)
    .returning('id');
}

function updateBook(bookId, updates) {
  return Book()
    .where('id', bookId)
    .update(updates);
}

function deleteBook(bookId) {
  return Book()
    .where('id', bookId)
    .del();
}

// function searchBook(text) {

// }

module.exports = {
  getAll,
  getBookByAlias,
  getBookByCategory,
  createBook,
  updateBook,
  deleteBook,
};
