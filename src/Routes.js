import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import App from "./App";
import Detail from "./components/Detail";
import EventsMap from "./components/EventsMap";
import CreateEvent from "./components/CreateEvent";
// import YourEvents from "./components/YourEvents";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Logout from "./components/Logout";
import NewUser from "./components/NewUser";
import NotFound from "./components/404";

const AuthContext = React.createContext(null);
const RouteSwitch = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Navigate to="events" />} />
          <Route
            path="events"
            element={<App user={user} setUser={setUser} />}
          />
          <Route path="events/:eventId" element={<Detail />} />
          <Route path="events/map" element={<EventsMap />} />
          <Route path="events/create" element={<CreateEvent />} />
          {/* <Route path="events/yourevents" element={<YourEvents />} /> */}
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout setUser={setUser} />} />
          <Route path="newuser" element={<NewUser />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/events/*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default RouteSwitch;
export { AuthContext };
