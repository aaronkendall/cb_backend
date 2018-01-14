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
    case account.ADD_FIGHTER_TO_ARENA:
      const fighterAddedToArena = state.fighters.map((fighter) => {
        if (fighter.id === action.payload.fighterId) {
          fighter.isInArena = true;
        }
        return fighter;
      });

      return {...newState, ...{ fighters: fighterAddedToArena } };
    case account.ADD_FIGHTER_TO_MARKETPLACE:
      const fighterAddedToMarketplace = state.fighters.map((fighter) => {
        if (fighter.id === action.payload.fighterId) {
          fighter.isForSale = true;
        }
        return fighter;
      });

      return {...newState, ...{ fighters: fighterAddedToMarketplace } };
    case account.REMOVE_FIGHTER_FROM_ARENA:
      const fighterRemovedFromArena = state.fighters.map((fighter) => {
        if (fighter.id === action.payload.fighterId) {
          fighter.isInArena = false;
        }
        return fighter;
      });

      return {...newState, ...{ fighters: fighterRemovedFromArena } };
    case account.REMOVE_FIGHTER_FROM_MARKETPLACE:
      const fighterRemovedFromMarketplace = state.fighters.map((fighter) => {
        if (fighter.id === action.payload.fighterId) {
          fighter.isForSale = false;
        }
        return fighter;
      });

      return {...newState, ...{ fighters: fighterRemovedFromMarketplace } };
		default:
			return newState;
	}
};
