// import React, { Component } from 'react';
import React from 'react';
import apiKey from './config.js';
// App Components
import PhotoContainer from './PhotoContainer';

const App = () => (
  <div className="container">
    <PhotoContainer keyword="cats" apiKey={apiKey} />
  </div>
);

export default App;
