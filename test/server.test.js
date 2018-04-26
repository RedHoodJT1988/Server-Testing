const mongoose = require('mongoose');
const chaihttp = require('chai-http');
const chai = require('chai');
const { assert } = chai;
const sinon = require('sinon');

const server = require('../server');
const Snake = require('../models/SnakesModel');

mongoose
  .connect('mongodb://localhost/test')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

chai.use(chaihttp);

describe('server.js', () => {
  beforeEach(done => {
    const snake = {
      name: 'Boa',
      description: 'Constricts and suffocates its prey before eating',
    };
    const snaek = new Snake(boa);
    snake.save((err, savedSnake) => {
      if (err) {
        console.log(err);
        return done();
      }
      done();
    });
  });
  afterEach(done => {
    Snake.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /weapons', () => {
    it('should get all weapons', done => {
      const Python = {
        name: 'Black Mamba',
        description: 'One of the worlds most poisonous snakes',
      };
      chai
        .request(server)
        .post('/snakes')
        .send(Python)
        .end((err, res) => {
          chai
            .request(server)
            .get('/snakes')
            .end((err, res) => {
              if (err) {
                console.error(err);
                done();
              }
              assert.equal(res.status, 200);
              assert.isArray(res.body);
              assert.lengthOf(res.body, 2);
              assert.equal(res.body[0].name, 'Boa');
              assert.equal(res.body[1].name, 'Python');
              done();
            });
        });
    });
  });

  describe('[POST] /snakes', () => {
    it('should add a new snake', done => {
      const boa = {
        name: 'Boa',
        description: 'Constricts and suffocates its prey before eating',
      };

      chai
        .request(server)
        .post('/snakes')
        .send(python)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.name, 'Python');
          assert.equal(res.status, 200);
          done();
        });
    });
  });

  describe('[DELETE] /snakes/:name', () => {
    it('should delete the specified snake', done => {
      chai
        .request(server)
        .delete('/snakes/Boa')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.name, 'Boa');
          Snake.findOne({ name: 'Boa' }, (err, snake) => {
            if (err) {
              console.log(err);
              done();
            }
            assert.notExists(snake);
            done();
          });
        });
    });
  });

  describe('[PUT] /snakes/:name', () => {
    it('should update the specified snake', done => {
      const updatedSnake = {
        name: 'Mamba',
        description: 'An amazing colored snake',
      };

      chai
        .request(server)
        .put('/snakes/Mamba')
        .send(updatedSnake)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.status, 200);
          assert.equal(res.body.name, 'Mamba');
          Snake.findOne({ name: 'Boa' }, (err, snake) => {
            if (err) {
              console.log(err);
              done();
            }
            assert.notExists(snake);
            done();
          });
        });
    });
  });
});
