import React, { useEffect, useState } from "react";
import Map from "./Map";
import { io } from "socket.io-client";
// const socket = io.connect("http://127.0.0.1:1111")
const socket = io.connect("https://quakebot.onrender.com/");

export default function App() {
  const [aided, setAided] = useState([[[36.65, 36.3], "Complete Request: Received NGO food payload"]]);
  const [reqAid, setReqAid] = useState([[[37, 36], "Pending Request: Need shelter and medical supplies for 3000 injured"]]);

  useEffect(() => {
    socket.on("addComplete", (location) => {
      console.log("Location (addComplete)", location);
      setAided([...aided, [[location.longitude, location.latitude], "message"]]);
    });
    socket.on("addRequest", (location) => {
      console.log("Location (addRequest)", location);
      setReqAid([...aided, [[location.longitude, location.latitude], "message"]]);
    });
    // eslint-disable-next-line
  }, [socket]);

  return (
    <div className="">
      <Map aided={aided} reqAid={reqAid} />
    </div>
  );
}
