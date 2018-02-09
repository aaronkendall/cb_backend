const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Brawl = require('../models/brawl.model');
const { queryReturnLimit } = config;

router.get('/all/:offset', function(req, res, next) {
  const { offset } = req.params;

  Brawl
    .find({})
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .populate('fighters')
    .exec()
    .then((sales) => {
      return res.status(200).send({ sales })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any sales matching those criteria' })
    })
});

router.get('/all/:offset/filter/:filter/value/:value/sortBy/:sortBy/direction/:direction', function(req, res, next) {
  const { offset, filter, value, sortBy, direction } = req.params;

  Brawl
    .find({ [`fighter.${filter}`]: { $gte: value } })
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .sort({ [sortBy]: direction })
    .populate('fighters')
    .exec()
    .then((results) => {
      return res.status(200).send({ fights: results })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any Brawls matching those criteria' })
    })
});

module.exports = router;
