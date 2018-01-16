export const CONTRACT_ADDRESS = window._config.contractAddress;
export const TRAINING_COST = window._config.trainingCost;
export const DEFAULT_SEARCH_GAS = window._config.defaultSearchGas;
export const DEFAULT_GAS = 60000;
// export const HEALING_PRICE_INCREASE = 1.5; Maybe reconsider this later

export const ACTION_TYPES = {
  core: {
    SIGNING_ACTION: 'core/SIGNING_ACTION',
    SET_PROVIDER: 'core/SET_PROVIDER',
    SET_DEFAULT_ACCOUNT: 'core/SET_DEFAULT_ACCOUNT'
  },
  account: {
    ADD_FIGHTERS: 'account/ADD_FIGHTERS',
    INCREASE_FIGHTER_STATS: 'account/INCREASE_FIGHTER_STATS',
    HEAL_FIGHTER: 'account/HEAL_FIGHTER',
    ADD_FIGHTER_TO_MARKETPLACE: 'account/ADD_FIGHTER_TO_MARKETPLACE',
    ADD_FIGHTER_TO_ARENA: 'account/ADD_FIGHTER_TO_ARENA',
    REMOVE_FIGHTER_FROM_ARENA: 'account/REMOVE_FIGHTER_FROM_ARENA',
    REMOVE_FIGHTER_FROM_MARKETPLACE: 'account/REMOVE_FIGHTER_FROM_MARKETPLACE'
  },
  modal: {
    SHOW_MODAL: 'modal/SHOW_MODAL',
    CLOSE_MODAL: 'modal/CLOSE_MODAL',
    UPDATE_FIGHTER_PRICE: 'modal/UPDATE_FIGHTER_PRICE'
  }
}
