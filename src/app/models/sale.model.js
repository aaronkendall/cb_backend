export default class Sale {
  constructor(fighter, price) {
    this.id = fighter.id.toNumber();
    this.maxHealth = fighter.maxHealth;
    this.health = fighter.health;
    this.speed = fighter.speed
    this.strength = fighter.strength;
    this.isForSale = fighter.isForSale;
    this.isInArena = fighter.isInArena;
    this.level = fighter.level;
    this.price = price;
  }
}
