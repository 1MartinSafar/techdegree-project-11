import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config.js';

import Navigation from './Navigation';
import PhotoContainer from './PhotoContainer';
import SearchForm from './SearchForm';



class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      imageTitle: "cats",
      loading: true
    };
  }

  // TEST
  handleTitle = (titleValue) => {
    this.setState({imageTitle: titleValue});
  }



  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cats') => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    console.log(this.state.photos);
    return (
      <div className="container">

      <SearchForm onSearch={this.performSearch} onSelectTitle={this.handleTitle} />

      <Navigation />

      {
        (this.state.loading)
         ? <p>Loading...</p>
         : <PhotoContainer data={this.state.photos} imageTitle={this.state.imageTitle} />
      }

      {/* takes in a keyword and api key as props,
        and fetches the photos and other required
        information from the API */}

      {/* Category 1 */}
      {/* Category 2 */}
      {/* Category 3 */}

      {/* A component for each category you wish to display.
        For example, a Sunset component, a Flowers component,
        and a Clouds component.*/}

    </div>
    );
  }
}

export default App;
