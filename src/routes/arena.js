const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Brawl = require('../models/brawl.model');
const Fighter = require('../models/fighter.model');
const { filterStringToQueryObject } = require('../lib/utils')
const { calculateWinner } = require('../lib/combat')
const { queryReturnLimit } = config

router.get('/all/:offset', (req, res, next) => {
  const { offset } = req.params;

  Brawl
    .find({})
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .populate('fighters')
    .exec()
    .then((fights) => {
      return res.status(200).send({ fights })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any fights matching those criteria' })
    })
});

router.get('/all/:offset/filters/:filters/sortBy/:sortBy/direction/:direction', (req, res, next) => {
  const { offset, filters, sortBy, direction } = req.params;

  Brawl
    .find(filterStringToQueryObject(filters))
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .sort({ [sortBy]: direction })
    .populate('fighters')
    .exec()
    .then((results) => {
      return res.status(200).send({ fights: results })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any fights matching those criteria' })
    })
});

router.get('/calculateWinner/attacker/:attackerId/defender/:defenderId', async (req, res, next) => {
  const { attackerId, defenderId } = req.params

  try {
    const fighters = await Promise.all([Fighter.findOne({ _id: attackerId }), Fighter.findOne({ _id: defenderId })])
    const outcomeString = calculateWinner(fighters[0], fighters[1])
    // returns winnerId, loserId, winnersHealth in the format 'winnerId-loserId-winnersHealth' for easy processing by the contract
    return res.status(200).send({ outcomeString })
  } catch(error) {
    return res.status(404).send({ message: 'Could not find fighter', error })
  }
})

module.exports = router;
