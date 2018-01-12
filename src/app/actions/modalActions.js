import { ACTION_TYPES } from '../utils/constants';
const { modal } = ACTION_TYPES;

export function showModal(innerComponent) {
  return { type: modal.SHOW_MODAL, payload: { contents: innerComponent, showModal: true } };
}

export function closeModal() {
  return { type: modal.CLOSE_MODAL };
}

export function updateFighterPrice(price) {
  return { type: modal.UPDATE_FIGHTER_PRICE, payload: price };
}
