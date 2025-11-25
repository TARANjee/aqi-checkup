import { fetchAqiData } from "../services/aqiService.js";

export const getAqiByCity = async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const result = await fetchAqiData(city);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AQI data" });
  }
};
