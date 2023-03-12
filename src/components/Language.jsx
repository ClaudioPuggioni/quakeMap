import { useMemo } from "react";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

export function Language({ position }) {
  const minimap = useMemo(
    () => (
      <div className="flex flex-col">
        <div className="text-[9px]">Sabitleme Dili / Pin Language:</div>
        <div className="flex px-[5px] h-[32px] w-[79px] justify-between gap-[5px]">
          <img className="cursor-pointer" src="/assets/icons/turkey.png" alt="Turkey Flag" />
          <img className="cursor-pointer" src="/assets/icons/united-kingdom.png" alt="United Kingdom Flag" />
        </div>
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
