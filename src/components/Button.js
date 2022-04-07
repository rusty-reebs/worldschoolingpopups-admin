import React from "react";
import { IconContext } from "react-icons";
import { FaMap } from "react-icons/fa";
import "../index.css";

const Button = ({ name, mapIcon }) => {
  return (
    <button className="bg-darkblue text-white py-1 px-3 border rounded-lg">
      {mapIcon ? (
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <FaMap className="inline-block" />
          &nbsp;&nbsp;
        </IconContext.Provider>
      ) : null}
      {name}
    </button>
  );
};

export default Button;
