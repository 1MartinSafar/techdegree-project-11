import React from "react";

// The component responsible for displaying actual images
import Photos from './Photos';
// The component displayed if there are no search results
import NotFound from './NotFound';

// Takes care of the presentation of the CURRENTLY SEARCHED photos by passing each photo from the
// passed-down set to the Photos component which displays each photo
// (if there is a set of photos)
const CurrentPhotos = (props, {match}) => {
  const photoSet = props.photos;
  let photos;
  let title = props.title;

  // If the user hasn't searched for photos yet, the message invites him to do so.
  if (props.title === "") {
    title = "Search Photos";
  }

  // If the user already searched for photos and the search was successful,
  // the results are displayed - otherwise the NotFound component lets the user
  // know that no results were found
  else if (photoSet.length) {
    photos = photoSet.map(photo => <Photos url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
  } else {
    title = "";
    photos = <NotFound />;
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

export default CurrentPhotos;
