const mongoose = require('mongoose');
const chai = require('chai');
const { assert } = chai;
const sinon = require('sinon');
const Snake = require('../models/SnakesModel');

describe('Snakes', () => {
  describe('getSnakeName', () => {
    it('should return the correct snake name', () => {
      const newSnake = {
        name: 'Boa',
        description: 'Constricts and suffocates its prey before eating',
      };
      const snake = new Snake(newSnake);
      assert.equal(snake.getSnakeName(), 'Boa');
    });
    describe('getSnakeDescription', () => {
      it('should return the correct snake description', () => {
        const newSnake = {
          name: 'Boa',
          description: 'Constricts and suffocates its prey before eating',
        };
        const snake = new Snake(newSnake);
        assert.equal(
          snake.getSnakeDesc(),
          'Constricts and suffocates its prey before acting'
        );
      });
      describe('getAllSnakes', () => {
        it('should return all snakes', () => {
          const snakeStub = sinon.stub(Snake, 'find');
          snakeStub.yields(null, [
            {
              name: 'Boa',
              description: 'Constricts and suffocates its prey before eating',
            },
            {
              name: 'Diamondback',
              description: 'Rattles its tail to warn off enemies',
            },
          ]);
          Snake.getAllSnakes(snakes => {
            assert.equal(snakes.length, '2');
            assert.equal(snakes[0].name, 'Boa');
          });
        });
      });
    });
  });
});
