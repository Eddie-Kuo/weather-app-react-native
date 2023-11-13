import axios from 'axios';

const forecastEndpoint = (params) => `
http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no
`;
const locationsEndpoint = (params) => `
http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${params.cityName}
`;
