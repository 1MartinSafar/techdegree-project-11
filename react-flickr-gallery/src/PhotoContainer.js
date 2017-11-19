import React from "react";
// import PropTypes from "prop-types";
import CurrentPhoto from './CurrentPhoto';
import NotFound from './NotFound';

import axios from 'axios';
import apiKey from './config.js';

// FLICKR URL FORMAT
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// EXAMPLE
// https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

export default class PhotoContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPhotos: [],
      imageTitle: "cats",
      loading: true,
      catsPhotos: [],
      dogsPhotos: [],
      flowersPhotos: []
    };
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT ACTIVATED");
    this.performSearch(this.props.keyword);
    console.log("FETCHING DEFAULT PHOTOS: cats, dogs, flowers");
    this.fetchDefault("cats", "catsPhotos");
    this.fetchDefault("dogs", "dogsPhotos");
    this.fetchDefault("flowers", "flowersPhotos");
  }

  fetchDefault = (query, state) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          [state]: response.data.photos.photo,
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Searching for photos and displaying the default photos
  performSearch = (query = 'cats') => {
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
    this.setState({imageTitle: titleValue});
  }

  render() {
    console.log("PhotoContainer PROPS: ");
    console.log(this.props.keyword);
    console.log(this.props.apiKey);

    const results = this.state.currentPhotos;
    let photos;
    let title = this.state.imageTitle;
    console.log("TITLE: " + title);
    if (results.length) {
      photos = results.map(photo => <CurrentPhoto url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
    } else {
      photos = <NotFound />
    }

    return(
      <div className="photo-container">
        <h2>{title}</h2>
        <ul>
          {photos}
        </ul>
      </div>
    );
  }
}

// export default PhotoContainer;
