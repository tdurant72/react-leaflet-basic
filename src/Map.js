import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = (props) => {
  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={7}
      center={[20.27, -157]}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      />
    </MapContainer>
  );
};

export default Map;
