import React from 'react';
import { NavLink } from 'react-router-dom';

// The site's navigation links - the default photos and a search field
const Navigation = props => (
  <nav className="main-nav">
    <ul>
      <li><NavLink to="/cats">Cats</NavLink></li>
      <li><NavLink to="/dogs">Dogs</NavLink></li>
      <li><NavLink to="/flowers">Flowers</NavLink></li>
      <li><NavLink to="/search">Search</NavLink></li>
    </ul>
  </nav>
);

export default Navigation;
