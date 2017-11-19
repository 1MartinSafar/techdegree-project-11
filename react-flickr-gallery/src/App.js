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


class App extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     photos: [],
  //     imageTitle: "cats",
  //     loading: true,
  //     sunsetPhotos: [],
  //     flowersPhotos: [],
  //     cloudsPhotos: []
  //   };
  // }

  // // Dynamic Photo Title
  // handleTitle = (titleValue) => {
  //   this.setState({imageTitle: titleValue});
  // }

  // componentDidMount() {
  //   console.log("COMPONENT DID MOUNT ACTIVATED");
  //   this.performSearch();
  //   console.log("FETCHING DEFAULT PHOTOS: sunset, flowers, clouds");
  //   this.fetchDefault("sunset", "sunsetPhotos");
  //   this.fetchDefault("flowers", "flowersPhotos");
  //   this.fetchDefault("clouds", "cloudsPhotos");
  // }
  //
  // performSearch = (query = 'cats') => {
  //   axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
  //     .then(response => {
  //       this.setState({
  //         photos: response.data.photos.photo,
  //         loading: false
  //       });
  //     })
  //     .catch(error => {
  //       console.log('Error fetching and parsing data', error);
  //     });
  // }
  //
  // fetchDefault = (query, state) => {
  //   axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
  //     .then(response => {
  //       this.setState({
  //         [state]: response.data.photos.photo,
  //       });
  //     })
  //     .catch(error => {
  //       console.log('Error fetching and parsing data', error);
  //     });
  // }

  render() {
    // console.log("APP RENDER()");
    // console.log(this.state.photos);
    return (
        <div className="container">

          <SearchForm onSearch={this.performSearch} onSelectTitle={this.handleTitle} />

          <Navigation />

          {/* BRING BACK THE LOADING LATER*/}
          <PhotoContainer keyword="cats" apiKey={apiKey} />
          <PhotoContainer keyword="dogs" apiKey={apiKey} />

          { /*

          {
            (this.state.loading)
             ? <p>Loading...</p>
             : <PhotoContainer data={this.state.photos} imageTitle={this.state.imageTitle} />

          }

          {
            (this.state.loading)
             ? <p>Loading...</p>
             : <Sunset data={this.state.sunsetPhotos} />

          }

          {
            (this.state.loading)
             ? <p>Loading...</p>
             : <Flowers data={this.state.flowersPhotos} />

          }

          {
            (this.state.loading)
             ? <p>Loading...</p>
             : <Clouds data={this.state.cloudsPhotos} />

          }

          { takes in a keyword and api key as props,
            and fetches the photos and other required
            information from the API }

          */ }



      </div>
    );
  }
}

export default App;
