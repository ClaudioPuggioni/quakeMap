import { useMemo } from "react";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

export function Language({ position, zoom }) {
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      //   <MapContainer
      //     style={{ height: 80, width: 80 }}
      //     center={parentMap.getCenter()}
      //     zoom={mapZoom}
      //     dragging={false}
      //     doubleClickZoom={false}
      //     scrollWheelZoom={false}
      //     attributionControl={false}
      //     zoomControl={false}
      //   >
      //     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      //     <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      //   </MapContainer>
      <div className="flex h-[40px] w-[80px] justify-between">
        <img className="cursor-pointer" src="/assets/icons/turkey.png" alt="Turkey Flag" />
        <img className="cursor-pointer" src="/assets/icons/united-kingdom.png" alt="United Kingdom Flag" />
      </div>
    ),
    []
  );

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}
