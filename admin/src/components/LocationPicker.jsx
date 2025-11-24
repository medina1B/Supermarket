// src/components/LocationPicker.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ form, setForm }) => {
  const [position, setPosition] = useState([9.0356, 38.7641]); // default coords

  const MapClick = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setForm({ ...form, latitude: e.latlng.lat, longitude: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClick />
      <Marker position={position} />
    </MapContainer>
  );
};

export default LocationPicker;
