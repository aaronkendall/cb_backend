const ethunits = require('ethereum-units');

const Sale = require('../../models/sale.model.js');
const Fighter = require('../../models/fighter.model.js');
const User = require('../../models/user.model.js');
const Event = require('../../models/event.model.js');

const marketplaceEvents = (contract) => {
  contract.PurchaseSuccess((error, tx) => {
    if (error) return console.log('Error with PurchaseSuccess ', error);

    const { fighterId, buyer, seller, price } = tx.args
    const ethPrice = ethunits.convert('wei', 'ether', price).floatValue()

    Sale.remove({ 'fighter.id': fighterId })
      .then(() => {
        Fighter.findByIdAndUpdate(fighterId, { $set: { isForSale: false } })
        Promise.all([
          User.update({ address: seller }, { $push: { events: new Event({ fighterId, type: 'PurchaseSuccess', message: `You sold Fighter #${fighterId} for ${ethPrice}` }) } }),
          User.update({ address: buyer }, { $push: { events: new Event({ fighterId, type: 'PurchaseSuccess', message: `You bought Fighter #${fighterId} for ${ethPrice}` }) } })
        ]).then(() => {
          console.log(`Fighter #${fighterId} removed from sale after purchase`)
        })
      })
      .catch((error) => {
        console.log(`Error removing Fighter #${fighterId} after purchase `, error)
      })
  })

  contract.MarketplaceRemoval((error, tx) => {
    if (error) return console.log('Error with MarketplaceRemoval ', error);

    const { fighterId } = tx.args

    Sale.remove({ 'fighter.id': fighterId })
      .then(() => {
        Fighter.findByIdAndUpdate(fighterId, { $set: { isForSale: false } })
        console.log(`Fighter #${fighterId} removed from sale after cancellation`)
      })
      .catch((error) => {
        console.log(`Error removing Fighter #${fighterId} after cancellation ` error)
      })
  })

  contract.MarketplaceAdd((error, tx) => {
    if (error) return console.log('Error with MarketplaceAdd ', error);

    const { fighterId, price } = tx.args;
    new Sale({ fighter: fighterId , price }).save()
      .then((newSale) => {
        Fighter.findByIdAndUpdate(fighterId, { $set: { isForSale: true } })
        console.log(`Successfully added Fighter #${fighterId} to the marketplace`)
      })
      .catch((error) => {
        console.log(`Error adding Fighter #${fighterId} to marketplace`)
      })
  })
}

module.exports.default = marketplaceEvents
