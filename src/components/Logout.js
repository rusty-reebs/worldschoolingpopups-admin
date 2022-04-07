import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myApi } from "../App";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        let res = await fetch(
          "https://fierce-reef-16155.herokuapp.com/logout",
          {
            method: "GET",
            credentials: "include",
            headers: {
              // Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          const message = `An error has occurred: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        let responseJson = await res.json();
        console.log(responseJson);
        setUser(null);
        navigate("/login");
      } catch (err) {
        console.log(err.message);
      }
    };
    handleLogout();
  }, []);
  return (
    <div className="bg-yellow min-h-screen w-full">
      <div className="bg-yellow flex h-screen w-full align-middle">
        <div className="flex justify-center flex-col mx-auto">
          <div className="flex items-center justify-center space-x-2 animate-pulse">
            <div className="w-8 h-8 bg-orange rounded-full"></div>
            <div className="w-8 h-8 bg-orange rounded-full"></div>
            <div className="w-8 h-8 bg-orange rounded-full"></div>
          </div>
          <div className="text-center text-sm text-black mt-4">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
