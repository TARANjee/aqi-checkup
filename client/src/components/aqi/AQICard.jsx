import {
    Box,
    Flex,
    Text,
    Button,
    Badge,
    HStack,
    VStack,
} from "@chakra-ui/react";

import {
    getAQICardGradient,
    getAQIHealthText,
    getAQIBadgeColor,
} from "../../utils/aqiColors.js";

export default function AQICard({ location, aqi, pm10, pm25, weather }) {
    const gradient = getAQICardGradient(aqi);
    const healthText = getAQIHealthText(aqi);
    const badgeColor = getAQIBadgeColor(aqi);
    const pointerPos = Math.min(Math.max((aqi / 300) * 100, 0), 100);

    return (
        <Box
            maxW="1000px"
            mx="auto"
            mt={10}
            bg={"gray.800"}
            color="white"
            rounded="2xl"
            p={8}
            boxShadow="xl"
        >
            <Text fontSize="3xl" fontWeight="bold" mb={2}>
                Real-time Air Quality Index (AQI)
            </Text>

            <Text color="blue.300" fontSize="lg" mb={4} cursor="pointer">
                {location}
            </Text>

            {/* AQI CARD */}
            <Flex
                bgGradient={gradient}
                p={8}
                rounded="2xl"
                justify="space-between"
                align="center"
            >
                <Box width="100%">

                    <HStack justifyContent="space-between">
                        <VStack align="start">
                            <Text fontSize="md" fontWeight="medium">
                                Live AQI
                            </Text>
                            <Text fontSize="6xl" fontWeight="bold" color={badgeColor}>
                                {aqi}
                            </Text>
                        </VStack>

                        {/* Health Badge */}
                        <VStack align="center">
                            <Text color={'gray.200'} fontWeight={'medium'} fontSize={'sm'}>
                                Air Quality is
                            </Text>
                            <Badge
                                bg={badgeColor}
                                color="white"
                                fontSize="lg"
                                mt={2}
                                px={8}
                                py={4}
                                rounded="md"
                            >
                                {healthText}
                            </Badge>
                        </VStack>
                    </HStack>

                    {/* PM VALUES */}
                    <HStack justifyContent="space-between" mt={6}>
                        <HStack color={'gray.300'} fontSize={'md'}>
                            <Text>PM10:</Text>
                            <Text color="white">{pm10} µg/m³</Text>
                        </HStack>

                        <HStack color={'gray.300'} fontSize={'md'}>
                            <Text>PM2.5:</Text>
                            <Text color="white">{pm25} µg/m³</Text>
                        </HStack>
                    </HStack>
                </Box>

                
            </Flex>
            <Box mt={10}>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                    AQI Scale
                </Text>

                <Box>

                    {/* Color Segments */}
                    <Flex w="100%" h="14px" rounded="full" overflow="hidden">
                        <Box flex="1" bg="#3CB371" />      {/* Good */}
                        <Box flex="1" bg="#FFD700" />      {/* Moderate */}
                        <Box flex="1" bg="#FF8C00" />      {/* Poor */}
                        <Box flex="1" bg="#FF5A5A" />      {/* Unhealthy */}
                        <Box flex="1" bg="#BA55D3" />      {/* Severe */}
                        <Box flex="1" bg="#B22222" />      {/* Hazardous */}
                    </Flex>

                    {/* Labels */}
                    <Flex justify="space-between" mt={2} fontSize="sm" color="gray.300">
                        <Text>Good</Text>
                        <Text>Moderate</Text>
                        <Text>Poor</Text>
                        <Text>Unhealthy</Text>
                        <Text>Severe</Text>
                        <Text>Hazardous</Text>
                    </Flex>

                    {/* Numbers */}
                    <Flex justify="space-between" mt={1} fontSize="xs" color="gray.400">
                        <Text>0</Text>
                        <Text>50</Text>
                        <Text>100</Text>
                        <Text>150</Text>
                        <Text>200</Text>
                        <Text>300</Text>
                        <Text>301+</Text>
                    </Flex>

                    {/* AQI Pointer Indicator */}
                    <Box position="relative" width="100%" mt={4} h="20px">
                        <Box
                            position="absolute"
                            top="-81px"
                            left={`${pointerPos}%`}
                            transform="translateX(-50%)"
                            w="14px"
                            h="14px"
                            bg="white"
                            border="3px solid #ff467e"
                            rounded="full"
                            zIndex={10}
                        />
                    </Box>

                </Box>
            </Box>

        </Box>
    );
}
