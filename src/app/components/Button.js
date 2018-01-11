import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, handleClick, type }) => (
  <button className={`btn btn--${type}`} onClick={handleClick}>{text}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  type: PropTypes.string
};

Button.defaultProps = {
  handleClick: () => {},
  type: 'primary'
};

export default Button;
