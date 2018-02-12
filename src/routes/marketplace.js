const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Sale = require('../models/sale.model');
const { queryReturnLimit } = config;

router.get('/all/:offset', function(req, res, next) {
  const { offset } = req.params;

  Sale
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

router.get('/find/:offset/filters/:filters/sortBy/:sortBy/direction/:direction', function(req, res, next) {
  const { offset, filters, sortBy, direction } = req.params;

  // filters currently are a string in the format 'filterKey: filterValue,filterKey: filterValue'
  // method here to parse them appropriately then plug that into the mongoose query

  Sale
    .find({ [`fighter.${filter}`]: { $gte: value } })
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .sort({ [sortBy]: direction })
    .populate('fighters')
    .exec()
    .then((results) => {
      return res.status(200).send({ sales: results })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any sales matching those criteria' })
    })
});

module.exports = router;
