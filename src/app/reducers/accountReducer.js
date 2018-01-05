import { ACTION_TYPES } from '../utils/constants';
const { account } = ACTION_TYPES;

const defaultState = {
  fighters: []
};

export default function accountReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case account.ADD_FIGHTERS:
			return {...newState, ...{ fighters: [...state.fighters, ...action.payload] } };
		default:
			return newState;
	}
};
