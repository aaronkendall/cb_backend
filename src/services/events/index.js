const marketplaceEvents = require('./marketplaceEvents')
const arenaEvents = require('./arenaEvents')

module.exports = {
  watch: function(web3) {
    marketplaceEvents(web3)
    arenaEvents(web3)
  }
}
