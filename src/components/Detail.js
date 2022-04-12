import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import CarouselComp from "./Carousel";
import Nav from "./Nav";
import Map from "./Map";
import { myApi } from "../App";
import { transformImages } from "./Cloudinary";
import { FaCalendar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaWalking } from "react-icons/fa";
import { FaSnowflake } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const Detail = (props) => {
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();
  let eventId = params.eventId.toString();
  // if params.eventId not true then use url string

  useEffect(() => {
    try {
      const loadEvent = async () => {
        let data = await fetch(
          myApi + "/events/" + eventId,
          // "https://fierce-reef-16155.herokuapp.com/events/" + eventId,
          {
            method: "GET",
            // mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let refinedData = await data.json();
        // console.log(refinedData);
        setEventData(refinedData);
        setIsLoading(false);
      };

      loadEvent();
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="bg-yellow flex h-screen w-full align-middle">
        <div className="flex justify-center flex-col mx-auto">
          <div className="flex items-center justify-center space-x-2 animate-pulse">
            <div className="w-8 h-8 bg-orange rounded-full"></div>
            <div className="w-8 h-8 bg-orange rounded-full"></div>
            <div className="w-8 h-8 bg-orange rounded-full"></div>
          </div>
          <div className="text-center text-sm text-black mt-4">Loading...</div>
        </div>
      </div>
    );
  } else {
    let transformedImages = transformImages(eventData.images);
    let newImageUrls = [];
    if (transformedImages.length > 1) {
      newImageUrls = transformedImages.map((image) => {
        return image.toURL();
      });
    } else {
      newImageUrls = [transformedImages.toURL()];
    }
    let startDate = new Date(eventData.date.start);
    let endDate = new Date(eventData.date.end);
    let formattedStart = startDate.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    let formattedEnd = endDate.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className="bg-yellow min-h-screen w-full">
        <div className="hidden lg:block">
          <Nav />
        </div>
        <div className="lg:hidden">
          <CarouselComp images={eventData.images} />
        </div>

        <div className="hidden lg:flex lg:w-4/5 lg:mx-auto lg:justify-start lg:gap-x-5">
          {newImageUrls.map((image, index) => {
            return (
              <div key={index} className="lg:h-72 lg:mb-6">
                <img
                  src={image}
                  className="block rounded-md h-full"
                  alt={"eventimage" + index}
                />
              </div>
            );
          })}
        </div>
        <div className="lg:w-4/5 lg:mx-auto">
          <div className="mb-2 bg-darkblue lg:rounded-md">
            <div className="mx-5 py-3  text-white">
              <h2 className="text-2xl">{eventData.name}</h2>
              <p>
                <FaMapMarkerAlt className="inline text-white" />
                &nbsp;&nbsp;
                {eventData.location.city}, {eventData.location.country}
              </p>
              {eventData.date.start ? (
                <p>
                  <FaCalendar className="inline text-white" />
                  &nbsp;&nbsp;
                  {eventData.date.eventType
                    ? formattedStart + " - " + formattedEnd
                    : "Open-ended / Continuous"}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mx-5">
            <div className="lg:flex lg:flex-row lg:justify-between lg:gap-3">
              <div className="lg:basis-3/5 lg:order-1">
                <div className="border-b border-orange py-2">
                  <p className="font-bold italic">
                    <FaBed className="inline text-darkblue" />
                    &nbsp; Accommodation {eventData.accomIncluded
                      ? ""
                      : "NOT"}{" "}
                    included in price.
                  </p>
                </div>
                {eventData.age.min && eventData.age.max ? (
                  <div className="border-b border-orange py-2">
                    <p className="font-bold">
                      <FaChild className="inline text-darkblue" />
                      &nbsp; For ages {eventData.age.min} - {eventData.age.max}{" "}
                      years.
                    </p>
                  </div>
                ) : null}
                <div className="border-b border-orange py-2">
                  <p className="text-base">{eventData.description}</p>
                </div>
                <div className="border-b border-orange py-2">
                  <h4 className="mb-2 font-bold">
                    <FaInfoCircle className="inline text-darkblue" />
                    &nbsp; Other information
                  </h4>
                  <div className="mx-2">
                    {eventData.excursions.length >= 1 ? (
                      <div>
                        <p className="mt-3 text-sm lg:text-base font-bold">
                          <FaWalking className="inline text-darkblue" />
                          &nbsp; Excursions:&nbsp;
                        </p>
                        <ul className="list-disc list-inside">
                          {eventData.excursions.map((excursion) => {
                            return (
                              <li className="text-sm lg:text-base italic">
                                {excursion}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                    {eventData.temperature.low && eventData.temperature.high && (
                      <div>
                        <p className="mt-3 text-sm lg:text-base font-bold">
                          <FaSnowflake className="inline text-darkblue" />
                          &nbsp; Average temperatures for the period:&nbsp;
                        </p>
                        <ul className="list-disc list-inside">
                          <li className="text-sm lg:text-base italic">
                            {eventData.temperature.low} -{" "}
                            {eventData.temperature.high}
                            &#176;C.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-b border-orange mb-2 py-2">
                  <h4 className="mb-2 font-bold">
                    <FaAddressCard className="inline text-darkblue" />
                    &nbsp; Contact
                  </h4>
                  <div className="mx-2">
                    {eventData.contact.name ? (
                      <p className="text-sm lg:text-base font-bold mb-2">
                        {eventData.contact.name}
                      </p>
                    ) : null}
                    {eventData.contact.email ? (
                      <p className="text-sm lg:text-base">
                        <FaEnvelope className="inline text-darkblue" />
                        &nbsp;&nbsp;
                        <a
                          href={"mailto:" + eventData.contact.email}
                          className="hover:underline"
                        >
                          {eventData.contact.email}
                        </a>
                      </p>
                    ) : null}
                    {eventData.contact.fbPage ? (
                      <p className="break-words">
                        <FaFacebook className="inline text-darkblue" />
                        &nbsp;&nbsp;
                        <a
                          href={`https://${eventData.contact.fbPage}`}
                          className="hover:underline text-xs lg:text-base"
                        >
                          {eventData.contact.fbPage}
                        </a>
                      </p>
                    ) : null}
                    {eventData.contact.website ? (
                      <p>
                        <FaGlobe className="inline text-darkblue" />
                        &nbsp;&nbsp;
                        <a
                          href={`https://${eventData.contact.website}`}
                          // target="_blank"
                          className="hover:underline text-sm lg:text-base"
                        >
                          {eventData.contact.website}
                        </a>
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="lg:order-2 lg:w-5/12">
                <div className="border-b border-orange mb-2 py-2 lg:border-none lg:mb-0">
                  <Map
                    defaultLocation={eventData.location}
                    zoomLevel={13}
                    mapHeight={"40vh"}
                    showPin={true}
                  />
                </div>
                <p className="text-right text-xs italic">
                  * Location may not be exact.
                </p>
              </div>
            </div>
            <div className="h-4 lg:h-10"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default Detail;
