import { useEffect, useState } from "react";

export default function useAQI() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Ask for user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        alert("Location access denied.");
        console.error(err);
        setLoading(false);
      }
    );
  };

  // 2. Reverse-geocode lat/lon → city
  const getCityFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data.address.city || data.address.town || data.address.village;
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      return "";
    }
  };

  // 3. Fetch AQI from your backend or WAQI
  const fetchAQI = async (cityName) => {
    try {
      const res = await fetch(`/api/aqi?city=${cityName}`);
      const {data} = await res.json();
      console.log("Fetched AQI Data:", data,cityName);
      setAqiData(data);
    } catch (err) {
      console.error("AQI Fetch Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // PROCESS FLOW
  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (coords) {
      (async () => {
        const detectedCity = await getCityFromCoords(coords.lat, coords.lon);
        setCity(detectedCity);
        fetchAQI(detectedCity);
      })();
    }
  }, [coords]);

  return { city, aqiData, loading };
}
