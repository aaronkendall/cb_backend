const Sale = require('../../models/sale.model.js');

const marketplaceEvents = (contract) => {
  contract.PurchaseSuccess((error, tx) => {
    if (error) return console.log('Error with PurchaseSuccess ', error);

    Sale.remove({ 'fighter.id': tx.args.fighterId })
      .then(() => {
        console.log(`Fighter #${tx.args.fighterId} removed from sale after purchase`)
      })
      .catch((error) => {
        console.log(`Error removing Fighter #${tx.args.fighterId} after purchase `, error)
      })
  })

  contract.MarketplaceRemoval((error, tx) => {
    if (error) return console.log('Error with MarketplaceRemoval ', error);

    Sale.remove({ 'fighter.id': tx.args.fighterId })
      .then(() => {
        console.log(`Fighter #${tx.args.fighterId} removed from sale after cancellation`)
      })
      .catch((error) => {
        console.log(`Error removing Fighter #${tx.args.fighterId} after cancellation ` error)
      })
  })

  contract.MarketplaceAdd((error, tx) => {
    if (error) return console.log('Error with MarketplaceAdd ', error);

    const { fighterId, price } = tx.args;
    // decide whether we want to send fighter info with the event of grab it from the database here,
    // i.e whether or not we want to store fighters by account through events, probably we do
    new Sale({ fighter, price }).save()
      .then((newFighter) => {
        console.log(`Successfully added Fighter #${fighterId} to the marketplace`)
      })
      .catch((error) => {
        console.log(`Error adding Fighter #${fighterId} to marketplace`)
      })
  })
}

module.exports.default = marketplaceEvents
