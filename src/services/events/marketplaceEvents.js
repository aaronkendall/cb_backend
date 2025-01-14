const ethunits = require('ethereum-units');

const Sale = require('../../models/sale.model.js');
const Fighter = require('../../models/fighter.model.js');
const User = require('../../models/user.model.js');
const Event = require('../../models/event.model.js');

const marketplaceEvents = (contract) => {
  contract.PurchaseSuccess(async (error, tx) => {
    if (error) return console.log('Error with PurchaseSuccess ', error)

    console.log('PurchaseSuccess Event is happening, here are the args ', tx.args)
    const { buyer, price, fighterId, seller } = tx.args

    try {
      const ethPrice = ethunits.convert(price.toNumber(), 'wei', 'ether').floatValue()
      const idNumber = fighterId.toNumber()

      await Sale.findOneAndRemove({ 'fighter': idNumber })
      const sellerEvent = await new Event({ _creator: seller, type: 'PurchaseSuccess', message: `You sold Fighter #${idNumber} for ${ethPrice}` }).save()
      const buyerEvent = await new Event({ _creator: buyer, type: 'PurchaseSuccess', message: `You bought Fighter #${idNumber} for ${ethPrice}` }).save()

      await Fighter.update({ _id: idNumber }, { $set: { isForSale: false } })
      await Promise.all([
        User.update({ address: seller }, { $addToSet: { events: sellerEvent } }),
        User.update({ address: buyer }, { $addToSet: { events: buyerEvent } })
      ])

      console.log(`Fighter #${idNumber} removed from sale after purchase`)
    } catch(error) {
      console.log(`Error removing Fighter #${idNumber} after purchase `, error, `Event args = ${tx.args}`)
    }
  })

  contract.MarketplaceRemoval(async (error, tx) => {
    if (error) return console.log('Error with MarketplaceRemoval ', error);

    const { fighterId } = tx.args
    const idNumber = fighterId.toNumber()

    try {
      await Sale.findOneAndRemove({ fighter: idNumber })
      await Fighter.update({ _id: idNumber }, { $set: { isForSale: false } })
      console.log(`Fighter #${idNumber} removed from sale after cancellation`)
    } catch(error) {
      console.log(`Error removing Fighter #${idNumber} after cancellation `, error)
    }
  })

  contract.MarketplaceAdd(async (error, tx) => {
    if (error) return console.log('Error with MarketplaceAdd ', error);

    const { fighterId, price } = tx.args
    const idNumber = fighterId.toNumber()

    try {
      await new Sale({ fighter: idNumber, price: price.toNumber() }).save()
      await Fighter.update({ _id: idNumber }, { $set: { isForSale: true } })
      console.log(`Successfully added Fighter #${idNumber} to the marketplace`)
    } catch(error) {
      console.log(`Error adding Fighter #${idNumber} to marketplace`)
    }
  })
}

module.exports = marketplaceEvents
