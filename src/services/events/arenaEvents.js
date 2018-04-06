const Brawl = require('../../models/brawl.model');
const Fighter = require('../../models/fighter.model');
const User = require('../../models/user.model');
const Event = require('../../models/event.model');

const arenaEvents = (contract) => {
  contract.FightComplete(async (error, tx) => {
    if (error) return console.log('Error with FightComplete ', error);

    const { winnerId, winner, winnersHealth, loserId, loser, fighterInArena } = tx.args

    try {
      await Brawl.findOneAndRemove({ 'fighter': fighterInArena.toNumber() })
      await Promise.all([
        Fighter.update({ _id: winnerId }, { $set: { isInArena: false } }),
        Fighter.update({ _id: loserId }, { $set: { isInArena: false } })
      ])

      const loserEvent = await new Event({ fighterId: loserId, type: 'Fight Complete', message: `You lost Fighter #${loserId} in a brawl with Fighter #${winnerId}!` }).save()
      const winnerEvent = await new Event({ fighterId: winnerId, type: 'Fight Complete', message: `You won Fighter #${loserId} in a brawl with Fighter #${winnerId}!` }).save()
      await Promise.all([
        User.update({ address: loser }, { $push: { events: loserEvent } }),
        User.update({ address: winner }, { $push: { events: winnerEvent } })
      ])

      console.log(`Fighter #${loserId} lost to Fighter #${winnerId}`)
    } catch(error) {
      console.log(`Error with Fighter #${loserId} losing to Fighter #${winnerId}`, error)
    }
  })

  contract.ArenaRemoval(async (error, tx) => {
    if (error) return console.log('Error with ArenaRemoval ', error);

    const { fighterId, owner } = tx.args

    try {
      await Brawl.findOneAndRemove({ 'fighter': fighterId.toNumber() })
      await Fighter.update({ _id: fighterId }, { $set: { isInArena: false } })
      console.log(`Fighter #${fighterId} removed from sale after cancellation`)
    } catch(error) {
      console.log(`Error removing Fighter #${fighterId} after cancellation in arena `, error)
    }
  })

  contract.ArenaAdd(async (error, tx) => {
    if (error) return console.log('Error with ArenaAdd ', error);

    const { fighterId } = tx.args

    try {
      await new Brawl({ fighter: fighterId }).save()
      await Fighter.update({ _id: fighterId }, { $set: { isInArena: true } })
      console.log(`Successfully added Fighter #${fighterId} to the arena`)
    } catch(error) {
      console.log(`Error adding Fighter #${fighterId} to arena`)
    }
  })
}

module.exports = arenaEvents
