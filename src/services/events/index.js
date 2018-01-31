const marketplaceEvents = require('./marketplaceEvents')
const arenaEvents = require('./arenaEvents')

module.exports = {
  watch: function(contract) {
    marketplaceEvents(contract)
    arenaEvents(contract)
  }
}
