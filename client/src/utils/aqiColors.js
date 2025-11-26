// ------------ Gradient Background (Matches AQICN) ------------
export function getAQICardGradient(aqi) {
    if (aqi <= 50) return "linear(to-b, #50f38a, #1ebd60)";
    if (aqi <= 100) return "linear(to-b, #f7e76b, #e3c233)";
    if (aqi <= 150) return "linear(to-b, #ffb067, #df7e34)";
    if (aqi <= 200) return "linear(to-b, #ff6a8d, #c54278)";
    if (aqi <= 300) return "linear(to-b, #b064d7, #8740af)";
    return "linear(to-b, #a60000, #5a0000)";
}

// ------------ Health Text ------------
export function getAQIHealthText(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
}

// ------------ Badge Color ------------
export function getAQIBadgeColor(aqi) {
    if (aqi <= 50) return "green.500";
    if (aqi <= 100) return "yellow.500";
    if (aqi <= 150) return "orange.500";
    if (aqi <= 200) return "red.500";
    if (aqi <= 300) return "purple.500";
    return "maroon.800";
}
