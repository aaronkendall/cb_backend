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
    case marketplace.REMOVE_FIGHTER_FROM_MARKETPLACE:
      const id = action.payload
      const indexOfFighter = newState.fightersForSale.findIndex(fighter => fighter.id === id)
      const indexOfFilteredFighter = newState.filteredFighters.findIndex(fighter => fighter.id === id)

      return {
        ...newState,
        ...{
          fightersForSale: [
            ...newState.fightersForSale.slice(0, indexOfFighter),
            ...newState.fightersForSale.slice(indexOfFighter + 1)
          ],
          filteredFighters: [
            ...newState.filteredFighters.slice(0, indexOfFilteredFighter),
            ...newState.filteredFighters.slice(indexOfFilteredFighter + 1)
          ]
        }
      }
		default:
			return newState;
	}
};
