import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../index.css";
import { Cloudinary } from "@cloudinary/url-gen";
import { crop } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dnwnw3z4z",
  },
});

const CarouselComp = ({ images }) => {
  let processedImages = images.map((image) => {
    return cld
      .image(image.cloudinary_id)
      .resize(crop().gravity(focusOn("custom")));
  });
  return (
    <Carousel showThumbs={false}>
      {processedImages.map((image, index) => {
        // const { url } = image;
        let newUrl = image.toURL();
        return (
          <div key={index}>
            <img src={newUrl} alt={"eventimage" + index} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselComp;
