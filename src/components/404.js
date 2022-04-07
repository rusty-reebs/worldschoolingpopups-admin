import React from "react";
import Nav from "./Nav";
import "../index.css";

const NotFound = () => {
  return (
    <div className="bg-yellow h-screen w-full">
      <Nav />
      <div>
        <h3 className="text-lg text-center mb-6 lg:mb-12 lg:text-2xl">
          404 - Page Not Found
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
