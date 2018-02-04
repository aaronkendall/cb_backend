const Brawl = require('../../models/brawl.model');
const Fighter = require('../../models/fighter.model');
const User = require('../../models/user.model');
const Event = require('../../models/event.model');

const arenaEvents = (contract) => {
  contract.FightComplete((error, tx) => {
    if (error) return console.log('Error with FightComplete ', error);

    const { winnerId, winner, loserId, loser, fighterInArena } = tx.args
    Brawl.remove({ 'fighter.id': fighterInArena })
      .then(() => {
        Fighter.findByIdAndUpdate(winnerId, { $set: { isInArena: false } })
        Fighter.findByIdAndUpdate(loserId, { $set: { isInArena: false } })

        Promise.all([
          User.update({ address: loser }, { $push: { events: new Event({ fighterId: loserId, type: 'Fight Complete', message: `You lost Fighter #${loserId} in a brawl with Fighter #${winnerId}!` }) } }),
          User.update({ address: winner }, { $push: { events: new Event({ fighterId: winnerId, type: 'Fight Complete', message: `You won Fighter #${loserId} in a brawl with Fighter #${winnerId}!` }) } })
        ]).then(() => {
          console.log(`Fighter #${loserId} lost to Fighter #${winnerId}`)
        })
      })
      .catch((error) => {
        console.log(`Error with Fighter #${loserId} losing to Fighter #${winnerId}`, error)
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
        console.log(`Error removing Fighter #${fighterId} after cancellation in arena` error)
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
        console.log(`Error adding Fighter #${fighterId} to arena`)
      })
  })
}

module.exports.default = arenaEvents
