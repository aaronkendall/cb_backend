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

export function populateFighters(accountService) {
  return (dispatch) => {
    accountService.getFightersForAccount()
      .then(fightersPromiseArray => Promise.all(fightersPromiseArray))
      .then(fighters => dispatch(addFighters(fighters)));
  }
}

export function searchForFighter(accountService) {
  return (dispatch) => {
    accountService.searchForFighter()
      .then(result => {
        if (result.fighterFound) {
          result.fighter
            .then(newFighter => dispatch(addFighters([newFighter])));
        }
      });
  }
}

export function trainFighter(accountService, id, attribute) {
  return (dispatch) => {
    accountService.trainFighter(id, attribute)
      .then(result => dispatch(increaseFighterStats(result)))
      .catch(error => console.log('Error training fighter ', id, error));
  }
}

export function healFighterThunk(accountService, id) {
  return (dispatch) => {
    accountService.healFighter(id)
      .then(result => dispatch(healFighter(id)))
      .catch(error => console.log('Error healing fighter ', id, error));
  }
}

export function approveFighterForSale(accountService, id, price) {
  return (dispatch) => {
    accountService.makeFighterAvailableForSale(id, price)
      .then(() => dispatch(addFighterToMarketplace(id)))
      .catch(error => console.log('Error adding fighter to market ', id, price));
  }
}

export function approveFighterForArena(accountService, id) {
  return (dispatch) => {
    accountService.makeFighterAvailableForBrawl(id)
      .then(() => dispatch(addFighterToArena(id)))
      .catch(error => console.log('Error adding fighter to arena ', id, price));
  }
}

export function cancelFighterSale(accountService, id) {
  return (dispatch) => {
    accountService.cancelFighterSale(id)
      .then(result => dispatch(removeFighterFromMarketplace(id)))
      .catch(error => console.log('Error removing fighter from marketplace', id));
  }
}

export function cancelFighterBrawl(accountService, id) {
  return (dispatch) => {
    accountService.cancelFighterBrawl(id)
      .then(result => dispatch(removeFighterFromArena(id)))
      .catch(error => console.log('Error removing fighter from arena', id));
  }
}
