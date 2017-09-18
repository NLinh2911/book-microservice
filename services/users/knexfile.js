const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:abc@localhost:5432/books_dev',
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds', 'development')
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://postgres:abc@localhost:5432/books_test',
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds', 'test')
    }
  }
};
