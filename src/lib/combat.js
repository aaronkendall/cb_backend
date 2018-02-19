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

const calculateWinner = (fighter1, fighter2) => {
  let winner
  let loser

  fighter1.damageModifier = getDamageModifier(fighter1.type, fighter2.type)
  fighter2.damageModifier = getDamageModifier(fighter2.type, fighter1.type)

  // do some shizzle here

  return `${winner.id}-${loser.id}-${winner.health}`
}

module.exports = {
  calculateWinner
}
