import React, { useState } from "react";
import Nav from "./Nav";
import Input from "./Input";
import Button from "./Button";
import { myApi } from "../App";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorsArray, setErrorsArray] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setErrorsArray("");
    e.preventDefault();
    try {
      let res = await fetch(myApi + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
      if (!res.ok) {
        const message = `An error has occurred: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
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
        setTimeout(() => {
          return navigate("/events");
        }, 1000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-yellow h-screen">
      <Nav />
      <div className="mx-3">
        <h3 className="text-base text-center mb-4 lg:text-2xl">
          Sign in to your account
        </h3>
        <div className="lg:w-1/3 lg:mx-auto">
          <p className="text-xs italic font-light text-red mb-2">* required</p>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder=""
              label="Email address"
              type="email"
              required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              placeholder=""
              label="Password"
              type="password"
              required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
