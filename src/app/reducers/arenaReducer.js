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
    case arena.REMOVE_FIGHTER_FROM_ARENA:
      const id = action.payload
      const indexOfFighter = newState.fightersInArena.findIndex(fighter => fighter.id === id)
      const indexOfFilteredFighter = newState.filteredFighters.findIndex(fighter => fighter.id === id)

      return {
        ...newState,
        ...{
          fightersInArena: [
            ...newState.fightersInArena.slice(0, indexOfFighter),
            ...newState.fightersInArena.slice(indexOfFighter + 1)
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
