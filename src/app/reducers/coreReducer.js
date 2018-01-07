import { ACTION_TYPES } from '../utils/constants';
const { core } = ACTION_TYPES;

const defaultState = {
  userIsSignedIn: false,
  provider: {},
  defaultAccount: ''
};

export default function coreReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case core.SIGNING_ACTION:
			return { ...newState, ...{ userIsSignedIn: action.payload } };
    case core.SET_PROVIDER:
      return { ...newState, ...{ provider: action.payload } };
    case core.SET_DEFAULT_ACCOUNT:
      return { ...newState, ...{defaultAccount: action.payload } };
		default:
			return newState;
	}
};
