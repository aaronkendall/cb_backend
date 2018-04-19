const express = require('express');
const router = express.Router();
const config = require('../config/config');
const User = require('../models/event.model');
const { queryReturnLimit, webSocketTimeout } = config;

router.get('/all/:address', (req, res, next) => {
  const { address } = req.params

  User
    .findOne({ address })
    .populate('events')
    .exec()
    .then((user) => {
      return res.status(200).send({ events: user.events })
    })
    .catch((error) => {
      return res.status(404).send({ error, message: 'could not get events for address' })
    })
});

router.ws('/listen/:address', (ws, req) => {
  const { address } = req.params
  let connectionAlive = true

  ws.on('open', () => {
    const openInterval = setInterval(async () => {
      try {
        if (!connectionAlive) return clearInterval(openInterval)

        const events = await User.recentEvents(address, webSocketTimeout)
        ws.send({ events })

        connectionAlive = false
        ws.ping()
      } catch(error) {
        if (openInterval) clearInterval(openInterval)
        ws.close(500, `Error encountered and connection closed by server. Error: ${error}`)
      }
    }, webSocketTimeout)
  })

  ws.on('close', (code, reason) => {
    if (openInterval) clearInterval(openInterval)
    console.log(`web socket connection closed with ${address}, code: ${code}, reason: ${reason}`)
  })

  ws.on('pong', () => {
    connectionAlive = true
  })
})


module.exports = router;
