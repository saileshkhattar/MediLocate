const axios = require("axios");

async function getDistance(from, to) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`;
    const res = await axios.get(url);

    if (res.data.routes && res.data.routes.length > 0) {
      return {
        distance: res.data.routes[0].distance / 1000, // in km
        duration: res.data.routes[0].duration / 60,   // in minutes
      };
    }

    return null;
  } catch (err) {
    console.error("OSRM error:", err);
    return null;
  }
}

module.exports = getDistance;