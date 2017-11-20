import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config.js';
// React Router
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
// App Components
import PhotoContainer from './PhotoContainer';

const App = () => (
  <div className="container">
    <PhotoContainer keyword="cats" apiKey={apiKey} />
  </div>
);

export default App;
