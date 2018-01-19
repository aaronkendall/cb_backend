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

/* Turns these into thunks
handleTrainFighter(id, attribute) {
  this.accountService.trainFighter(id, attribute)
    .then(result => this.props.dispatch(increaseFighterStats(result)))
    .catch(error => console.log('Error training fighter ', id, error));
}

handleHeal(id) {
  this.accountService.healFighter(id)
    .then(result => this.props.dispatch(healFighter(id)))
    .catch(error => console.log('Error healing fighter ', id, error));
}

handleAddToMarket(e, id) {
  e.preventDefault();

  const { modalFighterPrice } = this.props;
  const weiPrice = ethunits.convert(parseFloat(modalFighterPrice), 'ether', 'wei').floatValue();

  this.accountService.makeFighterAvailableForSale(id, weiPrice)
    .then(result => this.props.dispatch(addFighterToMarketplace(id)))
    .catch(error => console.log('Error adding fighter to market ', id, price));
}

handleAddToArena(id) {
  this.accountService.makeFighterAvailableForBrawl(id)
    .then(result => this.props.dispatch(addFighterToArena(id)))
    .catch(error => console.log('Error adding fighter to arena ', id, price));
}

handleRemoveFighterFromSale(id) {
  this.accountService.cancelFighterSale(id)
    .then(result => this.props.dispatch(removeFighterFromMarketplace(id)))
    .catch(error => console.log('Error removing fighter from marketplace', id));
}

handleRemoveFighterFromArena(id) {
  this.accountService.cancelFighterBrawl(id)
    .then(result => this.props.dispatch(removeFighterFromArena(id)))
    .catch(error => console.log('Error removing fighter from arena', id));
}*/
