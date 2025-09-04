import React, { useEffect, useState } from "react";
import axios from "axios";
import MapView from "./MapView";

const PharmacyLocator = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // get user location
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });

    // fetch pharmacies with lat/lon from backend
    axios.get("http://localhost:5000/pharmacy/all").then((res) => {
      setPharmacies(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Nearby Pharmacies</h2>
      <MapView pharmacies={pharmacies} userLocation={userLocation} />
    </div>
  );
};

export default PharmacyLocator;