const ethunits = require('ethereum-units')
const express = require('express')
const router = express.Router()
const config = require('../config/config')
const Sale = require('../models/sale.model')
const { filterStringToQueryObject } = require('../lib/utils')
const { queryReturnLimit } = config

router.get('/all/:offset', function(req, res, next) {
  const { offset } = req.params;

  Sale
    .find({})
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .populate('fighter')
    .exec()
    .then((sales) => {
      return res.status(200).send({ sales })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any sales matching those criteria' })
    })
});

router.get('/find/:offset/filters/:filters/sortBy/:sortBy/direction/:direction/price/:price', function(req, res, next) {
  const { offset, filters, sortBy, direction, price } = req.params
  const weiPrice = ethunits.convert(parseFloat(price), 'ether', 'wei').floatValue()

  Sale.findSales(filterStringToQueryObject(filters), offset, queryReturnLimit, sortBy, direction, weiPrice)
    .then((results) => {
      return res.status(200).send({ sales: results })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find any sales matching those criteria' })
    })
});

module.exports = router;
