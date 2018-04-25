const mongoose = require('mongoose');
const { Schema } = mongoose;

const SnakeSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    required: true,
    type: String,
  },
});

SnakeSchema.methods.getSnakeName = function() {
  return this.name;
};

SnakeSchema.methods.getSnakeName = function() {
  return this.description;
};

SnakeSchema.statics.getAllSnakes = cb => {
  Snake.find({}, (err, snakes) => {
    if (err) console.error(err);
    cb(snakes);
  });
};

const Snake = mongoose.model('Snake', SnakeSchema);
module.exports = Snake;
