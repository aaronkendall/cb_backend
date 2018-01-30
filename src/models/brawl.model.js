const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const Brawl = new Schema({
  fighter: {
    id: Number,
    level: Number
  }
});

Brawl.plugin(timestamps);
module.exports = mongoose.model('Brawl', Brawl);
