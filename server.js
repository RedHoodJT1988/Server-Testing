const express = require('express');
const morgan = require('morgan');
const Snake = require('./models/SnakesModel');
const mongoose = require('mongoose');

const server = express();

const PORT = 5150;

server.use(morgan('combined'));
server.use(express.json());

mongoose
  .connect('mongodb://localhost/test')
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB'));

server.get('/snakes', (req, res) => {
  Snake.find({})
    .then(snakes => {
      res.status(200).send(snakes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post('/snakes', (req, res) => {
  const newSnake = req.body;
  const snake = new Snake(newSnake);
  snake
    .save()
    .then(snake => res.status(200).json(snake))
    .catch(err => res.status(500).json({ msg: 'Error saving the snake', err }));
});

server.delete('/snakes/:name', (req, res) => {
  const { name } = req.params;
  Snake.findOneAndRemove({ name })
    .then(snake => {
      res.status(200).json(snake);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/snakes/:name', (req, res) => {
  const { name } = req.params;
  const snake = req.body;
  Snake.findOneAndUpdate({ name }, snake, { new: true })
    .then(newSnake => {
      console.log('then');
      res.status(200).json(newSnake);
    })
    .catch(err => {
      console.log('catch');
      res.status(500).json(err);
    });
});

server.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${PORT}`);
});

module.exports = server;
