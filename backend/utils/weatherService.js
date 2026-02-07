import axios from 'axios';

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0';

class WeatherService {
    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY;
    }

    /**
     * Geocode a location string to coordinates
     * Supports: city names, zip codes, coordinates
     */
    async geocodeLocation(location) {
        try {
            // Check if location is already coordinates (lat,lon format)
            const coordPattern = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/;
            if (coordPattern.test(location)) {
                const [lat, lon] = location.split(',').map(s => parseFloat(s.trim()));
                if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                    return { lat, lon, name: `${lat}, ${lon}`, country: '' };
                }
            }

            // Check if it's a US zip code
            const zipPattern = /^\d{5}$/;
            if (zipPattern.test(location)) {
                const response = await axios.get(`${GEO_BASE_URL}/zip`, {
                    params: {
                        zip: `${location},US`,
                        appid: this.apiKey
                    }
                });
                return {
                    lat: response.data.lat,
                    lon: response.data.lon,
                    name: response.data.name,
                    country: response.data.country
                };
            }

            // Otherwise, treat as city name
            console.log('🔑 Using API key for geocoding:', this.apiKey ? `${this.apiKey.substring(0, 8)}...` : 'UNDEFINED');
            const response = await axios.get(`${GEO_BASE_URL}/direct`, {
                params: {
                    q: location,
                    limit: 1,
                    appid: this.apiKey
                }
            });

            if (!response.data || response.data.length === 0) {
                throw new Error('Location not found. Please check the spelling or try a different format.');
            }

            const result = response.data[0];
            return {
                lat: result.lat,
                lon: result.lon,
                name: result.name,
                country: result.country,
                state: result.state
            };
        } catch (error) {
            if (error.response?.status === 404) {
                throw new Error('Location not found. Please verify the location and try again.');
            }
            throw new Error(error.message || 'Failed to geocode location');
        }
    }

    /**
     * Get current weather for coordinates
     */
    async getCurrentWeather(lat, lon) {
        try {
            const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
                params: {
                    lat,
                    lon,
                    appid: this.apiKey,
                    units: 'metric'
                }
            });

            return {
                temp: response.data.main.temp,
                feels_like: response.data.main.feels_like,
                temp_min: response.data.main.temp_min,
                temp_max: response.data.main.temp_max,
                pressure: response.data.main.pressure,
                humidity: response.data.main.humidity,
                weather: response.data.weather[0],
                wind: response.data.wind,
                clouds: response.data.clouds,
                visibility: response.data.visibility,
                dt: response.data.dt,
                timezone: response.data.timezone,
                name: response.data.name,
                country: response.data.sys.country
            };
        } catch (error) {
            throw new Error('Failed to fetch current weather data');
        }
    }

    /**
     * Get 5-day forecast for coordinates
     */
    async getFiveDayForecast(lat, lon) {
        try {
            const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
                params: {
                    lat,
                    lon,
                    appid: this.apiKey,
                    units: 'metric'
                }
            });

            // Group forecasts by day (API returns 3-hour intervals)
            const dailyForecasts = [];
            const processedDays = new Set();

            response.data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dateString = date.toISOString().split('T')[0];

                if (!processedDays.has(dateString) && dailyForecasts.length < 5) {
                    processedDays.add(dateString);
                    dailyForecasts.push({
                        date: dateString,
                        temp: item.main.temp,
                        temp_min: item.main.temp_min,
                        temp_max: item.main.temp_max,
                        humidity: item.main.humidity,
                        weather: item.weather[0],
                        wind: item.wind,
                        dt: item.dt
                    });
                }
            });

            return dailyForecasts;
        } catch (error) {
            throw new Error('Failed to fetch forecast data');
        }
    }

    /**
     * Get complete weather data for a location
     */
    async getWeatherByLocation(location) {
        const geoData = await this.geocodeLocation(location);
        const current = await this.getCurrentWeather(geoData.lat, geoData.lon);
        const forecast = await this.getFiveDayForecast(geoData.lat, geoData.lon);

        return {
            location: {
                name: geoData.name,
                country: geoData.country,
                state: geoData.state,
                coordinates: {
                    lat: geoData.lat,
                    lon: geoData.lon
                }
            },
            current,
            forecast
        };
    }
}

// Export class and create singleton lazily
let weatherServiceInstance = null;

export default {
    getInstance() {
        if (!weatherServiceInstance) {
            weatherServiceInstance = new WeatherService();
        }
        return weatherServiceInstance;
    }
};
