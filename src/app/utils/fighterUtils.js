export function calculateLevel(fighter) {
  return Math.floor((fighter.maxHealth + fighter.speed + fighter.strength) / 10);
}

export function seedNum() {
  return Math.floor(Math.random() * 100) + 1;
}

export function getImageId(fighterId) {
  if (fighterId <= 9) {
    return fighterId;
  }

  return fighterId % 10;
}
