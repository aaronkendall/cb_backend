import { calculateLevel } from '../utils/fighterUtils';

export default class Fighter {
  constructor(contractFighterArray, fighterId) {
    this.id = fighterId;
    this.maxHealth = contractFighterArray[0].toNumber();
    this.health = contractFighterArray[1].toNumber();
    this.speed = contractFighterArray[2].toNumber();
    this.strength = contractFighterArray[3].toNumber();
    this.level = calculateLevel(this);
  }
}
