const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const Brawl = new Schema({
  fighter: { type: Schema.Types.Number, ref: 'Fighter' }
});

Brawl.plugin(timestamps);
module.exports = mongoose.model('Brawl', Brawl);
