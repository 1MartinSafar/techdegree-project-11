import React from "react";

// The component responsible for displaying actual images
import Photos from './Photos';

// This component displaying one of the default topics provided in the navigation
class Flowers extends React.Component {

  // Each time the user gets to this component, new data is fetched
  // using the passed-down fetching function from PhotoContainer
  componentDidMount() {
      this.props.fetch("flowers", "flowersPhotos");
  }

  // Takes care of the presentation of the photos by passing each photo from the
  // passed-down set to the Photos component which displays each photo
  // (if there is a set of photos)
  render() {
    const photoSet = this.props.photos;
    let photos;
    let title = this.props.title;
    // Passing the url based on the Flickr API down to the Photos component
    if (photoSet.length) {
      photos = photoSet.map(photo => <Photos url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
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

export default Flowers;
