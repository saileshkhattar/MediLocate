import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView({ pharmacies, userLocation }) {
  if (!userLocation?.lat || !userLocation?.lon) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lon]}
      zoom={13}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      {/* Base map layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User marker */}
      <Marker position={[userLocation.lat, userLocation.lon]}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Pharmacy markers */}
      {pharmacies.map((store, i) =>
        store.pharmacy?.latitude && store.pharmacy?.longitude ? (
          <Marker
            key={i}
            position={[store.pharmacy.latitude, store.pharmacy.longitude]}
          >
            <Popup>
              <strong>{store.pharmacy.pharmacyName}</strong>
              <br />
              {store.pharmacy.address}
              <br />
              {store.distance
                ? `${(store.distance / 1000).toFixed(1)} km`
                : "Distance N/A"}
            </Popup>
          </Marker>
        ) : null
      )}
    
    </MapContainer>
  );
}
