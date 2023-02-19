import React, { useEffect, useState } from "react";
import Map from "./Map";
import { io } from "socket.io-client";
// const socket = io.connect("http://127.0.0.1:1111")
const socket = io.connect("https://quakebot.onrender.com/");

export default function App() {
  const [aided, setAided] = useState([]);
  const [reqAid, setReqAid] = useState([]);

  useEffect(() => {
    // socket.emit("meow");
    socket.on("addPin", (location) => {
      console.log("Location", location);
      setAided([...aided, [[location.longitude, location.latitude], "message"]]);
    });
    // eslint-disable-next-line
  }, [socket]);

  return (
    <div className="">
      <Map aided={aided} reqAid={reqAid} />
    </div>
  );
}
