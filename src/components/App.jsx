import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Map from "./Map";

export default function App() {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <Map />
    </div>
  );
}
