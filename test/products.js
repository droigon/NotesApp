//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Notes', () => {
  // Consts
  const id = '3',
    numNotes = 5,
    successCode = 200,
    note = {
      name: 'hello',
      description: 'hello',
      price: '1170',
    },
    testName = 'Cannon EOS 80D DSLR Camera',
    testPrice = { title: 'hello', price: '778' };

  /*
  * Test for /GET
  */
  describe('/GET note', () => {
    it('it should GET all the notes', done => {
      chai.request(server)
        .get('/api/notes')
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(numNotes);
          done();
        });
    });
  });
  /*
  * Test for /POST
  */
  describe('/POST note', () => {
    it('it should POST a note ', done => {
      chai.request(server)
        .post('/api/notes')
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('price');
          res.body.should.have.property('id');
          done();
        });
    });
  });
  /*
  * Test for /GET:id
  */
  describe('/GET/:id note', () => {
    it('it should GET a book by the given id', done => {
      chai.request(server)
        .get(`/api/notes/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('description');
          res.body.should.have.property('price');
          res.body.should.have.property('name').eql(testName);
          done();
        });
    });
  });
  /*
  * Test for /PUT:id
  */
  describe('/PUT/:id note', () => {
    it('it should UPDATE a note given the id', done => {
      chai.request(server)
        .put(`/api/notes/${id}`)
        .send(testPrice)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('name').eql(testName);
          res.body.should.have.property('description');
          res.body.should.have.property('price').eql(testPrice.price);
          done();
        });
    });
  });
  /*
  * Test for /DELETE:id
  */
  describe('/DELETE/:id note', () => {
    it('it should DELETE a note given the id', done => {
      chai.request(server)
        .delete(`/api/notes/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Note ${id} removed`);
          done();
        });
    });
  });
});
