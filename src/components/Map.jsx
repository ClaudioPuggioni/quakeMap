import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../assets/leaflet.css";
import L from "leaflet";
import { useMediaQuery } from "react-responsive";
import { Language } from "./Language";

const amntTable = {
  en: { 1: "Less than 100", 2: "From 100 to 1'000", 3: "From 1'000 to 10'000", 4: "From 10'000 to 100'000", 5: "More than 100'000" },
  tr: { 1: "100'den az", 2: "100'den 1'000'e", 3: "1'000'den 10'000'e", 4: "10'000'den 100'000'e", 5: "100'000'den fazla" },
};

export default function Map({ aided, reqAid, language, handleSelect }) {
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  // const { BaseLayer } = LayersControl;
  const mapConfig = { center: [36.65, 36.3], zoom: 9, scrollWheelZoom: true, style: { height: isTabletOrMobile ? "100vh" : "500px" } };
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

  // [0] [Number(latitude), Number(longitude)],
  // [1] aidAmount,
  // [2] aidType,
  // [3] identifier,

  return (
    <div className="flex flex-col gap-1 w-screen items-center">
      <div className={`leaflet-container ${isTabletOrMobile ? "h-[100vh] w-[100%]" : "h-[500px] w-[900px]"}`}>
        <MapContainer {...mapConfig}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {aided.length > 0
            ? aided.map((entry, idx) => (
                <Marker position={entry[0]} icon={aidedIcon} key={`aided${idx}`}>
                  <Popup>
                    {`\n${language === "tr" ? "Tamamlanan İstek" : language === "en" ? "Completed Request" : "ERROR"}: ${
                      amntTable[language][entry[1]]
                    } ${entry[2]} ${language === "tr" ? "TEDARİK EDİLEN" : language === "en" ? "PROVIDED" : "ERROR"}.`}
                    <br /> <br />
                    {`ID: ${entry[3]}`}
                  </Popup>
                </Marker>
              ))
            : null}
          {reqAid.length > 0
            ? reqAid.map((entry, idx) => (
                <Marker position={entry[0]} icon={reqIcon} key={`reqAid${idx}`}>
                  <Popup>
                    {`\n${language === "tr" ? "Tamamlanan İstek" : language === "en" ? "Completed Request" : "ERROR"}: ${
                      amntTable[language][entry[1]]
                    } ${entry[2]} ${language === "tr" ? "TEDARİK EDİLEN" : language === "en" ? "PROVIDED" : "ERROR"}.`}
                    <br /> <br />
                    {`ID: ${entry[3]}`}
                  </Popup>
                </Marker>
              ))
            : null}
          <Language position="topright" language={language} handleSelect={handleSelect} />
        </MapContainer>
      </div>
    </div>
  );
}
