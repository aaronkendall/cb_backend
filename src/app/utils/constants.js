export const CONTRACT_ADDRESS = window._config.contractAddress;

export const ACTION_TYPES = {
  core: {
    SIGNING_ACTION: 'core/SIGNING_ACTION',
    SET_PROVIDER: 'core/SET_PROVIDER',
    SET_DEFAULT_ACCOUNT: 'core/SET_DEFAULT_ACCOUNT'
  },
  account: {
    ADD_FIGHTERS: 'account/ADD_FIGHTERS',
    INCREASE_FIGHTER_STATS: 'account/INCREASE_FIGHTER_STATS',
    HEAL_FIGHTER: 'account/HEAL_FIGHTER'
  }
}
