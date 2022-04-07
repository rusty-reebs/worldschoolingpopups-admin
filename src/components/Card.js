import React from "react";
import "../index.css";
import { transformImages } from "./Cloudinary";

const Card = ({ images, title, country, dateStart, eventType }) => {
  let coverImage = [images[0]];
  let transformedImage = transformImages(coverImage);
  let newUrl = transformedImage.toURL();
  let startDate = new Date(dateStart);
  let formattedDate = startDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="border-none rounded-md lg:max-h-72">
      <img
        src={newUrl}
        className="block rounded-md aspect-4/3 mb-3 lg:max-h-auto"
        alt="eventimage"
      />
      <h4 className="text-lg">{title}</h4>
      <div className="flex justify-between">
        <h5 className="text-sm italic">{country}</h5>
        {eventType ? (
          <h5 className="text-sm italic">{dateStart ? formattedDate : null}</h5>
        ) : (
          <h5 className="text-sm italic">Open/continuous dates</h5>
        )}
      </div>
    </div>
  );
};

export default Card;
