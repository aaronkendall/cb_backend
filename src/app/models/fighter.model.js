import { calculateLevel } from '../utils/fighterUtils';

export default class Fighter {
  constructor(contractFighterArray) {
    console.log(contractFighterArray);
    this.maxHealth = contractFighterArray[0];
    this.health = contractFighterArray[1];
    this.speed = contractFighterArray[2];
    this.strength = contractFighterArray[3];
    this.level = calculateLevel(this);
  }
}
