import React from "react";
import {
  APIProvider,
  Map as ReactGoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";

import "./Map.css";

const Map = (props) => {
  return (
    <div className={`map ${props.className}`} style={props.style}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
        <ReactGoogleMap
          defaultCenter={{
            lat: props.coordinates.lat,
            lng: props.coordinates.lng,
          }}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker
            position={{
              lat: props.coordinates.lat,
              lng: props.coordinates.lng,
            }}
          />
        </ReactGoogleMap>
      </APIProvider>
    </div>
  );
};

export default Map;
