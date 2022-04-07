import React from "react";
import Nav from "./Nav";
import "../index.css";

const NewUser = () => {
  return (
    <div className="bg-yellow h-screen w-full">
      <Nav />
      <div>
        <div className="text-center mt-10 lg:container lg:mx-auto lg:text-2xl">
          <p>
            Please{" "}
            <a
              href="/register"
              className="underline decoration-orange decoration-2"
            >
              register
            </a>{" "}
            or{" "}
            <a
              href="/login"
              className="underline decoration-orange decoration-2"
            >
              log in
            </a>{" "}
            to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
