const express = require('express');
const router = express.Router();
const config = require('../config/config');
const User = require('../models/event.model');
const { queryReturnLimit } = config;

router.get('/all/:address/:offset', async (req, res, next) => {
  const { address, offset } = req.params;

  User
    .findOne({ address })
    .skip(offset * queryReturnLimit)
    .limit(queryReturnLimit)
    .populate('events')
    .exec()
    .then((user) => {
      return res.status(200).send({ events: user.events })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find not get information for user' })
    })
});


module.exports = router;
