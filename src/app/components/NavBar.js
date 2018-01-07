import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ signedIn, selectedItem, handleNavSelection }) => {
   const isSelected = (pageName) => {
     return pageName === selectedItem;
   }

  return (
    <nav className="navigation">
      <Link className="navigation__logo" to="/" onClick={() => handleNavSelection('home')}>Crypto Brawlers</Link>
      <ul className="navigation__links">
        {!signedIn && <li className={`navigation__links--item ${isSelected('signin') ? 'selected' : ''}`}>
          <Link to="/signin" onClick={() => handleNavSelection('home')}>Sign In</Link>
        </li>}

        {signedIn && <li className={`navigation__links--item ${isSelected('account') ? 'selected' : ''}`}>
          <Link to="/account" onClick={() => handleNavSelection('account')}>Account</Link>
        </li>}
        {signedIn && <li className={`navigation__links--item ${isSelected('training') ? 'selected' : ''}`}>
          <Link to="/training" onClick={() => handleNavSelection('training')}>Training</Link>
        </li>}
        {signedIn && <li className={`navigation__links--item ${isSelected('marketplace') ? 'selected' : ''}`}>
          <Link to="/marketplace" onClick={() => handleNavSelection('marketplace')}>Marketplace</Link>
        </li>}
        {signedIn && <li className={`navigation__links--item ${isSelected('arena') ? 'selected' : ''}`}>
          <Link to="/arena" onClick={() => handleNavSelection('arena')}>Arena</Link>
        </li>}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  signedIn: PropTypes.bool,
  selectedItem: PropTypes.string.isRequired,
  handleNavSelection: PropTypes.func.isRequired
};

NavBar.defaultProps = {
  signedIn: false
};

export default NavBar;
