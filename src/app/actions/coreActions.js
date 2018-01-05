import { ACTION_TYPES } from '../utils/constants';
const { core } = ACTION_TYPES;

export function signInOrOut(userIsSignedIn) {
  return { type: core.SIGNING_ACTION, payload: userIsSignedIn };
}

export function setProvider(provider) {
  return { type: core.SET_PROVIDER, payload: provider }
}
