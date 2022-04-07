// //! needs a create event button

// import React, { useEffect, useContext, useState } from "react";
// import { AuthContext } from "../Routes";
// import Nav from "./Nav";
// import Button from "./Button";
// import "../output.css";

// const YourEvents = () => {
//   const [yourEvents, setYourEvents] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   // search db for events by user
//   const user = useContext(AuthContext);

//   useEffect(() => {
//     try {
//       const loadYourEvents = async () => {
//         let data = await fetch(
//           "https://fierce-reef-16155.herokuapp.com/" + user.id,
//           {
//             method: "GET",
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         // console.log(data);
//         let refinedData = await data.json();
//         // console.log(refinedData);
//         setYourEvents(refinedData.events);
//         setIsLoading(false);
//       };
//       loadYourEvents();
//     } catch (error) {
//       if (error) {
//         console.log(error);
//       }
//     }
//   }, []);
//   return (
//     <div className="bg-yellow min-h-screen w-full">
//       <Nav />
//       {isLoading ? (
//         <div className="bg-yellow flex h-screen w-full align-middle">
//           <div className="flex justify-center flex-col mx-auto">
//             <div className="flex items-center justify-center space-x-2 animate-pulse">
//               <div className="w-8 h-8 bg-orange rounded-full"></div>
//               <div className="w-8 h-8 bg-orange rounded-full"></div>
//               <div className="w-8 h-8 bg-orange rounded-full"></div>
//             </div>
//             <div className="text-center text-sm text-black mt-4">
//               Loading...
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="flex flex-col mx-4 lg:flex lg:flex-col lg:justify-center lg:mx-10">
//             <h3 className="text-center text-lg lg:text-2xl mb-4">
//               Manage Your Events
//             </h3>
//           </div>
//           {yourEvents.map((event) => {
//             return (
//               <div key={event._id} className="flex flex-row">
//                 <img src={event.images[0].url} alt="eventimage" />
//                 <p>{event.name}</p>
//                 <Button name={"Edit"} />
//                 <Button name={"Delete"} />
//               </div>
//             );
//           })}
//           <div>
//             <Button name={"Create New Event"} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default YourEvents;
