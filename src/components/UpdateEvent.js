// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Nav from "./Nav";
// import Input from "./Input";
// import { CountryInput } from "./Input";

// const UpdateEvent = (props) => {
//   // needs to fetch the data, set state, and populate form
//   let params = useParams();
//   let eventId = params.eventId.toString();
//   // if params.eventId not true then use url string

//   useEffect(() => {
//     try {
//       const loadEvent = async () => {
//         let data = await fetch(
//           "https://fierce-reef-16155.herokuapp.com/events/" + eventId,
//           {
//             method: "GET",
//             // mode: "cors",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         let refinedData = await data.json();
//         // console.log(refinedData);
//         setEventData(refinedData);
//         setIsLoading(false);
//       };

//       loadEvent();
//     } catch (error) {
//       if (error) {
//         console.log(error);
//       }
//     }
//   }, []);

//   return (
//     <div className="bg-yellow h-full">
//       <Nav />
//       <div className="mx-3">
//         <h3 className="text-base text-center mb-4 lg:text-2xl">
//           Create New Event
//         </h3>
//         <div className="lg:w-1/3 lg:mx-auto">
//           <p className="text-xs italic font-light text-red mb-2">* required</p>
//           <form onSubmit={handleSubmit}>
//             <Input
//               name="eventName"
//               placeholder=""
//               label="Event Name"
//               type="text"
//               required="true"
//               value={newEventName}
//               onChange={(e) => setNewEventName(e.target.value)}
//             />
//             <CountryInput
//               name="country"
//               label="Country"
//               required="true"
//               value={country}
//               onChange={(value) => setCountry(value)}
//             />
//             <Input
//               name="city"
//               placeholder=""
//               label="City"
//               type="text"
//               required="true"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />
//             <div className="flex gap-x-2">
//               <Input
//                 name="lat"
//                 placeholder="eg. 50.112"
//                 label="Latitude"
//                 type="number"
//                 required="true"
//                 value={lat}
//                 onChange={(e) => setLat(e.target.value)}
//               />
//               <Input
//                 name="lon"
//                 placeholder="eg. -118.203"
//                 label="Longitude"
//                 type="number"
//                 required="true"
//                 value={lon}
//                 onChange={(e) => setLon(e.target.value)}
//               />
//             </div>
//             <SelectInput
//               name="eventtype"
//               placeholder=""
//               label="Event Type"
//               firstOption={"Fixed Date"}
//               secondOption={"Open-Ended / Multi-Session"}
//               required="true"
//               value={eventType}
//               onChange={handleChange}
//             />
//             <Input
//               name="dateStart"
//               placeholder=""
//               label="Start Date"
//               type="date"
//               isDisabled={isDisabled}
//               value={dateStart}
//               onChange={(e) => setDateStart(e.target.value)}
//             />
//             <Input
//               name="dateEnd"
//               placeholder=""
//               label="End Date"
//               type="date"
//               isDisabled={isDisabled}
//               value={dateEnd}
//               onChange={(e) => setDateEnd(e.target.value)}
//             />
//             <SelectInput
//               name="accomIncluded"
//               placeholder=""
//               label="Accommodation Included"
//               firstOption={"Yes"}
//               secondOption={"No"}
//               required="true"
//               value={accomIncluded}
//               onChange={(e) => setAccomIncluded(e.target.value)}
//             />
//             <div className="flex gap-x-2">
//               <Input
//                 name="ageMin"
//                 placeholder=""
//                 label="Minimum Age"
//                 type="number"
//                 value={ageMin}
//                 onChange={(e) => setAgeMin(e.target.value)}
//               />
//               <Input
//                 name="ageMax"
//                 placeholder=""
//                 label="Maximum Age"
//                 type="number"
//                 value={ageMax}
//                 onChange={(e) => setAgeMax(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-x-2">
//               <Input
//                 name="tempHigh"
//                 placeholder=""
//                 label="Average High&nbsp;&#176;C"
//                 type="number"
//                 value={tempHigh}
//                 onChange={(e) => setTempHigh(e.target.value)}
//               />
//               <Input
//                 name="tempLow"
//                 placeholder=""
//                 label="Average Low&nbsp;&#176;C"
//                 type="number"
//                 value={tempLow}
//                 onChange={(e) => setTempLow(e.target.value)}
//               />
//             </div>
//             <TextAreaInput
//               name="description"
//               placeholder=""
//               label="Event Description"
//               required="true"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />

//             {/* excursions */}

//             <Input
//               name="contactName"
//               placeholder=""
//               label="Contact Name"
//               type="text"
//               required="true"
//               value={contactName}
//               onChange={(e) => setContactName(e.target.value)}
//             />
//             <Input
//               name="contactEmail"
//               placeholder=""
//               label="Contact Email"
//               type="email"
//               value={contactEmail}
//               onChange={(e) => setContactEmail(e.target.value)}
//             />
//             <Input
//               name="contactFbPage"
//               placeholder="www.facebook.com/myevent"
//               label="Facebook Page"
//               type="text"
//               value={contactFbPage}
//               onChange={(e) => setContactFbPage(e.target.value)}
//             />
//             <Input
//               name="contactWebsite"
//               placeholder="www.example.com"
//               label="Website"
//               type="text"
//               value={contactWebsite}
//               onChange={(e) => setContactWebsite(e.target.value)}
//             />
//             <div className="flex justify-center mb-2">
//               <div>
//                 <CloudinaryUploadWidget
//                   setCheckmark={setCheckmark}
//                   checkmark={checkmark}
//                   images={images}
//                   setImages={setImages}
//                 />
//               </div>
//               <div>
//                 <p className="text-xs font-light ml-2">Maximum 3, 1MB each.</p>
//                 <p className="text-xs font-light ml-2">
//                   First image will be cover image.
//                 </p>
//                 <div className="flex justify-center">
//                   {checkmark
//                     ? checkmark.map((check, index) => {
//                         return (
//                           <p key={index} className="text-center">
//                             <FaCheckCircle className="text-green" />
//                           </p>
//                         );
//                       })
//                     : null}
//                 </div>
//               </div>
//             </div>
//             {errorsArray
//               ? errorsArray.map((error, index) => {
//                   return (
//                     <p key={index} className="text-sm text-red font-bold">
//                       {error.msg}
//                     </p>
//                   );
//                 })
//               : null}
//             <div className="flex justify-center mt-5">
//               <Button name="Submit"></Button>
//             </div>
//             {success ? (
//               <p className="text-center">
//                 <FaCheckCircle
//                   className="inline text-green"
//                   style={{ verticalAlign: "middle" }}
//                 />
//                 &nbsp;Success!
//               </p>
//             ) : null}
//           </form>
//         </div>
//       </div>
//       <div className="h-16"></div>
//     </div>
//   );
// };

// export default UpdateEvent;
