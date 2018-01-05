import { ACTION_TYPES } from '../utils/constants';
const { core } = ACTION_TYPES;

const defaultState = {
  userIsSignedIn: false,
  provider: {}
};

export default function coreReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case core.SIGNING_ACTION:
			return {...newState, ...{ userIsSignedIn: action.payload } };
    case core.SET_PROVIDER:
      return {...newState, ...{ provider: action.payload } };
		default:
			return newState;
	}
};
