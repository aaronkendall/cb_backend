import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ signedIn, selectedItem, handleNavSelection }) => {
   const isSelected = (pageName) => {
     return pageName === selectedItem;
   }

  return (
    <header className="navigation">
      <Link className="navigation__logo" to="/">Crypto Brawlers</Link>
      <nav className="navigation__links">
        {!signedIn &&
          <Link
            className={`navigation__links--item ${isSelected('signin') ? 'selected' : ''}`}
            to="/signin"
            onClick={() => handleNavSelection('signin')}>
            Sign In
          </Link>}

        {signedIn &&
          <Link
            className={`navigation__links--item ${isSelected('account') ? 'selected' : ''}`}
            to="/account"
            onClick={() => handleNavSelection('account')}>
            Account
          </Link>}
        {signedIn &&
          <Link
            className={`navigation__links--item ${isSelected('marketplace') ? 'selected' : ''}`}
            to="/marketplace"
            onClick={() => handleNavSelection('marketplace')}>
            Marketplace
          </Link>}
        {signedIn &&
          <Link
            className={`navigation__links--item ${isSelected('arena') ? 'selected' : ''}`}
            to="/arena"
            onClick={() => handleNavSelection('arena')}>
            Arena
          </Link>}
      </nav>
    </header>
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
