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
import Navigation from './Navigation';
import PhotoContainer from './PhotoContainer';
import SearchForm from './SearchForm';

import Cats from './Cats';
import Dogs from './Dogs';
import Flowers from './Flowers';


const App = () => (
  <BrowserRouter>
    <div className="container">
      <SearchForm onSearch={this.performSearch} onSelectTitle={this.handleTitle} />
      <Navigation />

      <Switch>
        <Route path="/cats" render={ () => <PhotoContainer keyword="cats" apiKey={apiKey} /> } />
        <Route path="/dogs" render={ () => <PhotoContainer keyword="dogs" apiKey={apiKey} /> } />
        <Route path="/flowers" render={ () => <PhotoContainer keyword="flowers" apiKey={apiKey} /> } />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
