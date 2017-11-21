import React from "react";
// import React, { Component } from 'react';
// import PropTypes from "prop-types";
import axios from 'axios';
import apiKey from './config.js';
// React Router
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
// App Components
import Photos from './Photos';
import NotFound from './NotFound';

import Navigation from './Navigation';
import SearchForm from './SearchForm';

import Cats from './Cats';
import Dogs from './Dogs';
import Flowers from './Flowers';

import CurrentPhotos from './CurrentPhotos';

// FLICKR URL FORMAT
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// EXAMPLE
// https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

export default class PhotoContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPhotos: [],
      imageTitle: "",
      loading: true,
      catsPhotos: [],
      dogsPhotos: [],
      flowersPhotos: []
    };
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT ACTIVATED: PhotoContainer.js");
    // this.performSearch(this.props.keyword);
    // console.log("FETCHING DEFAULT PHOTOS: cats, dogs, flowers");
    // this.fetchDefault("cats", "catsPhotos");
    // this.fetchDefault("dogs", "dogsPhotos");
    // this.fetchDefault("flowers", "flowersPhotos");
    console.log("DEFAULT PHOTOS: ");
    this.fetchDefault("cats", "currentPhotos");
  }

  fetchDefault = (query, state) => {
    this.setState({
      loading: true
    });
    console.log("     X          ");
    console.log("      X         ");
    console.log("       X        ");
    console.log("FETCHING PHOTOS FOR: ");
    console.log(query + " >> " + state);
    console.log("     X          ");
    console.log("      X         ");
    console.log("       X        ");
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        console.log("fetchDefault RESPONSE >>>>>");
        console.log(response.data.photos.photo);
        this.setState({
          [state]: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Searching for photos and displaying the default photos
  performSearch = (query = 'cats') => {
    this.setState({
      loading: true
    });
    console.log("     X          ");
    console.log("      X         ");
    console.log("       X        ");
    console.log("UPDATING CURRENT PHOTOS TO: ");
    console.log(query);
    console.log("     X          ");
    console.log("      X         ");
    console.log("       X        ");
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        console.log("performSearch RESPONSE >>>>>");
        console.log(response.data.photos.photo);
        this.setState({
          currentPhotos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Dynamic Photo Title
  handleTitle = (titleValue) => {
    // console.log(">>>>> CHANGING TITLE TO: " + titleValue);
    // console.log(">>>>> PHOTOS: ");
    // console.log(this.state.currentPhotos);
    // if (this.state.currentPhotos.length !== 0) {
    //   this.setState({imageTitle: titleValue});
    // }
    this.setState({imageTitle: titleValue});
  }

  render() {
    // console.log("PhotoContainer PROPS: ");
    // console.log(this.props.keyword);
    // console.log(this.props.apiKey);

    const results = this.state.currentPhotos;
    let photos;
    let title = this.state.imageTitle;
    // console.log("TITLE: " + title);
    if (results.length) {
      photos = results.map(photo => <Photos url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
    } else {
      photos = <NotFound />
    }

    return(
      <BrowserRouter>
        <div className="container">
          <Navigation />

          <Route path="/search" render={ () => <SearchForm onSearch={this.performSearch} onSelectTitle={this.handleTitle} /> } />

          <h1 style={{display: this.state.loading ? 'block' : 'none' }}><br/>Loading...</h1>


          <Route path="/search" render={ () => <CurrentPhotos photos={this.state.currentPhotos} title={this.state.imageTitle} /> } />

          <Switch>
            {/*<Route exact path="/" render={ () => <CurrentPhotos photos={this.state.currentPhotos} title={this.state.imageTitle} /> } />*/}
            {/*<Route exact path="/" render={ () => <Cats photos={this.state.catsPhotos} title="Cats" /> } />*/}
            <Route exact path="/" render={ () => <CurrentPhotos photos={this.state.currentPhotos} title="Cats" /> } />
            <Route path="/cats" render={ () => <Cats fetch={this.fetchDefault} photos={this.state.catsPhotos} title="Cats" /> } />
            <Route path="/dogs" render={ () => <Dogs fetch={this.fetchDefault} photos={this.state.dogsPhotos} title="Dogs" /> } />
            <Route path="/flowers" render={ () => <Flowers fetch={this.fetchDefault} photos={this.state.flowersPhotos} title="Flowers" /> } />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

// <SearchForm onSearch={this.performSearch} onSelectTitle={this.handleTitle} />
// <Route exact path="/" component={Home} />

// <Route path="/cats" component={Cats photos={this.state.catsPhotos}} />
// <Route path="/cats" render={ () => <PhotoContainer keyword="cats" apiKey={apiKey} /> } />
// export default PhotoContainer;
