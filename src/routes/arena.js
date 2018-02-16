const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Brawl = require('../models/brawl.model');
const { filterStringToQueryObject } = require('../lib/utils')
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

router.post('/fight', (req, res, next) => {
  console.log(req.body)

//   _addFighterType('Mob Boss', 'Mob Boss');
// _addFighterType('Local MMA Star', 'Henchman');
// _addFighterType('Roadman', 'Local MMA Star');
// _addFighterType('Henchman', 'Roadman');
  // returns winnerId, loserId, winnersHealth in the format 'winnerId-loserId-winnersHealth' for easy processing by the contract
  return res.status(200).send({ outcomeString: '2-1-5' })
})

module.exports = router;
