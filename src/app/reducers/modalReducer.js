import { ACTION_TYPES } from '../utils/constants';
const { modal } = ACTION_TYPES;

const defaultState = {
  showModal: false,
  contents: null,
  fighter: {
    price: 0 // price in eth must be converted to gwei before being sent to the contract
  }
};

export default function modalReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case modal.SHOW_MODAL:
			return { ...newState, ...action.payload };
    case modal.CLOSE_MODAL:
      return { ...newState, ...defaultState };
    case modal.UPDATE_FIGHTER_PRICE:
      return { ...newState, ...{ fighter: { price: action.payload } } };
		default:
			return newState;
	}
};
