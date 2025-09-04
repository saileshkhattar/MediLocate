const axios = require("axios");

async function geocodeAddress(address) {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
    });

    if (res.data.length > 0) {
      return {
        lat: parseFloat(res.data[0].lat),
        lon: parseFloat(res.data[0].lon),
      };
    }

    return null;
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
}

module.exports = geocodeAddress;