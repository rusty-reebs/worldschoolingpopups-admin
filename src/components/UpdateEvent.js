// UpdateEvent.js
// populates form with database object

//TODO format dateStart and dateEnd to render correctly

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Routes";
import { myApi } from "../App";
import Nav from "./Nav";
import Input, {
  CountryInput,
  SessionSelect,
  TextAreaInput,
  AccomInput,
} from "./Input";
import Button from "./Button";
import "../index.css";
import { FaCheckCircle } from "react-icons/fa";

const UpdateEvent = (props) => {
  const location = useLocation();

  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newEventName, setNewEventName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [eventType, setEventType] = useState("Fixed Session");
  const [isDisabled, setIsDisabled] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [accomIncluded, setAccomIncluded] = useState(true);
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactWebsite, setContactWebsite] = useState("");
  const [contactFbPage, setContactFbPage] = useState("");
  const [errorsArray, setErrorsArray] = useState("");
  const [success, setSuccess] = useState(false);
  const user = useContext(AuthContext);

  // needs to fetch the data, set state, and populate form
  let params = useParams();
  let eventId = params.eventId.toString();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    // set state with existing data
    const { eventData } = location.state;
    console.log(eventData);
    setNewEventName(eventData.name);
    setCountry(eventData.location.country);
    setCity(eventData.location.city);
    setLat(eventData.location.lat);
    setLon(eventData.location.lon);
    setEventType(eventData.date.eventType);
    setDateStart(eventData.date.start);
    setDateEnd(eventData.date.end);
    setAccomIncluded(eventData.accomIncluded);
    setAgeMin(eventData.age.min);
    setAgeMax(eventData.age.max);
    setDescription(eventData.description);
    setContactName(eventData.contact.name);
    setContactEmail(eventData.contact.email);
    setContactFbPage(eventData.contact.fbPage);
    setContactWebsite(eventData.contact.website);

    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    setErrorsArray("");
    e.preventDefault();
    try {
      let res = await fetch(myApi + "/events/" + eventId + "/update", {
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
          description: description,
          contactName: contactName,
          contactEmail: contactEmail,
          contactFbPage: contactFbPage,
          contactWebsite: contactWebsite,
          //   images: images,
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
        setTimeout(() => {
          return navigate("/events");
        }, 1000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-yellow min-h-screen w-full">
      <Nav />
      {isLoading ? (
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
      ) : (
        <>
          <div className="mx-3">
            <h3 className="text-base text-center mb-4 lg:text-2xl">
              Update Event
            </h3>
            <div className="lg:w-1/3 lg:mx-auto">
              <p className="text-xs italic font-light text-red mb-2">
                * required
              </p>
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
                <SessionSelect
                  name="eventType"
                  placeholder=""
                  label="Event Type"
                  values={[
                    ["Fixed Session", "Fixed Session"],
                    ["Open-ended / Continuous", "Open-ended / Continuous"],
                    ["Full School Year", "Full School Year"],
                  ]}
                  selectedValue={"Fixed Session"}
                  required="true"
                  value={eventType}
                  callback={(value) => setEventType(value)}
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
                {/* <div className="flex justify-center mb-2">
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
            </div> */}
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
            <div className="h-16"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateEvent;
