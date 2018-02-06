const marketplaceEvents = require('./marketplaceEvents')
const arenaEvents = require('./arenaEvents')
const accountEvents = require('./accountEvents')

module.exports = {
  watch: function(contract) {
    marketplaceEvents(contract)
    arenaEvents(contract)
    accountEvents(contract)
  }
}
