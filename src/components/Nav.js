import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Routes";
import "../index.css";

const logo = require("../globe-favicon.svg");

const Nav = (props) => {
  const user = useContext(AuthContext);

  useEffect(() => {
    document.getElementById("hamburger").onclick = function toggleMenu() {
      const navToggle = document.getElementsByClassName("toggle");
      for (let i = 0; i < navToggle.length; i++) {
        navToggle.item(i).classList.toggle("hidden");
      }
    };
  });
  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between mb-5 p-5 lg:w-full lg:px-9 lg:mb-9 bg-darkblue">
        <h1 className="text-white text-lg lg:text-2xl">
          <a href="/events">
            <img
              src={logo.default}
              style={{ display: "inline", height: 30 }}
              alt="logo"
            />
          </a>
          &nbsp;wspopups - ADMIN SITE
        </h1>
        <div className="flex lg:hidden text-white">
          <button id="hamburger">
            <p className="toggle block text-2xl">
              <i className="fas fa-bars"></i>
            </p>
            <p className="toggle hidden text-2xl">
              <i className="fas fa-window-close"></i>
            </p>
          </button>
        </div>
        <div className="toggle hidden lg:flex w-full lg:w-auto text-center text-bold mt-5 lg:mt-0 border-t-2 border-lightblue lg:border-none">
          {/* <Link
            to="/events"
            className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
          >
            🏠&nbsp;&nbsp;Home
          </Link> */}
          {/* <Link
            to="/about"
            className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
          >
            ℹ️&nbsp;&nbsp;About
          </Link> */}
          {/* <Link
            to="/events/map"
            className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
          >
            🗺&nbsp;&nbsp;Map
          </Link> */}
          {/* <Link
            // to="/events/search"
            to="#"
            className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
          >
            <p>🔎&nbsp;&nbsp;Search</p>
            <p className="text-xs">
              <i className="fas fa-star text-yellow"></i>&nbsp;Coming
              Soon!&nbsp;<i className="fas fa-star text-yellow"></i>
            </p>
          </Link> */}
          {/* {!user ? (
            <Link
              to="/newuser"
              className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
            >
              <p>List Your Event</p>
            </Link>
          ) : null} */}
          {/* {user ? (
            <Link
              // to="/events/user._id"
              to="#"
              className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
            >
              <p>Manage Your Events</p>
            </Link>
          ) : null} */}
          {user ? (
            <Link
              to="/events/create"
              className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
            >
              <p>Create New Event</p>
            </Link>
          ) : null}
          {/* {user ? (
            <Link
              to="/events/yourevents"
              className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
            >
              <p>Manage Events</p>
            </Link>
          ) : null} */}
          {/* {!user ? (
            <Link
              to="/register"
              className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
            >
              Register
            </Link>
          ) : null} */}
          {!user ? (
            <Link
              to="/login"
              className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
            >
              Log In
            </Link>
          ) : null}
          {user ? (
            <p className="block lg:inline-block text-lightblue px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg">
              <i className="fas fa-user-circle text-yellow"></i>
              &nbsp;{user.handle}
            </p>
          ) : null}
          {user ? (
            <Link
              to="/logout"
              className="block lg:inline-block text-lightblue hover:text-white px-3 py-3 border-b-2 border-lightblue lg:border-none lg:text-lg"
            >
              Log Out
            </Link>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
