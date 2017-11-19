import React from "react";
// import PropTypes from "prop-types";
import Photo from './Photo';
import NotFound from './NotFound';

// FLICKR URL FORMAT
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// EXAMPLE
// https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

const Clouds = props => {

  console.log("Clouds PROPS DATA");
  console.log(props.data);

  const results = props.data;
  let photos;
  let title = props.imageTitle;
  console.log("TITLE: " + title);
  if (results.length) {
    photos = results.map(photo => <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
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

export default Clouds;
