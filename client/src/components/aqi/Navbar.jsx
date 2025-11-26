import {
  Box,
  Flex,
  Text,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";

import { CiSearch } from "react-icons/ci";
import { useState } from "react";

export default function Navbar({ onCitySelect }) {
  const [city, setCity] = useState("");

  const onSearchCity = async () => {
    if (!city.trim()) return;

    try {
      const res = await fetch(`/api/aqi?city=${city}`);
      const {data} = await res.json();

      onCitySelect({
        city,
        aqi: data.aqi,
        pm10: data?.iaqi?.pm10?.v,
        pm25: data?.iaqi?.pm25?.v,
        weather: data.weather,
      });

      setCity(""); // clear search box
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <Box>
      <Flex
        bg={"gray.100"}
        color={"gray.800"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
        justify={"space-between"}
      >
        {/* Logo */}
        <Text
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          <Text as="span" color="red.500">A</Text>
          <Text as="span" color="green.500" ml={1}>Q</Text>
          <Text as="span" color="blue.500" ml={1}>I</Text>
        </Text>

        {/* Search Input with clickable icon */}
        <Flex maxW="300px" w="100%" align="center">
          <Input
            placeholder="Search Location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearchCity()}
          />
          <CiSearch
            size={24}
            style={{ cursor: "pointer", marginLeft: "8px" }}
            onClick={onSearchCity}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
