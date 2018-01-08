import React from 'react';
import PropTypes from 'prop-types';

import { getImageId } from '../../utils/fighterUtils';

const Card = ({ id, level, maxHealth, health, strength, speed, handleClick, isMarketplace, price }) => (
  <div className="card" onClick={() => handleClick(id)}>
    <h3 className="card__title">{`Fighter #${id}`}</h3>
    {isMarketplace && <h4 className="card__subtitle">{`Price : ${price}`}</h4>}
    <img className="card__image" src={`/img/fighter${getImageId(id)}.png`} />
    <h4 className="card__subtitle">{`Level ${level}`}</h4>
    <ul className="card__info">
      <li className="card__info--item">
        <i className="icon icon--health card__info--item--icon" />
        <span className="card__info--item--text">{health}</span>
      </li>
      <li className="card__info--item">
        <i className="icon icon--max-health card__info--item--icon" />
        <span className="card__info--item--text">{maxHealth}</span>
      </li>
      <li className="card__info--item">
        <i className="icon icon--strength card__info--item--icon" />
        <span className="card__info--item--text">{strength}</span>
      </li>
      <li className="card__info--item">
        <i className="icon icon--speed card__info--item--icon" />
        <span className="card__info--item--text">{speed}</span>
      </li>
    </ul>
  </div>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  health: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  isMarketplace: PropTypes.bool,
  price: PropTypes.number
};

Card.defaultProps = {
  isMarketplace: false,
  price: 0
};
