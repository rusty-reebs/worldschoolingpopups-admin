//! Open/continuous = The Hive, open all the time. Commit for any period of time.
//! Fixed sessions = You need to work around their dates. Don't make the dates required for input.
//! Full school year
//! Remove entire Other information section

import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../Routes";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { myApi } from "../App";
import Nav from "./Nav";
import Input, {
  AccomInput,
  SessionInput,
  CountryInput,
  TextAreaInput,
} from "./Input";
import Button from "./Button";
import { CloudinaryUploadWidget } from "./Cloudinary";
import "../index.css";

const CreateEvent = (props) => {
  const [newEventName, setNewEventName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [eventType, setEventType] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [accomIncluded, setAccomIncluded] = useState(true);
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [tempHigh, setTempHigh] = useState("");
  const [tempLow, setTempLow] = useState("");
  const [description, setDescription] = useState("");
  // const [excursion, setExcursion] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactWebsite, setContactWebsite] = useState("");
  const [contactFbPage, setContactFbPage] = useState("");
  const [errorsArray, setErrorsArray] = useState("");
  const [images, setImages] = useState([]);
  const [checkmark, setCheckmark] = useState([]);
  const [success, setSuccess] = useState(false);
  const user = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  const handleChange = (e) => {
    setEventType(e.target.value);
    setIsDisabled(!isDisabled);
  };

  const handleSubmit = async (e) => {
    setErrorsArray("");
    e.preventDefault();
    try {
      let res = await fetch(myApi + "/events", {
        // let res = await fetch("https://fierce-reef-16155.herokuapp.com/events", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: user.id,
          eventName: newEventName,
          country: country,
          city: city,
          lat: lat,
          lon: lon,
          eventType: eventType,
          dateStart: dateStart,
          dateEnd: dateEnd,
          accomIncluded: accomIncluded,
          ageMin: ageMin,
          ageMax: ageMax,
          // tempHigh: tempHigh,
          // tempLow: tempLow,
          description: description,
          contactName: contactName,
          contactEmail: contactEmail,
          contactFbPage: contactFbPage,
          contactWebsite: contactWebsite,
          images: images,
        }),
      });
      //! below error handler redirects to catch block and bypasses line 93 onwards
      // if (!res.ok) {
      //   const message = `An error has occurred: ${res.status} - ${res.statusText}`;
      //   throw new Error(message);
      // }

      let responseJson = await res.json();
      const result = {
        status: res.status + " " + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: responseJson,
      };
      console.log(result);
      if ("errors" in responseJson) {
        setErrorsArray(responseJson.errors);
      } else {
        setErrorsArray(false);
        setSuccess(true);
        let eventId = responseJson.newEvent._id.toString();
        setTimeout(() => {
          // return navigate("/events/" + eventId);
          return navigate("/events");
        }, 1000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-yellow h-full">
      <Nav />
      <div className="mx-3">
        <h3 className="text-base text-center mb-4 lg:text-2xl">
          Create New Event
        </h3>
        <div className="lg:w-1/3 lg:mx-auto">
          <p className="text-xs italic font-light text-red mb-2">* required</p>
          <form onSubmit={handleSubmit}>
            <Input
              name="eventName"
              placeholder=""
              label="Event Name"
              type="text"
              required="true"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
            />
            <CountryInput
              name="country"
              label="Country"
              required="true"
              value={country}
              onChange={(value) => setCountry(value)}
            />
            <Input
              name="city"
              placeholder=""
              label="City"
              type="text"
              required="true"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="flex gap-x-2">
              <Input
                name="lat"
                placeholder="eg. 50.112"
                label="Latitude"
                type="number"
                required="true"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
              <Input
                name="lon"
                placeholder="eg. -118.203"
                label="Longitude"
                type="number"
                required="true"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
              />
            </div>
            <SessionInput
              name="eventtype"
              placeholder=""
              label="Event Type"
              firstOption={"Fixed Session"}
              secondOption={"Open-ended / Continuous"}
              thirdOption={"Full School Year"}
              required="true"
              value={eventType}
              // onChange={handleChange}
              onChange={(e) => setEventType(e.target.value)}
            />
            <Input
              name="dateStart"
              placeholder=""
              label="Start Date"
              type="date"
              isDisabled={isDisabled}
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
            />
            <Input
              name="dateEnd"
              placeholder=""
              label="End Date"
              type="date"
              isDisabled={isDisabled}
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
            <AccomInput
              name="accomIncluded"
              placeholder=""
              label="Accommodation Included"
              firstOption={"Yes"}
              secondOption={"No"}
              required="true"
              value={accomIncluded}
              onChange={(e) => setAccomIncluded(e.target.value)}
            />
            <div className="flex gap-x-2">
              <Input
                name="ageMin"
                placeholder=""
                label="Minimum Age"
                type="number"
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
              />
              <Input
                name="ageMax"
                placeholder=""
                label="Maximum Age"
                type="number"
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
              />
            </div>
            {/* <div className="flex gap-x-2">
              <Input
                name="tempHigh"
                placeholder=""
                label="Average High&nbsp;&#176;C"
                type="number"
                value={tempHigh}
                onChange={(e) => setTempHigh(e.target.value)}
              />
              <Input
                name="tempLow"
                placeholder=""
                label="Average Low&nbsp;&#176;C"
                type="number"
                value={tempLow}
                onChange={(e) => setTempLow(e.target.value)}
              />
            </div> */}
            <TextAreaInput
              name="description"
              placeholder=""
              label="Event Description"
              required="true"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* excursions */}

            <Input
              name="contactName"
              placeholder=""
              label="Contact Name"
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            <Input
              name="contactEmail"
              placeholder=""
              label="Contact Email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <Input
              name="contactFbPage"
              placeholder="www.facebook.com/myevent"
              label="Facebook Page"
              type="text"
              value={contactFbPage}
              onChange={(e) => setContactFbPage(e.target.value)}
            />
            <Input
              name="contactWebsite"
              placeholder="www.example.com"
              label="Website"
              type="text"
              value={contactWebsite}
              onChange={(e) => setContactWebsite(e.target.value)}
            />
            <div className="flex justify-center mb-2">
              <div>
                <CloudinaryUploadWidget
                  setCheckmark={setCheckmark}
                  checkmark={checkmark}
                  images={images}
                  setImages={setImages}
                />
              </div>
              <div>
                <p className="text-xs font-light ml-2">Maximum 3, 1MB each.</p>
                <p className="text-xs font-light ml-2">
                  First image will be cover image.
                </p>
                <div className="flex justify-center">
                  {checkmark
                    ? checkmark.map((check, index) => {
                        return (
                          <p key={index} className="text-center">
                            <FaCheckCircle className="text-green" />
                          </p>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            {errorsArray
              ? errorsArray.map((error, index) => {
                  return (
                    <p key={index} className="text-sm text-red font-bold">
                      {error.msg}
                    </p>
                  );
                })
              : null}
            <div className="flex justify-center mt-5">
              <Button name="Submit"></Button>
            </div>
            {success ? (
              <p className="text-center">
                <FaCheckCircle
                  className="inline text-green"
                  style={{ verticalAlign: "middle" }}
                />
                &nbsp;Success!
              </p>
            ) : null}
          </form>
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
};

export default CreateEvent;
