export function calculateLevel(fighter) {
  return Math.floor((fighter.maxHealth + fighter.speed + fighter.strength) / 10);
}

export function seedNum() {
  return Math.floor(Math.random() * 100) + 1;  
}
