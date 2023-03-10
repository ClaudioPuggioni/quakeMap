import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../assets/leaflet.css";
import L from "leaflet";
import { useMediaQuery } from "react-responsive";

export default function Map({ aided, reqAid }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

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

  useEffect(() => {
    console.log("isDesktopOrLaptop:", isDesktopOrLaptop);
    console.log("isBigScreen:", isBigScreen);
    console.log("isTabletOrMobile:", isTabletOrMobile);
    console.log("isPortrait:", isPortrait);
    console.log("isRetina:", isRetina);
  }, []);

  return (
    <div className="flex flex-col gap-1 w-screen items-center">
      <div className={`leaflet-container h-[100vh] w-[100%]`}>
        <MapContainer {...mapConfig}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {aided.length > 0
            ? aided.map((entry, idx) => (
                <Marker position={entry[0]} icon={aidedIcon} key={`aided${idx}`}>
                  <Popup>
                    {entry[1]}
                    <br /> <br />
                    {`ID: ${entry[2]}`}
                  </Popup>
                </Marker>
              ))
            : null}
          {reqAid.length > 0
            ? reqAid.map((entry, idx) => (
                <Marker position={entry[0]} icon={reqIcon} key={`reqAid${idx}`}>
                  <Popup>
                    {entry[1]}
                    <br /> <br />
                    {`ID: ${entry[2]}`}
                  </Popup>
                </Marker>
              ))
            : null}
        </MapContainer>
      </div>
    </div>
  );
}
