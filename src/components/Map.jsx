import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../assets/leaflet.css";
import L from "leaflet";

export default function Map({ aided, reqAid }) {
  // const { BaseLayer } = LayersControl;
  const mapConfig = { center: [36.65, 36.3], zoom: 9, scrollWheelZoom: true, style: { height: "500px" } };
  const reqIcon = L.icon({
    iconUrl: "/assets/icons/reqAid.svg",
    iconSize: [40, 40],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });
  const aidedIcon = L.icon({
    iconUrl: "/assets/icons/aided.png",
    iconSize: [33, 30],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  return (
    <div className="flex flex-col gap-1 w-screen items-center">
      <div className="leaflet-container h-[500px] w-[900px]">
        <MapContainer {...mapConfig}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {aided.length > 0
            ? aided.map((entry) => (
                <Marker position={entry[0]} icon={aidedIcon}>
                  <Popup>{entry[1]}</Popup>
                </Marker>
              ))
            : null}
          {reqAid.length > 0
            ? reqAid.map((entry) => (
                <Marker position={entry[0]} icon={reqIcon}>
                  <Popup>{entry[1]}</Popup>
                </Marker>
              ))
            : null}
        </MapContainer>
      </div>
    </div>
  );
}
