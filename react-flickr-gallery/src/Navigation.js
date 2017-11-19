import React from 'react';
// import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const Navigation = props => (
  <nav className="main-nav">
    <ul>
      <li><NavLink to="/cats">Cats</NavLink></li>
      <li><NavLink to="/dogs">Dogs</NavLink></li>
      <li><NavLink to="/flowers">Flowers</NavLink></li>
    </ul>
  </nav>
);

// Navigation.propTypes = {
//
// };

export default Navigation;
