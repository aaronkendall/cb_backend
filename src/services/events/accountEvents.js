const Fighter = require('../../models/fighter.model')
const User = require('../../models/user.model')
const Event = require('../../models/event.model')

const accountEvents = (contract) => {
  contract.Creation((error, tx) => {
    if (error) return console.log('Error with Fighter Creation ', error);

  })

  contract.Transfer((error, tx) => {
    if (error) return console.log('Error with Fighter Creation ', error);
  })

  contract.AttributeIncrease((error, tx) => {
    if (error) return console.log('Error with Fighter Creation ', error);
  })

  contract.Healed((error, tx) => {
    if (error) return console.log('Error with Fighter Creation ', error);
  })

  contract.FighterFound((error, tx) => {
    if (error) return console.log('Error with Fighter Creation ', error);
  })
}

module.exports.default = accountEvents
