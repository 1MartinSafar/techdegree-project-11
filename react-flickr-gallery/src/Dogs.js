import React from "react";

import CurrentPhoto from './CurrentPhoto';
import NotFound from './NotFound';

// FLICKR URL FORMAT
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// EXAMPLE
// https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

const Dogs = props => {

  console.log("DOGS PROPS DATA");
  console.log(props.photos);

  const photoSet = props.photos;
  let photos;
  let title = props.title;
  console.log("TITLE: " + title);
  if (photoSet.length) {
    photos = photoSet.map(photo => <CurrentPhoto url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
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

export default Dogs;
