import { ACTION_TYPES } from '../utils/constants';
const { account } = ACTION_TYPES;

export function addFighters(fighters) {
  return { type: account.ADD_FIGHTERS, payload: fighters };
}
