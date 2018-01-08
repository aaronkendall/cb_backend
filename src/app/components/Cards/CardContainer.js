import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const CardContainer = ({ items, isMarketplace, handleClick }) => (
  <div className="card-container">
    {items.map(item => <Card {...item} isMarketplace handleClick={handleClick} />)}
  </div>
);

CardContainer.propTypes = {
  items: PropTypes.array,
  isMarketplace: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

CardContainer.defaultProps = {
  items: [],
  isMarketplace: false,
};

export default CardContainer;
