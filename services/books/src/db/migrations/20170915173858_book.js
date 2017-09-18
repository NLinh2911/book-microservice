exports.up = function (knex, Promise) {
  return knex.schema.createTable('book', (table) => {
    table.string('id').notNullable().unique();
    table.string('title').notNullable();
    table.string('alias');
    table.specificType('category_id', 'text[]');
    table.specificType('author_id', 'text[]');
    table.text('description');
    table.string('image');
    table.timestamp('created_at', true).defaultTo(knex.fn.now());
    table.timestamp('published_at', true).defaultTo(knex.fn.now());
    table.timestamp('modified_at', true).defaultTo(knex.fn.now());
    table.boolean('publish_status').defaultTo(false);
    table.string('download_link');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('book');
};
