const knex = require('./connection.js');

function Category() {
  return knex('category');
}

// *** queries *** //

function getAll() {
  return Category().select();
}

function getCategoryByAlias(alias) {
  return Category()
    .where('alias', alias)
    .first();
}

function createCategory(category) {
  return Category()
    .insert(category)
    .returning('id');
}

function updateCategory(categoryId, updates) {
  return Category()
    .where('id', categoryId)
    .update(updates);
}

function deleteCategory(categoryId) {
  return Category()
    .where('id', categoryId)
    .del();
}


module.exports = {
  getAll,
  getCategoryByAlias,
  createCategory,
  updateCategory,
  deleteCategory,
};
