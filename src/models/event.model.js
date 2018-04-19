const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const Event = new Schema({
  _creator: { type: Schema.Types.String, ref: 'User' },
  fighterId: Number,
  type: String,
  message: String
});

Event.plugin(timestamps);
module.exports = mongoose.model('Event', Event);
