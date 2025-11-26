import { useState } from 'react';
import Navbar from '../components/aqi/Navbar.jsx';
import AQICard from '../components/aqi/AqiCard.jsx';
import useAQI from "../hooks/useAQI";
import { Box, Spinner, Text } from '@chakra-ui/react';

const HomePage = () => {

    // Default user location AQI from the hook
    const { city: defaultCity, aqiData, loading } = useAQI();

    // If user searches another city → override AQI card
    const [searchedData, setSearchedData] = useState(null);

    const finalCity = searchedData?.city || defaultCity;
    const finalData = searchedData || aqiData;

    if (loading && !searchedData)
        return (
            <Box textAlign="center" mt={20}>
                <Spinner size="xl" />
                <Text mt={4}>Fetching your location & air quality...</Text>
            </Box>
        );

    return (
        <div>
            <Navbar
                onCitySelect={(data) => {
                    setSearchedData(data);  // update card instantly
                }}
            />

            {finalData && (
                <AQICard
                    location={finalCity}
                    aqi={finalData?.aqi}
                    pm10={finalData?.pm10 || finalData?.iaqi?.pm10?.v}
                    pm25={finalData?.pm25 || finalData?.iaqi?.pm25?.v}
                    weather={finalData?.weather}
                />
            )}
        </div>
    );
};

export default HomePage;
