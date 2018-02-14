const Brawl = require('../../models/brawl.model');
const Fighter = require('../../models/fighter.model');
const User = require('../../models/user.model');
const Event = require('../../models/event.model');

const arenaEvents = (contract) => {
  contract.FightComplete(async (error, tx) => {
    if (error) return console.log('Error with FightComplete ', error);

    const { winnerId, winner, winnersHealth, loserId, loser, fighterInArena } = tx.args

    try {
      await Brawl.remove({ 'fighter.id': fighterInArena })
      await Promise.all([
        Fighter.update({ _id: winnerId }, { $set: { isInArena: false, health: winnersHealth.toNumber() } }),
        Fighter.update({ _id: loserId }, { $set: { isInArena: false, health: 0 } })
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
      await Brawl.remove({ 'fighter.id': fighterId })
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

  // contract.CombatRound(async (error, tx) => {
  //   if (error) return console.log('Error with CombatRound ', error);
  //
  //   const { attacker, defender, attackerId, defenderId, hit, damage } = tx.args;
  //
  //   try {
  //     if (hit) {
  //       await Promise.all([
  //         User.update({ address: attacker }, { $push: { events: new Event({ fighterId: attackerId, type: 'Combat Round', message: `You pounded Fighter #${defenderId} for ${damage} damage!` }) } }),
  //         User.update({ address: defender }, { $push: { events: new Event({ fighterId: defenderId, type: 'Combat Round', message: `Fighter #${attackerId} slammed you for ${damage} damage!` }) } }),
  //       ])
  //       return console.log('Combat Round successfully recorded')
  //     }
  //
  //     await Promise.all([
  //       User.update({ address: attacker }, { $push: { events: new Event({ fighterId: attackerId, type: 'Combat Round', message: `You swung and missed Fighter #${defenderId}!` }) } }),
  //       User.update({ address: defender }, { $push: { events: new Event({ fighterId: defenderId, type: 'Combat Round', message: `You dodged Fighter #${attackerId}'s attack!` }) } }),
  //     ])
  //     return console.log('Combat Round successfully recorded')
  //   } catch(error) {
  //     console.log(`Error recording Combat Round with Fighter #${attackerId} and Fighter #${defenderId} `, error)
  //   }
  // })
}

module.exports = arenaEvents
