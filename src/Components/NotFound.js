import React from 'react';

// This component will be displayed when no results match the searched topic
const NotFound = props => (
  <li className="not-found">
    <h3>No Results Found</h3>
    <p>Your search did not return any results. Please try again.</p>
  </li>
);

export default NotFound;
