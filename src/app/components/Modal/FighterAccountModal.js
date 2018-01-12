import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

const FighterAccountModal = ({
  fighter,
  handleTrainFighter,
  handleHealFighter,
  handleCloseModal,
  handleAddFighterToMarketplace,
  handleUpdatePrice,
  price,
  handleAddFighterToArena
}) => {
  const { id, health, maxHealth, strength, speed, level } = fighter;
  
  return (
    <div className="modal-container__contents-container">
      <i className="icon icon--modal-close" />
      <div className="fighter-account-modal__fighter">
        <img className="fighter-account-modal__fighter--image" src={`/img/fighter${id}.png`} />
        <ul className="fighter-account-modal__fighter--info">
          <li className="fighter-account-modal__fighter__info--item">
            <i className="icon icon--health fighter-account-modal__fighter__info--icon" />
            <span className="fighter-account-modal__fighter__info--text">Health: {health}</span>
            <Button type='tertiary' text='Heal Fighter' onClick={() => handleHealFighter(id)} />
          </li>
          <li className="fighter-account-modal__fighter__info--item">
            <i className="icon icon--max-health fighter-account-modal__fighter__info--icon" />
            <span className="fighter-account-modal__fighter__info--text">Max Health: {maxHealth}</span>
            <Button type='tertiary' text='Train Max Health' onClick={() => handleTrainFighter(id, 'maxHealth')} />
          </li>
          <li className="fighter-account-modal__fighter--info--item">
            <i className="icon icon--strength fighter-account-modal__fighter__info--item--icon" />
            <span className="fighter-account-modal__fighter__info--text">Strength: {strength}</span>
            <Button type='tertiary' text='Train Strength' onClick={() => handleTrainFighter(id, 'strength')} />
          </li>
          <li className="fighter-account-modal__fighter--info--item">
            <i className="icon icon--speed fighter-account-modal__fighter__info--icon" />
            <span className="fighter-account-modal__fighter__info--text">Speed: {speed}</span>
            <Button type='tertiary' text='Train Speed' onClick={() => handleTrainFighter(id, 'speed')} />
          </li>
        </ul>
      </div>
      <div className="fighter-account-modal__other-actions">
        <div className="fighter-account-modal__other-actions--action">
          <h3 className="fighter-account-modal__other-actions--action--title">Marketplace</h3>
          <form>
            <input className="fighter-account-modal__other-actions--action--input" type="text" onChange={handleUpdatePrice} />
            <Button type='red' text='Add To Marketplace' onClick={() => handleAddFighterToMarketplace(id, price)} />
          </form>
        </div>
        <div className="fighter-account-modal__other-actions--action">
          <h3 className="fighter-account-modal__other-actions--action--title">Arena</h3>
          <Button type='red' text='Add To Arena' onClick={() => handleAddFighterToArena(id)} />
        </div>
      </div>
    </div>
  );
};

FighterAccountModal.propTypes = {
  fighter: PropTypes.object.isRequired,
  handleTrainFighter: PropTypes.func.isRequired,
  handleHealFighter: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleAddFighterToArena: PropTypes.func.isRequired,
  handleAddFighterToMarketplace: PropTypes.func.isRequired,
  handleUpdatePrice: PropTypes.func.isRequired
};

export default FighterAccountModal;
