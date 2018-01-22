import { Marketplace, Arena, Account } from '../services/contract';
import { ACTION_TYPES } from '../utils/constants';
const { core } = ACTION_TYPES;
const contractServices = [
  {
    name: 'marketService',
    service: Marketplace
  },
  {
    name: 'arenaService',
    service: Arena
  },
  {
    name: 'accountService',
    service: Account
  }
];

export function signInOrOut(userIsSignedIn) {
  return { type: core.SIGNING_ACTION, payload: userIsSignedIn }
}

export function setProvider(provider) {
  return { type: core.SET_PROVIDER, payload: provider }
}

export function setDefaultAccount(address) {
  return { type: core.SET_DEFAULT_ACCOUNT, payload: address }
}

export function setContractService(service) {
  return { type: core.SET_CONTRACT_SERVICE, payload: service }
}

export function initApp(defaultAccount, ethProvider) {
  return (dispatch) => {
    dispatch(setDefaultAccount(defaultAccount))
    dispatch(setProvider(ethProvider))
    contractServices.forEach(service =>
      dispatch(setContractService({
        name: service.name,
        service: new service.service(ethProvider, defaultAccount)
      }))
    )
    dispatch(signInOrOut(true))
  }
}
