import { geocodingApiKey } from "../constants/apiInfo";
import axios from "axios";

const apiBaseURL = "https://trueway-geocoding.p.rapidapi.com"

const forwardGeocodingEndpoint = `${apiBaseURL}/Geocode`;
const reverseGeocodingEndpoint = `${apiBaseURL}/reverse`;

const apiCall = async (endpoint, city) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: {
            address: city,
            language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': geocodingApiKey,
            'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        // console.log("Response Data: ", response.data.results[0]);
        return response.data.results[0];
    } catch (err) {
        console.log("Error while converting geocode to location: ", err);
    }
}

export const fetchGeocodesFromLocation = (cityName) => {
    return apiCall(forwardGeocodingEndpoint, cityName);
}