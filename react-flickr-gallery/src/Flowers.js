import React from "react";

import Photos from './Photos';

// const Dogs = props => {
class Flowers extends React.Component {

  componentDidMount() {
      this.props.fetch("flowers", "flowersPhotos");
  }

  render() {

    // console.log("FLOWERS PROPS DATA");
    // console.log(this.props.photos);

    const photoSet = this.props.photos;
    let photos;
    let title = this.props.title;
    // console.log("TITLE: " + title);
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
