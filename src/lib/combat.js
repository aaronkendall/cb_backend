const { randomNumberMinToMax } = require('./utils')

const typeToWeakness = {
  'Mob Boss': 'Mob Boss',
  'Local MMA Star': 'Henchman',
  'Roadman': 'Local MMA Star',
  'Henchman': 'Roadman'
}

const getDamageModifier = (attackerType, defenderType) => {
  if (typeToWeakness[defenderType] === attackerType) return 2
  return 1
}

const combatRound = (attacker, defender) => {
  const attackRoll = randomNumberMinToMax(1, attacker.speed)
  const defenseRoll = randomNumberMinToMax(1, defender.speed)
  const damage = randomNumberMinToMax(1, (attacker.strength / 2)) * attacker.damageModifier

  if (attackRoll >= defenseRoll) return damage
  return 0
}

const calculateWinner = (fighter1, fighter2) => {
  let winner
  let loser
  fighter1.damageModifier = getDamageModifier(fighter1.type, fighter2.type)
  fighter2.damageModifier = getDamageModifier(fighter2.type, fighter1.type)

  while(fighter1.health > 0 && fighter2.health > 0) {
    fighter2.health -= combatRound(fighter1, fighter2)
    if (fighter2.health <= 0) {
      winner = fighter1
      loser = fighter2
      break
    }

    fighter1.health -= combatRound(fighter2, fighter1)
    if (fighter1.health <= 0) {
      winner = fighter2
      loser = fighter1
      break
    }
  }

  return `${winner.id} ${loser.id}`
}

module.exports = {
  calculateWinner
}
