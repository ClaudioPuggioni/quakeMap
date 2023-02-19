import React, { useEffect, useState } from "react";
import Map from "./Map";
import { io } from "socket.io-client";
// const socket = io.connect("http://127.0.0.1:1111")
const socket = io.connect("https://quakebot.onrender.com/");

export default function App() {
  const [aided, setAided] = useState([[[36.65, 36.3], "Complete Request: Received NGO food payload", "01424dfk"]]);
  const [reqAid, setReqAid] = useState([[[37, 36], "Pending Request: Need shelter and medical supplies for 3000 injured", "53u8y2o0"]]);

  useEffect(() => {
    socket.on("addComplete", ({ location, message, id }) => {
      console.log("Location (addComplete)", location);
      setAided([...aided, [[location.longitude, location.latitude], message, id]]);
    });
    socket.on("addRequest", ({ location, message }) => {
      console.log("Location (addRequest)", location);
      setReqAid([...aided, [[location.longitude, location.latitude], message, id]]);
    });
    socket.on("reqFilled", ({ location, message, id }) => {
      if (reqAid.some((request) => request[2] === id)) setAided(reqAid.filter((request) => request[2] !== id));
      setAided([...aided, [[location.longitude, location.latitude], message, id]]);
    });
    // eslint-disable-next-line
  }, [socket]);

  return (
    <div className="">
      <Map aided={aided} reqAid={reqAid} />
    </div>
  );
}
