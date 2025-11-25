import express from "express";
import aqiRoutes from "./routes/aqiRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Routes
app.use("/api", aqiRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`AQI server running at http://localhost:${PORT}`);
});