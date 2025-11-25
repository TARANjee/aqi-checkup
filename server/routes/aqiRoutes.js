import express from "express";
import { getAqiByCity } from "../controller/aqiController.js";

const router = express.Router();

router.get("/aqi", getAqiByCity);

export default router;