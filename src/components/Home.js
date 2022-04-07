// import React, { useEffect, useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import "../output.css";
// import Nav from "./Nav";
// import Card from "./Card";
// import Button from "./Button";

// const Home = ({
//   eventData,
//   handleEventData,
//   isLoading,
//   setIsLoading,
//   user,
// }) => {
//   useEffect(() => {
//     try {
//       const loadEvents = async () => {
//         let data = await fetch("/events", {
//           "Access-Control-Allow-Origin": "*",
//           "Content-Type": "application/json",
//         });
//         console.log(data);
//         let refinedData = await data.json();
//         console.log(refinedData);
//         // let jsonData = await data.json();
//         // console.log(jsonData);
//         handleEventData(refinedData.events);
//         // setUser(refinedData.userDetails);
//         setIsLoading(false);
//       };
//       loadEvents();
//     } catch (error) {
//       if (error) {
//         console.log(error);
//       }
//     }
//   }, []);

//   return (
//     <div className="bg-yellow min-h-screen w-full">
//       <Nav user={user} />
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
//           <div className="lg:flex lg:flex-col lg:justify-center lg:mx-5">
//             <h3 className="text-center text-lg lg:text-2xl mb-4">
//               Events - All
//             </h3>
//             <Link
//               to="map"
//               className="fixed inset-x-0 bottom-8 text-center lg:text-lg"
//             >
//               <Button name="Map" mapIcon="true" />
//             </Link>
//             <div className="flex flex-col gap-y-10 lg:flex lg:flex-row lg:flex-wrap lg:gap-y-24 lg:gap-x-10 lg:justify-start lg:h-fit">
//               {eventData.map((event) => {
//                 return (
//                   <div key={event._id}>
//                     <Link to={`${event._id}`} key={event._id}>
//                       <Card
//                         key={event._id}
//                         images={event.images}
//                         title={event.name}
//                         country={event.location.country}
//                         eventType={event.date.eventType}
//                         dateStart={event.date.start}
//                       />
//                     </Link>
//                     <Outlet />
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="h-20 md:h-40"></div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;
