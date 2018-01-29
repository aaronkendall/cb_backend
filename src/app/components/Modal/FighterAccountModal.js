import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { HEALING_PRICE_INCREASE } from '../../utils/constants';

const FighterAccountModal = ({
  fighter,
  handleTrainFighter,
  handleHealFighter,
  handleCloseModal,
  handleAddFighterToMarketplace,
  handleUpdatePrice,
  trainingPrice,
  handleAddFighterToArena,
  handleCancelFighterSale,
  handleCancelFighterBrawl
}) => {
  const { id, health, maxHealth, strength, speed, level, isForSale, isInArena } = fighter;

  return (
    <div className="modal-container__contents-container">
      <i className="icon icon--modal-close" onClick={handleCloseModal} />
      <h3 className="fighter-account-modal--title">{`Fighter #${id}`}</h3>
      <div className="fighter-account-modal__fighter">
        <img className="fighter-account-modal__fighter--image" src={`/img/fighter${id}.png`} />
        <ul className="fighter-account-modal__fighter--info">
          <li className="fighter-account-modal__fighter__info--item">
            <i className="icon icon--health fighter-account-modal__fighter__info--icon" />
            <span className="fighter-account-modal__fighter__info--text">Health: <strong>{health}</strong></span>
            <Button type='tertiary' text='Heal Fighter' handleClick={() => handleHealFighter(id)} subText={`costs ${trainingPrice} ETH`}/>
          </li>
          <li className="fighter-account-modal__fighter__info--item">
            <i className="icon icon--max-health fighter-account-modal__fighter__info--icon" />
            <span className="fighter-account-modal__fighter__info--text">Max Health: <strong>{maxHealth}</strong></span>
            <Button type='tertiary' text='Train Max Health' handleClick={() => handleTrainFighter(id, 'maxHealth')} subText={`costs ${trainingPrice} ETH`} />
          </li>
          <li className="fighter-account-modal__fighter__info--item">
            <i className="icon icon--strength fighter-account-modal__fighter__info--icon" />
            <span className="fighter-account-modal__fighter__info--text">Strength: <strong>{strength}</strong></span>
            <Button type='tertiary' text='Train Strength' handleClick={() => handleTrainFighter(id, 'strength')} subText={`costs ${trainingPrice} ETH`} />
          </li>
          <li className="fighter-account-modal__fighter__info--item">
            <i className="icon icon--speed fighter-account-modal__fighter__info--icon" />
            <span className="fighter-account-modal__fighter__info--text">Speed: <strong>{speed}</strong></span>
            <Button type='tertiary' text='Train Speed' handleClick={() => handleTrainFighter(id, 'speed')} subText={`costs ${trainingPrice} ETH`} />
          </li>
        </ul>
      </div>
      <div className="fighter-account-modal__other-actions">
        <div className="fighter-account-modal__other-actions--action">
          <h3 className="fighter-account-modal__other-actions--action--title">Marketplace</h3>
          {(!isForSale && !isInArena) && <form onSubmit={(e) => handleAddFighterToMarketplace(e, fighter)}>
            <input
              placeholder='price in ETH'
              className="fighter-account-modal__other-actions--action--input"
              type="text"
              onChange={handleUpdatePrice}
              />
            <Button type='red' text='Add To Marketplace' handleClick={(e) => handleAddFighterToMarketplace(e, fighter)} />
          </form>}
          {isInArena && <Button text='Fighter is in arena' isDisabled />}
          {isForSale && <Button type='red' text='Cancel Sale' handleClick={() => handleCancelFighterSale(id)} />}
        </div>
        <div className="fighter-account-modal__other-actions--action">
          <h3 className="fighter-account-modal__other-actions--action--title">Arena</h3>
          {(!isForSale && !isInArena) && <Button type='red' text='Add To Arena' handleClick={() => handleAddFighterToArena(fighter)} />}
          {isForSale && <Button text='Fighter is for sale' isDisabled />}
          {isInArena && <Button type='red' text='Remove from arena' handleClick={() => handleCancelFighterBrawl(id)} />}
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
  handleUpdatePrice: PropTypes.func.isRequired,
  handleCancelFighterSale: PropTypes.func.isRequired,
  handleCancelFighterBrawl: PropTypes.func.isRequired,
  trainingPrice: PropTypes.number.isRequired
};

export default FighterAccountModal;
