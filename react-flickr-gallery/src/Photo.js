import React from 'react';

const Photo = props => (
  <li>
    <img src={props.url} alt="" width="220" height="165"/>
  </li>
);

export default Photo;
