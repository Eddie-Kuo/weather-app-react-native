import axios from 'axios';

// api endpoints
const forecastEndpoint = (params) => `
http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no
`;
const locationsEndpoint = (params) => `
http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${params.cityName}
`;

// functions to make our api calls
export const fetchWeatherForecast = async (params) => {
  const endpoint = forecastEndpoint(params);

  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error fetching weather forecast', error);
  }
};

export const fetchLocations = async (params) => {
  const endpoint = locationsEndpoint(params);

  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error fetching locations', error);
  }
};
