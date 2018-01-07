import { ACTION_TYPES } from '../utils/constants';
const { account } = ACTION_TYPES;

const defaultState = {
  fighters: []
};

export default function accountReducer(state = defaultState, action) {
	const newState = {...defaultState, ...state};

	switch(action.type) {
		case account.ADD_FIGHTERS:
			return {...newState, ...{ fighters: [...state.fighters, ...action.payload.fighters] } };
    case account.INCREASE_FIGHTER_STATS:
      const { attribute, increaseValue, fighterId } = action.payload;

      const updatedFighterArray = state.fighters.map((fighter) => {
        if (fighter.id === fighterId) {
          fighter[attribute] += increaseValue;
        }
        return fighter;
      });

      return {...newState, ...{ fighters: updatedFighterArray } };
    case account.HEAL_FIGHTER:
      const healedFighterArray = state.fighters.map((fighter) => {
        if (fighter.id === action.payload.fighterId) {
          fighter.health = fighter.maxHealth;
        }
        return fighter;
      })

      return {...newState, ...{ fighters: healedFighterArray } };
		default:
			return newState;
	}
};
