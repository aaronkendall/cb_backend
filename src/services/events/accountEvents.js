const Fighter = require('../../models/fighter.model')
const User = require('../../models/user.model')
const Event = require('../../models/event.model')
const { calculateLevel } = require('../../lib/utils')

const accountEvents = (contract) => {
  contract.Creation(async (error, tx) => {
    if (error) return console.log('Error with Fighter Creation ', error);

    const { owner, fighterId, maxHealth, speed, strength, fighterType } = tx.args
    const level = calculateLevel({ maxHealth, speed, strength })

    try {
      const newFighter = await new Fighter({ _id: fighterId, strength, speed, maxHealth, health: maxHealth, level, type: fighterType }).save()
      const creationEvent = await new Event({ fighterId, type: 'Creation', message: `Fighter #${fighterId} created!` }).save()

      await User.findOneAndUpdate(
        { address: owner },
        { $push: {
            fighters: newFighter.id,
            events: creationEvent.id
          }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec()
      console.log(`Fighter #${fighterId} created and User ${owner} updated`)
    } catch(error) {
      console.log(`Error with creation of Fighter #${fighterId} for ${owner}`, error)
    }
  })

  contract.Transfer(async (error, tx) => {
    if (error) return console.log('Error with Fighter Transfer ', error)

    const { from, to, fighterId } = tx.args
    const idNumber = fighterId.toNumber()

    try {
      const fromEvent = await new Event({ idNumber, type: 'Transfer', message: `Fighter #${idNumber} transferred to ${to}` }).save()
      const toEvent = await new Event({ idNumber, type: 'Transfer', message: `Fighter #${idNumber} transferred to you from ${from}` }).save()

      await Promise.all([
        User.update(
          { address: from },
          {
            $pull: { fighters: idNumber },
            $push: { events: fromEvent.id }
          }
        ),
        User.findOneAndUpdate(
          { address: to },
          {
            $push: {
              fighters: idNumber,
              events: toEvent.id
            }
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        ).exec()
      ])
      console.log(`Successfully transferred Fighter #${fighterId} from ${from} to ${to}`)
    } catch(error) {
      console.log(`Error transferring fighter ${fighterId} from ${from} to ${to}`, error)
    }
  })

  contract.AttributeIncrease(async (error, tx) => {
    if (error) return console.log('Error with Fighter Attribute Increase ', error);

    const { owner, fighterId, attribute, increaseValue } = tx.args

    try {
      const fighter = await Fighter.findById(fighterId).exec()
      const newEvent = await new Event({ fighterId, type: 'Attribute Increase', message: `Fighter #${fighterId}'s ${attribute} increased by ${increaseValue}!` }).save()

      fighter[attribute] = fighter[attribute] + increaseValue.toNumber()
      // Double check that the fighter's level hasn't updated
      fighter.level = calculateLevel(fighter)

      await fighter.save()
      await User.update({ address: owner }, { $push: { events: newEvent } })
      console.log(`Fighter #${fighterId}'s ${attribute} increased by ${increaseValue}`)
    } catch(error) {
      console.log(`Error updating fighter #${fighterId}'s ${attribute} by ${increaseValue}`, error)
    }
  })

  contract.Healed(async (error, tx) => {
    if (error) return console.log('Error with Fighter Healing ', error);

    const { owner, fighterId, maxHealth } = tx.args

    try {
      const newEvent = await new Event({ fighterId, type: 'Heal', message: `Fighter #${fighterId} was healed to full health!` }).save()
      await Promise.all([
        Fighter.update({ _id: fighterId }, { $set: { health: maxHealth.toNumber() } }),
        User.update({ address: owner }, { $push: { events: newEvent } })
      ])

      console.log(`Fighter #${fighterId} successfully healed`)
    } catch(error) {
      console.log(`Error healing fighter #${fighterId}`, error)
    }
  })

  contract.FighterFound(async (error, tx) => {
    if (error) return console.log('Error with Finding Fighter ', error);

    const { owner, fighterId, fighterWasFound } = tx.args
    if (!fighterWasFound) return

    try {
      const newEvent = await new Event({ fighterId, type: 'Fighter Found', message: `You found Fighter #${fighterId} while patrolling the streets!` }).save()
      await User.update({ address: owner }, { $push: { events: newEvent } })

      console.log(`Owner ${owner} found Fighter #${fighterId}`)
    } catch(error) {
      console.log(`Error updating the fighter found event for owner ${owner} and fighter #${fighterId}`, error)
    }
  })
}

module.exports = accountEvents
