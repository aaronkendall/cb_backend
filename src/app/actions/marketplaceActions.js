import { ACTION_TYPES } from '../utils/constants';
const { marketplace } = ACTION_TYPES;

export function populateMarketplace(fighters) {
  return { type: marketplace.POPULATE_MARKETPLACE, payload: fighters };
}

export function filterMarketplace(filteredFighters) {
  return { type: marketplace.FILTER_MARKETPLACE, payload: filteredFighters };
}

export function resetFilters() {
  return { type: marketplace.RESET_FILTERS };
}

export function incrementMarketplacePage() {
  return { type: marketplace.INCREMENT_PAGE_COUNTER };
}

export function resetMarketplacePage() {
  return { type: marketplace.RESET_PAGE_COUNTER };
}

export function removeFighterFromMarketplace(id) {
  return { type: marketplace.REMOVE_FIGHTER_FROM_MARKETPLACE, payload: id }
}

export function purchaseFighter(marketService, id, price) {
  return (dispatch) => {
    marketService.buyFighter(id, price)
      .then((result) => {
        if (!result) return
        dispatch(removeFighterFromMarketplace(id))
      })
  }
}
