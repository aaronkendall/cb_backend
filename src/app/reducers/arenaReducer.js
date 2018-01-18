import { ACTION_TYPES } from '../utils/constants';
const { arena } = ACTION_TYPES;

const defaultState = {
  fightersInArena: [],
  filteredFighters: [],
  pageCounter: 1,
  selectedFighterToBrawl: undefined
};

export default function arenaReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case arena.POPULATE_ARENA:
			return { ...newState, ...{ fightersInArena: action.payload } };
    case arena.FILTER_ARENA:
      return { ...newState, ...{ filteredFighters: action.payload } };
    case arena.RESET_FILTERS:
      return { ...newState, ...{ filteredFighters: [] } };
    case arena.INCREMENT_PAGE_COUNTER:
      return { ...newState, ...{ pageCounter: newState.pageCounter++ } };
    case arena.RESET_PAGE_COUNTER:
      return { ...newState, ...{ pageCounter: 1 } };
    case arena.SELECT_FIGHTER_TO_BRAWL:
      return { ...newState, ...{ selectFighterToBrawl: action.payload } };
    case arena.RESET_SELECTED_FIGHTER:
      return { ...newState, ...{ selectFighterToBrawl: undefined } };
		default:
			return newState;
	}
};
