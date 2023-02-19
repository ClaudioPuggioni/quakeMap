import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Map from "./Map";
import { io } from "socket.io-client";
// const socket = io.connect("http://127.0.0.1:1111")
const socket = io.connect("https://quakebot.onrender.com/:10000");

export default function App() {
  useEffect(() => {
    // socket.emit("meow");
    socket.on("addPin", (location) => {
      console.log("Location", location);
    });
    // eslint-disable-next-line
  }, [socket]);

  return (
    <div className="">
      <Map />
    </div>
  );
}
