const Fighter = require('../../models/fighter.model')
const User = require('../../models/user.model')
const Event = require('../../models/event.model')
const { calculateLevel } = require('../../lib/utils')

const accountEvents = (contract) => {
  contract.Creation((error, tx) => {
    if (error) return console.log('Error with Fighter Creation ', error);

    const { owner, fighterId, maxHealth, speed, strength } = tx.args
    const level = calculateLevel({ maxHealth, speed, strength })

    User.findOneAndUpdate(
      { address: owner },
      { $push: {
          fighters: new Fighter({ _id: fighterId, strenght, speed, maxHealth, health: maxHealth, level }),
          events: new Event({ fighterId, type: 'Creation', message: `Fighter #${fighterId} created!` })
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    .exec()
    .then(user => {
      console.log(`Fighter #${fighterId} created and User ${owner} updated`)
    })
  })

  contract.Transfer((error, tx) => {
    if (error) return console.log('Error with Fighter Transfer ', error)

    const { from, to, fighterId } = tx.args

    Promise.all([
      User.update(
        { address: from },
        {
          $pull: { fighters: fighterId },
          $push: { events: new Event({ fighterId, type: 'Transfer', message: `Fighter #${fighterId} transferred to ${to}` }) }
        }
      ),
      User.update(
        { address: to },
        {
          $push: {
            fighters: fighterId,
            events: new Event({ fighterId, type: 'Transfer', message: `Fighter #${fighterId} transferred to you from ${from}` })
          }
        }
      )
    ]).then(() => {
      console.log(`Successfully transferred Fighter #${fighterId} from ${from} to ${to}`)
    })
  })

  contract.AttributeIncrease((error, tx) => {
    if (error) return console.log('Error with Fighter Attribute Increase ', error);
  })

  contract.Healed((error, tx) => {
    if (error) return console.log('Error with Fighter Healing ', error);
  })

  contract.FighterFound((error, tx) => {
    if (error) return console.log('Error with Finding Fighter ', error);
  })
}

module.exports.default = accountEvents
