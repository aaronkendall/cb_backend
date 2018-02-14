const ethunits = require('ethereum-units');

const Sale = require('../../models/sale.model.js');
const Fighter = require('../../models/fighter.model.js');
const User = require('../../models/user.model.js');
const Event = require('../../models/event.model.js');

const marketplaceEvents = (contract) => {
  contract.PurchaseSuccess(async (error, tx) => {
    if (error) return console.log('Error with PurchaseSuccess ', error);

    const { fighterId, buyer, seller, price } = tx.args
    const ethPrice = ethunits.convert('wei', 'ether', price).floatValue()

    try {
      await Sale.remove({ 'fighter.id': fighterId })
      const sellerEvent = await new Event({ fighterId, type: 'PurchaseSuccess', message: `You sold Fighter #${fighterId} for ${ethPrice}` }).save()
      const buyerEvent = await new Event({ fighterId, type: 'PurchaseSuccess', message: `You bought Fighter #${fighterId} for ${ethPrice}` }).save()

      await Fighter.update({ _id: fighterId }, { $set: { isForSale: false } })
      await Promise.all([
        User.update({ address: seller }, { $push: { events: sellerEvent } }),
        User.update({ address: buyer }, { $push: { events: buyerEvent } })
      ])

      console.log(`Fighter #${fighterId} removed from sale after purchase`)
    } catch(error) {
      console.log(`Error removing Fighter #${fighterId} after purchase `, error)
    }
  })

  contract.MarketplaceRemoval(async (error, tx) => {
    if (error) return console.log('Error with MarketplaceRemoval ', error);

    const { fighterId } = tx.args

    try {
      await Sale.remove({ 'fighter.id': fighterId })
      await Fighter.update({ _id: fighterId }, { $set: { isForSale: false } })
      console.log(`Fighter #${fighterId} removed from sale after cancellation`)
    } catch(error) {
      console.log(`Error removing Fighter #${fighterId} after cancellation `, error)
    }
  })

  contract.MarketplaceAdd(async (error, tx) => {
    if (error) return console.log('Error with MarketplaceAdd ', error);

    const { fighterId, price } = tx.args

    try {
      await new Sale({ fighter: fighterId , price: price.toNumber() }).save()
      await Fighter.update({ _id: fighterId }, { $set: { isForSale: true } })
      console.log(`Successfully added Fighter #${fighterId} to the marketplace`)
    } catch(error) {
      console.log(`Error adding Fighter #${fighterId} to marketplace`)
    }
  })
}

module.exports = marketplaceEvents
