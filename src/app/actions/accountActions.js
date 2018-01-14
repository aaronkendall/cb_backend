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

export function addFighterToMarketplace(fighterId) {
  return { type: account.ADD_FIGHTER_TO_MARKETPLACE, payload: { fighterId } };
}

export function addFighterToArena(fighterId) {
  return { type: account.ADD_FIGHTER_TO_ARENA, payload: { fighterId } };
}

export function removeFighterFromMarketplace(fighterId) {
  return { type: account.REMOVE_FIGHTER_FROM_MARKETPLACE, payload: { fighterId } };
}

export function removeFighterFromArena(fighterId) {
  return { type: account.REMOVE_FIGHTER_FROM_ARENA, payload: { fighterId} };
}
