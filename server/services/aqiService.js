import fetch from "node-fetch";
import { cache, CACHE_TTL, enforceCacheRules } from "../utils/cache.js";

export const fetchAqiData = async (city) => {
  const now = Date.now();

  // 1. CHECK CACHE
  if (cache.has(city)) {
    const cached = cache.get(city);
    const isExpired = now - cached.timestamp > CACHE_TTL;

    if (!isExpired) {
      return {
        source: "cache",
        ...cached.data,
      };
    }
    cache.delete(city);
  }

  // 2. FETCH FROM API
  const apiUrl = `https://api.waqi.info/feed/${city}/?token=${process.env.TOKEN}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.status !== "ok") {
    return data; // contains error
  }

  // 3. SAVE IN CACHE
  cache.set(city, {
    timestamp: now,
    data,
  });

  enforceCacheRules();

  return {
    source: "live",
    ...data,
  };
};
