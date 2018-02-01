const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;

const Sale = new Schema({
  fighter: { type: Schema.Types.ObjectId, ref: 'Fighter' },
  price: Number
});

Sale.plugin(timestamps);
module.exports = mongoose.model('Sale', Sale);
