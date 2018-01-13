import React from 'react';

// Uses the passed-down url to display an actual photo
const Photos = props => (
  <li>
    <img src={props.url} alt="" width="220" height="165"/>
  </li>
);

export default Photos;
