const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const Fighter = new Schema({
  _id: { type: Number, unique: true, required: true },
  level: Number,
  strength: Number,
  speed: Number,
  health: Number,
  maxHealth: Number,
  isForSale: { type: Boolean, required: true, default: false },
  isInArena: { type: Boolean, required: true, default: false }
});

Fighter.plugin(timestamps);
module.exports = mongoose.model('Fighter', Fighter);
