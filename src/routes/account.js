const express = require('express');
const router = express.Router();
const config = require('../config/config');
const User = require('../models/user.model');
const { queryReturnLimit } = config;

router.get('/:address', async (req, res, next) => {
  const { address } = req.params;

  User
    .findOneAndUpdate({ address }, {}, { upsert: true, new: true, setDefaultsOnInsert: true })
    .populate('fighters')
    .populate('events')
    .exec()
    .then((user) => {
      return res.status(200).send({ user })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not find not get information for user' })
    })
});


module.exports = router;
