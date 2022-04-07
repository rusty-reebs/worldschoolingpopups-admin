import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import "../index.css";

const googleApi = process.env.REACT_APP_API_KEY;

const Map = ({ locations, defaultLocation, zoomLevel, mapHeight, showPin }) => {
  const eventPin = {
    address: "",
    lat: defaultLocation.lat,
    lng: defaultLocation.lon,
  };
  return (
    <div style={{ height: mapHeight, width: "100%" }}>
      <GoogleMapReact
        //! move API key to backend and fetch it. More secure.
        bootstrapURLKeys={{ key: googleApi }}
        defaultCenter={eventPin}
        defaultZoom={zoomLevel}
      >
        {locations
          ? locations.map((event) => (
              <LocationPin
                key={event.id}
                lat={event.lat}
                lng={event.lon}
                name={event.name}
                id={event.id}
              />
            ))
          : null}
        {showPin ? (
          <LocationPin
            lat={defaultLocation.lat}
            lng={defaultLocation.lon}
            noRedirect={showPin}
          />
        ) : null}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
