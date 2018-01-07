import { ACTION_TYPES } from '../utils/constants';
const { account } = ACTION_TYPES;

export function addFighters(fighters) {
  return { type: account.ADD_FIGHTERS, payload: { fighters } };
}

export function increaseFighterStats(increaseInfo) {
  return { type: account.INCREASE_FIGHTER_STATS, payload: increaseInfo };
}

export function healFighter(fighterId) {
  return { type: account.HEAL_FIGHTER, payload: { fighterId } };
}
