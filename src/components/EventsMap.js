import React, { useEffect, useState } from "react";
import Map from "./Map";
import Nav from "./Nav";
import { myApi } from "../App";

const EventsMap = () => {
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const loadEvents = async () => {
        let data = await fetch(
          "https://fierce-reef-16155.herokuapp.com/events",
          {
            // mode: "cors",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          }
        );
        let refinedData = await data.json();
        setEventData(refinedData.events);
        setIsLoading(false);
      };

      loadEvents();
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="bg-yellow min-h-screen">
        <Nav />
        <div className="bg-yellow flex h-screen w-full align-middle">
          <div className="flex justify-center flex-col mx-auto">
            <div className="flex items-center justify-center space-x-2 animate-pulse">
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
            </div>
            <div className="text-center text-sm text-black mt-4">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    let eventLocations = eventData.map((event) => {
      return {
        name: event.name,
        id: event._id,
        lat: event.location.lat,
        lon: event.location.lon,
      };
    });
    let defaultLocation = {
      address: "",
      lat: 47.116,
      lon: -101.3,
    };
    return (
      <div className="bg-yellow min-h-screen">
        <Nav />
        <div className="lg:flex lg:justify-center lg:min-h-screen">
          <div className="mx-3 lg:w-3/4">
            <h3 className="text-base text-center mb-4">Events - All</h3>
            <div className="h-96 border border-orange lg:h-4/5">
              <Map
                locations={eventLocations}
                defaultLocation={defaultLocation}
                zoomLevel={1}
                mapHeight={"100%"}
                showPin={false}
              />
            </div>
            <div className="h-4"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default EventsMap;
