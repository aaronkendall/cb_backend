import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, handleClick, type, isDisabled, subText }) => (
  <button
    className={`btn btn--${type} ${isDisabled ? 'btn--disabled' : ''}`}
    onClick={isDisabled ? () => {} : handleClick}
    >
    {text}
    <span className="btn--subtitle">{subText}</span>
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  type: PropTypes.string,
  subText: PropTypes.string,
  isDisabled: PropTypes.bool
};

Button.defaultProps = {
  handleClick: () => {},
  type: 'primary',
  subText: '',
  isDisabled: false
};

export default Button;
