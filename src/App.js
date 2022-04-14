import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./index.css";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Button from "./components/Button";

// const myApi = process.env.REACT_APP_DEV_API;
const myApi = process.env.REACT_APP_PROD_API;

const App = ({ user, setUser }) => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //! new basic App page

  useEffect(() => {
    try {
      const loadEvents = async () => {
        let data = await fetch(myApi + "/events", {
          method: "GET",
          credentials: "include",
          // withCredentials: true,
          // mode: "cors",
          headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        let refinedData = await data.json();
        console.log(refinedData);
        setEventData(refinedData.events);
        setUser(refinedData.userDetails);
        setIsLoading(false);
      };
      loadEvents();
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="bg-yellow min-h-screen w-full">
      <Nav />
      <div className="flex flex-col mx-4 lg:flex lg:flex-col lg:justify-center lg:mx-10">
        <h3 className="text-center text-lg lg:text-2xl mb-4">
          {user ? (
            <p>
              <Link
                to="/events/create"
                className="underline decoration-orange decoration-2"
              >
                Create a new event
              </Link>
              .
            </p>
          ) : (
            <p>
              <Link
                to="/login"
                className="underline decoration-orange decoration-2"
              >
                Log in
              </Link>
              .
            </p>
          )}
        </h3>
      </div>
    </div>
  );

  //!

  // useEffect(() => {
  //   try {
  //     const loadEvents = async () => {
  //       let data = await fetch(myApi + "/events", {
  //         method: "GET",
  //         credentials: "include",
  //         withCredentials: true,
  //         // mode: "cors",
  //         headers: {
  //           // "Access-Control-Allow-Origin": "*",
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       // let data = await fetch(
  //       //   "https://fierce-reef-16155.herokuapp.com/events",
  //       //   {
  //       //     method: "GET",
  //       //     credentials: "include",
  //       //     withCredentials: true,
  //       //     // mode: "cors",
  //       //     headers: {
  //       //       // "Access-Control-Allow-Origin": "*",
  //       //       "Content-Type": "application/json",
  //       //     },
  //       //   }
  //       // );
  //       // console.log(data);
  //       let refinedData = await data.json();
  //       console.log(refinedData);
  //       setEventData(refinedData.events);
  //       setUser(refinedData.userDetails);
  //       setIsLoading(false);
  //     };
  //     loadEvents();
  //   } catch (error) {
  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  // }, []);

  // return (
  //   <div className="bg-yellow min-h-screen w-full">
  //     <Nav />
  //     {isLoading ? (
  //       <div className="bg-yellow flex h-screen w-full align-middle">
  //         <div className="flex justify-center flex-col mx-auto">
  //           <div className="flex items-center justify-center space-x-2 animate-pulse">
  //             <div className="w-8 h-8 bg-orange rounded-full"></div>
  //             <div className="w-8 h-8 bg-orange rounded-full"></div>
  //             <div className="w-8 h-8 bg-orange rounded-full"></div>
  //           </div>
  //           <div className="text-center text-sm text-black mt-4">
  //             Loading...
  //           </div>
  //         </div>
  //       </div>
  //     ) : (
  //       <>
  //         <div className="flex flex-col mx-4 lg:flex lg:flex-col lg:justify-center lg:mx-10">
  //           <h3 className="text-center text-lg lg:text-2xl mb-4">
  //             Events - All
  //           </h3>
  //           <Link
  //             to="map"
  //             className="fixed inset-x-0 bottom-8 text-center lg:text-lg"
  //           >
  //             <Button name="Map" mapIcon="true" />
  //           </Link>
  //           <div className="grid grid-cols-1 gap-y-6 lg:grid lg:grid-cols-3 lg:auto-rows-max lg:gap-x-24 lg:gap-y-24 2xl:grid-cols-4">
  //             {eventData.map((event) => {
  //               return (
  //                 <div key={event._id}>
  //                   <Link to={`${event._id}`} key={event._id}>
  //                     <Card
  //                       key={event._id}
  //                       images={event.images}
  //                       title={event.name}
  //                       country={event.location.country}
  //                       eventType={event.date.eventType}
  //                       dateStart={event.date.start}
  //                     />
  //                   </Link>
  //                   <Outlet />
  //                 </div>
  //               );
  //             })}
  //           </div>
  //           <div className="h-24 lg:h-40"></div>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default App;
export { myApi };
