import { ACTION_TYPES } from '../utils/constants';
const { marketplace } = ACTION_TYPES;

const defaultState = {
  fightersForSale: [],
  filteredFighters: [],
  pageCounter: 1
};

export default function marketplaceReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case marketplace.POPULATE_MARKETPLACE:
			return { ...newState, ...{ fightersForSale: action.payload } };
    case marketplace.FILTER_MARKETPLACE:
      return { ...newState, ...{ filteredFighters: action.payload } };
    case marketplace.RESET_FILTERS:
      return { ...newState, ...{ filteredFighters: [] } };
    case marketplace.INCREMENT_PAGE_COUNTER:
      return { ...newState, ...{ pageCounter: newState.pageCounter++ } };
    case marketplace.RESET_PAGE_COUNTER:
      return { ...newState, ...{ pageCounter: 1 } };
		default:
			return newState;
	}
};
