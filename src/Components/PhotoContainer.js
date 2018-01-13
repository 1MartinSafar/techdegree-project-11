import React from "react";

// Axios - used to fetch the data from the Flickr API
import axios from 'axios';

// React Router
import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// Main Components //

// When the URL is invalid or a link is broken, this components tells the user
import PageNotFound from './PageNotFound';

import Navigation from './Navigation';
import SearchForm from './SearchForm';

// The photo-displaying components (default photos and currently searched photos)
import Cats from './Cats';
import Dogs from './Dogs';
import Flowers from './Flowers';
import CurrentPhotos from './CurrentPhotos';

export default class PhotoContainer extends React.Component {

  // Defines the state of the component - photos, title and loading indicator
  constructor() {
    super();
    this.state = {
      currentPhotos: [],
      imageTitle: "",
      loading: false,
      catsPhotos: [],
      dogsPhotos: [],
      flowersPhotos: []
    };
  }

  // Fetches the DEFAULT photos provided in the navigation links,
  // takes a QUERY (topic) and a STATE (the state of photos to modify)
  // Signals when the photos are loading and loaded
  fetchDefault = (query, state) => {
    // Signals that the photos are loading
    this.setState({
      loading: true
    });
    // Axios used to fetch the data from the Flickr API
    // using the provided apiKey from PhotoContainer props and the searched query
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.props.apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        // Updates the state of photos and signals that loading is done
        this.setState({
          [state]: response.data.photos.photo,
          loading: false
        });
      })
      // Let's the user know if an error occurs while fetching the data
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Searching for the photos the user requests
  performSearch = (query = 'cats') => {
    // Signals that the photos are loading
    this.setState({
      loading: true
    });
    // Axios used to fetch the data from the Flickr API
    // using the provided apiKey from PhotoContainer props and the searched query
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.props.apiKey}&tags=${query}&per_page=16&format=json&nojsoncallback=1`)
      .then(response => {
        // Updates current set of photos and signals that loading is done
        this.setState({
          currentPhotos: response.data.photos.photo,
          loading: false
        });
      })
      // Let's the user know if an error occurs while fetching the data
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Dynamic Photo Title - updates the title of the photos
  handleTitle = (titleValue) => {
    this.setState({imageTitle: titleValue});
  }


  // If the photos are loading, the loading indicator is displayed
  // Different components are displayed based on the current url
  // and the necessary functions and props are passed down to them

  // If the url is invalid, the PageNotFound component is displayed

  // note: the photos from the first navigation link (cats in this example)
  // are used as a default display - the default page gets redirected to Cats by default
  render() {
    return(
      <HashRouter>
        <div className="container">
          <Navigation />

          <Route exact path="/search" render={ () => <SearchForm onSearch={this.performSearch} onSelectTitle={this.handleTitle} /> } />
          <h1 style={{display: this.state.loading ? 'block' : 'none' }}><br/>Loading...</h1>

          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/cats"/> } />
            <Route exact path="/cats" render={ () => <Cats fetch={this.fetchDefault} photos={this.state.catsPhotos} title="Cats" /> } />
            <Route exact path="/dogs" render={ () => <Dogs fetch={this.fetchDefault} photos={this.state.dogsPhotos} title="Dogs" /> } />
            <Route exact path="/flowers" render={ () => <Flowers fetch={this.fetchDefault} photos={this.state.flowersPhotos} title="Flowers" /> } />
            <Route exact path="/search" render={ () => <CurrentPhotos photos={this.state.currentPhotos} title={this.state.imageTitle} /> } />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
