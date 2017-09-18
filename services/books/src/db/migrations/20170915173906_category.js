exports.up = function (knex, Promise) {
  return knex.schema.createTable('category', (table) => {
    table.string('id').notNullable().unique();
    table.string('name').notNullable();
    table.string('alias');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('category');
};
