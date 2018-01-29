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
    .find({ `fighter.${filter}`: { $gte: value } })
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .sort({ [sortBy]: direction })
    .exec()
    .then((results) => {
      return res.status(200).send({ fights: results })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any Brawls matching those criteria' })
    })
});

router.post('/add', function(req, res, next) {
  const { fighter, price } = req.body;
  new Brawl({ fighter, price }).save()
    .then((newFighter) => {
      return res.status(201).send({ fighter: newFighter, messgae: 'fighter Brawl created!' })
    })
    .catch((error) => {
      return res.status(400).send({ error, message: 'could not save fighter' })
    })
});

router.delete('/remove/:id', function(req, res, next) {
  const { id } = req.params;

  Brawl.remove({ 'fighter.id': id })
    .then(() => {
      return res.status(204).send({ message: `fighter ${id} successfully removed from Brawl`})
    })
    .catch((error) => {
      return res.status(400).send({ error, message: `fighter ${id} could not be removed from Brawl` })
    })
});

module.exports = router;
