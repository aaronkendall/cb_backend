export function calculateLevel(fighter) {
  return Math.floor((fighter.maxHealth + fighter.speed + fighter.strength) / 10);
}
