const Brawl = require('../../models/brawl.model');
const Fighter = require('../../models/fighter.model');
const User = require('../../models/user.model');

const arenaEvents = (contract) => {
  contract.FightComplete((error, tx) => {
    if (error) return console.log('Error with FightComplete ', error);

    const { winnerId, winner, loserId, loser } = tx.args
    Brawl.remove({ 'fighter.id': fighterId })
      .then(() => {
        Fighter.findByIdAndUpdate(winnerId, { $set: { isInArena: false } })
        Fighter.findByIdAndUpdate(loserId, { $set: { isInArena: false } })

        Promise.all([
          User.update({ address: loser }, { $pull: { fighters: loserId } }),
          User.update({ address: winner }, { $push: { fighters: loserId } })
        ]).then(() => {
          console.log(`Fighter #${fighterId} removed from sale after purchase`)
        })
      })
      .catch((error) => {
        console.log(`Error removing Fighter #${fighterId} after purchase `, error)
      })
  })

  contract.ArenaRemoval((error, tx) => {
    if (error) return console.log('Error with ArenaRemoval ', error);

    const { fighterId, owner } = tx.args

    Brawl.remove({ 'fighter.id': fighterId })
      .then(() => {
        Fighter.findByIdAndUpdate(fighterId, { $set: { isInArena: false } })
        console.log(`Fighter #${fighterId} removed from sale after cancellation`)
      })
      .catch((error) => {
        console.log(`Error removing Fighter #${fighterId} after cancellation ` error)
      })
  })

  contract.ArenaAdd((error, tx) => {
    if (error) return console.log('Error with ArenaAdd ', error);

    const { fighterId } = tx.args;
    new Brawl({ fighter: fighterId }).save()
      .then((newFighter) => {
        Fighter.findByIdAndUpdate(fighterId, { $set: { isInArena: true } })
        console.log(`Successfully added Fighter #${fighterId} to the marketplace`)
      })
      .catch((error) => {
        console.log(`Error adding Fighter #${fighterId} to marketplace`)
      })
  })
}

module.exports.default = arenaEvents
