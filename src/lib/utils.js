module.exports.calculateLevel = (fighter) => {
  return Math.floor((fighter.maxHealth.toNumber() + fighter.speed.toNumber() + fighter.strength.toNumber()) / 10);
}
