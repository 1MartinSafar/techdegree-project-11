import React from 'react';

// The file containing the api key from Flickr - the user has to provide his own
import apiKey from './config.js';

// App Components => fetching happens in the PhotoContainer and passes the data
// down to the components that handle the displaying part
// The PhotoContainer also provides the main structure of the website and routing
import PhotoContainer from './Components/PhotoContainer';

// Creates the main wrapper for the website and gives the apiKey to the PhotoContainer
const App = () => (
  <div className="container">
    <PhotoContainer keyword="cats" apiKey={apiKey} />
  </div>
);

export default App;
