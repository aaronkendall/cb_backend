import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ signedIn }) => (
  <nav className="navigation">
    <li className="navigation--item"><Link to="/">Home</Link></li>
    {!signedIn && <li className="navigation--item"><Link to="/signin">Sign In</Link></li>}

    {signedIn && <li className="navigation--item"><Link to="/account">Account</Link></li>}
    {signedIn && <li className="navigation--item"><Link to="/training">Training</Link></li>}
    {signedIn && <li className="navigation--item"><Link to="/marketplace">Marketplace</Link></li>}
    {signedIn && <li className="navigation--item"><Link to="/arena">Arena</Link></li>}
  </nav>
);

NavBar.propTypes = {
  signedIn: PropTypes.bool
};

NavBar.defaultProps = {
  signedIn: false
};

export default NavBar;
