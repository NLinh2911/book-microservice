process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const server = require('../src/app');
// const knex = require('../src/db/connection');

describe('books API Routes', () => {
  // beforeEach(() => {
  //   return knex.migrate.rollback()
  //   .then(() => { return knex.migrate.latest(); })
  //   .then(() => { return knex.seed.run(); });
  // });

  // afterEach(() => {
  //   return knex.migrate.rollback();
  // });

  describe('GET /api/books/ping', () => {
    it('should return "pong"', (done) => {
      chai.request(server)
        .get('/api/books/ping')
        .end((err, res) => {
          console.log(res.text);
          res.type.should.eql('text/html');
          res.text.should.eql('pong');
          done();
        });
    });
  });

  describe('GET /api/books', () => {
    it('should return all published books', (done) => {
      chai.request(server)
        .get('/api/books')
        .end((err, res) => {
          console.log(res.body.data.length);
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.status.should.equal('success');
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(4);
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('title');
          res.body.data[0].should.have.property('publish_status');
          done()
        });
    });
  });

  describe('GET /api/books/:alias', () => {
    it('should return one book by its alias', (done) => {
      chai.request(server)
        .get('/api/books/a-history-of-the-world-in-objects')
        .end((err, res) => {
          console.log(res.status);
          console.log(res.body.data);
          console.log(res.body.data.title);
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.status.should.equal('success');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('title');
          res.body.data.should.have.property('publish_status');
          res.body.data.title.should.equal('A History of the World in 100 Objects');
          res.body.data.author_id.should.equal(0);
          res.body.data.publish_status.should.equal(true);
          done();
        });
    });
  });

  describe('GET /api/books/category/:alias', () => {
    it('should return all books by category alias', (done) => {
      chai.request(server)
        .get('/api/books/category/history')
        .end((err, res) => {
          console.log(res.body.data.length);
          console.log(res.body.data[0].category_id);
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.status.should.equal('success');
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(2);
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('title');
          res.body.data[0].should.have.property('publish_status');
          done();
        });
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', (done) => {
      chai.request(server)
        .post('/api/books')
        .set('authorization', `Bearer correctToken`)
        .send({
          title: 'New Book To Add',
          alias: 'new-book-to-add',
          published_status: false
        })
        .end((err, res) => {
          console.log(res.status);
          console.log(res.body);
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.status.should.equal('success');
          res.body.data.should.equal('create book ok');
          chai.request(server)
            .get('/books/new-book-to-add')
            .end((err, res) => {
              console.log(res.body);
              res.type.should.equal('application/json');
              res.body.status.should.equal('success');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('title');
              res.body.data.title.should.eql('New Book To Add');
              done(); // put the done() callback at the end of both requests is enough to catch errs of boths
            });
        });
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update a book by id', (done) => {
      chai.request(server)
        .put('/api/books/d83a15da-ba79-4215-b117-8176bb5ac694')
        .set('authorization', `Bearer correctToken`)
        .send({})
        .end((err, res) => {
          console.log(res.body);
          console.log(res.status);
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.status.should.equal('success');
          res.body.data.should.equal('update book ok');
          done()
        });
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book by id', (done) => {
      chai.request(server)
        .delete('/api/books/d83a15da-ba79-4215-b117-8176bb5ac694')
        .set('authorization', `Bearer correctToken`)
        .end((err, res) => {
          console.log(res.body);
          console.log(res.status);
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.status.should.equal('success');
          res.body.data.should.equal('delete book ok');
          done()
        });
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should not allowed to update a book', (done) => {
      chai.request(server)
        .put('/api/books/d83a15da-ba79-4215-b117-8176bb5ac694')
        .set('authorization', `Bearer incorrectToken`)
        .send({})
        .end((err, res) => {
          console.log(res.body);
          console.log(res.status);
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.status.should.equal('Incorrect Token');
          done();
        });
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should not allowed to delete a book if not logged in', (done) => {
      chai.request(server)
        .delete('/api/books/d83a15da-ba79-4215-b117-8176bb5ac694')
        .end((err, res) => {
          console.log(res.body);
          console.log(res.status);
          res.should.have.status(400);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.status.should.equal('Please log in');
          done();
        });
    });
  });
});
