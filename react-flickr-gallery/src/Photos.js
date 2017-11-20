import React from 'react';

const Photos = props => (
  <li>
    <img src={props.url} alt="" width="220" height="165"/>
  </li>
);

export default Photos;
