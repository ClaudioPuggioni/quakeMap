import React, { useEffect } from "react";
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../assets/leaflet.css";
// import { GoogleMutant, GoogleApiLoader } from "react-leaflet-googlemutant";
// import L from "leaflet";

export default function Map({ aided, reqAid }) {
  // const { BaseLayer } = LayersControl;
  const mapConfig = { center: [36.65, 36.3], zoom: 9, scrollWheelZoom: true, style: { height: "500px" } };

  useEffect(() => {
    // const map = L.map("map").setView([36.65, 36.3], 9);
    // // L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    // //   maxZoom: 19,
    // //   subdomains: ["mt0"],
    // // }).addTo(map);
    // L.gridLayer
    //   .googleMutant({
    //     type: "roadmap", // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    //   })
    //   .addTo(map);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col gap-1 w-screen items-center">
      {/* <div id="map" className="leaflet-container h-[500px] w-[900px]"> */}
      {/* <MapContainer {...mapConfig}> */}
      {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
      {/* <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        /> */}
      {/* <TileLayer subdomains={["mt0", "mt1", "mt2", "mt3"]} attribution="Google Maps" url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" /> */}
      {/* </MapContainer> */}
      {/* </div> */}
      <div className="leaflet-container h-[500px] w-[900px]">
        <MapContainer {...mapConfig}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {aided.length > 0
            ? aided.map((entry) => (
                <Marker position={entry[0]}>
                  <Popup>{entry[1]}</Popup>
                </Marker>
              ))
            : null}
          {reqAid.length > 0
            ? reqAid.map((entry) => (
                <Marker position={entry[0]}>
                  <Popup>{entry[1]}</Popup>
                </Marker>
              ))
            : null}
          {/* <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        /> */}
          {/* <TileLayer subdomains={["mt0", "mt1", "mt2", "mt3"]} attribution="Google Maps" url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" /> */}
        </MapContainer>
      </div>
    </div>
  );
}
