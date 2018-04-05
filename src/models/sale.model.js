const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;
const Fighter = require('./fighter.model');

const Sale = new Schema({
  fighter: { type: Schema.Types.Number, ref: 'Fighter' },
  price: Number
});

Sale.plugin(timestamps);
Sale.statics.findSales = async function(fighterQuery, offset, queryReturnLimit, sortBy, direction) {
  const fighters = await Fighter.find({ ...fighterQuery, isForSale: true }).exec()

  return this
    .find({ fighter: { $in: fighters.map(fighter => fighter._id) } })
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .sort({ [sortBy]: direction })
    .populate('fighter')
    .exec()
}

module.exports = mongoose.model('Sale', Sale);
