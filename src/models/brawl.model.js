const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { Schema } = mongoose;
const Fighter = require('./fighter.model');

const Brawl = new Schema({
  fighter: { type: Schema.Types.Number, ref: 'Fighter' }
});

Brawl.plugin(timestamps);
Brawl.statics.findBrawls = async function(fighterQuery, offset, queryReturnLimit, sortBy, direction) {
  const fighters = await Fighter.find({ ...fighterQuery, isInArena: true }).exec()

  return this
    .find({ fighter: { $in: fighters.map(fighter => fighter._id) } })
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .sort({ [sortBy]: direction })
    .populate('fighter')
    .exec()
}
module.exports = mongoose.model('Brawl', Brawl);
