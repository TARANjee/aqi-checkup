🌫️ AQI Proxy Service with Caching

A microservice that fetches Air Quality Index (AQI) data from the World Air Quality Index (WAQI) API and exposes it via a simplified API endpoint.
To ensure fast repeated responses, the service implements an in-memory caching layer with cache expiry, cleanup, and max-entry handling.

📌 Overview

This service acts as a proxy layer between your frontend and the WAQI API.
It provides:

A clean API endpoint to fetch AQI data using:

/aqi?city=<cityname>


A caching system that avoids calling the vendor API for repeated queries

Automatic cache expiry and cleanup

Improved performance and lower latency

Modular file and folder structure

🎯 Key Features
🔹 1. Vendor API Proxy

The service fetches AQI data from the WAQI API and returns it to your application.

🔹 2. Intelligent Caching

To reduce vendor API calls and speed up responses:

Cache Hit → Returns instantly

Cache Miss → Fetches from vendor then stores in cache

TTL-based Expiry → Old data removed automatically

Max Cache Size → Prevents uncontrolled memory growth

🔹 3. Configurable

Values like TTL, maximum cache entries, port, and API key are fully configurable using .env.

📁 Folder Structure
aqi-proxy-service/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── services/
│   │   ├── cacheService.js
│   │   └── aqiService.js
│   ├── controllers/
│   │   └── aqiController.js
│   └── routes/
│       └── aqiRoutes.js
├── .env
├── package.json
├── README.md

🧠 System Architecture Diagram
flowchart TD
    Client -->|GET /aqi?city=delhi| API[Express API Layer]

    API --> CacheService{Check Cache}
    CacheService -->|Hit| Cached[Return Cached Response]

    CacheService -->|Miss| AQIService[Fetch From WAQI API]
    AQIService --> Vendor[(WAQI API Server)]

    Vendor --> AQIService
    AQIService --> CacheService
    CacheService --> Fresh[Return Fresh Response]

    Cached --> Client
    Fresh --> Client

🔄 AQI Request Flow
sequenceDiagram
    participant User
    participant API
    participant Cache
    participant Vendor

    User->>API: Request /aqi?city=delhi
    API->>Cache: Check if city exists
    Cache-->>API: Cache Hit? or Cache Miss?

    alt Cache Hit
        API-->>User: Return cached AQI instantly
    else Cache Miss
        API->>Vendor: Fetch AQI from WAQI API
        Vendor-->>API: Return data
        API->>Cache: Store in cache
        API-->>User: Return fresh AQI
    end

🗃️ Cache Behavior Diagram
flowchart TD
    A[Request AQI Data] --> B[Generate Cache Key]
    B --> C{Exists in Cache?}
    C -->|Yes| D{Expired?}
    D -->|No| E[Return Cached Data]
    D -->|Yes| F[Fetch Fresh AQI]
    C -->|No| F[Fetch Fresh AQI]
    F --> G[Store in Cache]
    G --> H[Return Fresh Data]

⚙️ Configuration (Environment Variables)

Create a .env file with:

PORT=5000
TOKEN=YOUR_WAQI_API_KEY
CACHE_TTL=300000           # Cache expiry duration (in ms)
CACHE_MAX_ENTRIES=50       # Max allowed cached entries

🚀 How to Run
1️⃣ Install dependencies
npm install

2️⃣ Start the service
npm start

3️⃣ Call the API

Example:

http://localhost:5000/aqi?city=delhi

📦 What This Service Solves
✔ Faster Responses

Repeated AQI queries return instantly thanks to caching.

✔ Vendor Rate Limit Protection

Reduces unnecessary external API calls.

✔ Clean Abstraction

Frontend interacts with only one stable API endpoint.

✔ Extensible

You can add Redis caching, rate limiting, logging, or multi-city support later.

📄 Summary

This project provides a lightweight, efficient, and scalable AQI Proxy Service with:

Clean architecture

Smart cache layer

Minimal configuration

Easy-to-understand flow diagrams

Modular folder structure
