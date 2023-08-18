import axios from "axios";
import { apiKey } from "../constants/apiInfo";

const apiBaseURL = `https://api.openweathermap.org/data/2.5`

const currentWeatherByCoordinatesEndpoint = (latitude, longitude) => `${apiBaseURL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
const forecastWeatherByCoordinatesEndpoint = (latitude, longitude) => `${apiBaseURL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch(error) {
        console.log("Error while fetching weather data: ", error);
        return {}
    }
}

export const fetchCurrentWeatherByCoordinates = (latitude, longitude) => {
    return apiCall(currentWeatherByCoordinatesEndpoint(latitude, longitude));
}

export const fetchWeatherForecastByCoordinates = (latitude, longitude) => {
    return apiCall(forecastWeatherByCoordinatesEndpoint(latitude, longitude));
}