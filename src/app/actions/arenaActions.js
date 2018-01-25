import { ACTION_TYPES } from '../utils/constants';
const { arena } = ACTION_TYPES;

export function populateArena(fighters) {
  return { type: arena.POPULATE_arena, payload: fighters };
}

export function filterArena(filteredFighters) {
  return { type: arena.FILTER_arena, payload: filteredFighters };
}

export function resetFilters() {
  return { type: arena.RESET_FILTERS };
}

export function incrementarenaPage() {
  return { type: arena.INCREMENT_PAGE_COUNTER };
}

export function resetarenaPage() {
  return { type: arena.RESET_PAGE_COUNTER };
}

export function selectFighterToBrawl(fighterId) {
  return { type: arena.SELECT_FIGHTER_TO_BRAWL, payload: fighterId };
}

export function resetSelectedFighter() {
  return { type: arena.RESET_SELECTED_FIGHTER };
}

export function populateArenaThunk(arenaService) {
  return (dispatch) => {
    arenaService.getFightersInArena()
      .then(fightersPromiseArray => Promise.all(fightersPromiseArray))
      .then(fighters => dispatch(populateArena(fighters)))
  }
}
