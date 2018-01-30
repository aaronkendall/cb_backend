const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const Sale = new Schema({
  fighter: {
    id: Number,
    maxHealth: Number,
    health: Number,
    strength: Number,
    speed: Number,
    level: Number
  },
  price: Number
});

Sale.plugin(timestamps);
module.exports = mongoose.model('Sale', Sale);
