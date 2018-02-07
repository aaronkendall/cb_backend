const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const User = new Schema({
  address: { type: String, required: true, unique: true },
  fighters: [{ type: Schema.Types.Number, ref: 'Fighter' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

User.plugin(timestamps);
module.exports = mongoose.model('User', User);
