import React from 'react';

const CurrentPhoto = props => (
  <li>
    <img src={props.url} alt="" width="220" height="165"/>
  </li>
);

export default CurrentPhoto;
