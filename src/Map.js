import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  GeoJSON
} from "react-leaflet";
import ports from "./data/ports";
import * as ferryGeoJSON from "./data/ferryRoutes.json";
import ferryRoutes from "./data/ferryRoutes";
import { terminalIcon } from "./components/terminalIcon";
const formatPhoneNumber = (str) => {
  let cleaned = ("" + str).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
};
const daily = {
  color: "#00cc00",
  weight: 3,
  dashArray: "20,15",
  opacity: 0.5,
  lineJoin: "round"
};

const Map = (props) => {
  // console.log(ferryRoutes[0].features);
  const onEachFeature = (feature, layer) => {
    console.log("line clicked", feature);
    let routeName = feature.properties.Name;
    if (feature.properties && feature.properties.Name) {
      layer.bindPopup(routeName);
      // let popup = <Popup />;
      // layer.bindPopup(popup);
    }
  };
  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={8}
      center={[35.264277, -76.833359]}
    >
      {/* <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      /> */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      />

      {/* <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {ports.map((port) => (
        <Marker
          key={port.properties.title}
          icon={terminalIcon}
          position={[
            port.geometry.coordinates[1],
            port.geometry.coordinates[0]
          ]}
        >
          <Popup>
            <div>
              <h3>{port.properties.title}</h3>
              <p>{port.properties.address}</p>
              <p>{port.properties.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      {ferryGeoJSON && (
        <GeoJSON
          pathOptions={daily}
          attribution="NCDOT ferry daily routes"
          data={ferryGeoJSON}
          onEachFeature={onEachFeature}
        />
      )}
      {/* {ferryRoutes[0].features.map((route) => (
        <Polyline
          key={route.properties.OBJECTID}
          pathOptions={daily}
          positions={[route.geometry.coordinates]}
        />
      ))} */}
    </MapContainer>
  );
};

export default Map;
