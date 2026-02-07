import { useState } from 'react';
import { weatherAPI, getCurrentLocation } from '../utils/api';

function WeatherSearch({ onWeatherData, onError, onLoading }) {
    const [location, setLocation] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!location.trim()) {
            onError('Please enter a location');
            return;
        }

        try {
            onLoading(true);
            onError(null);

            const response = await weatherAPI.search(location.trim());

            if (response.data.success) {
                onWeatherData(response.data.data);
            } else {
                onError(response.data.error || 'Failed to fetch weather data');
            }
        } catch (error) {
            console.error('Search error:', error);
            onError(error.response?.data?.error || 'Failed to fetch weather data. Please try again.');
        } finally {
            onLoading(false);
        }
    };

    const handleCurrentLocation = async () => {
        try {
            onLoading(true);
            onError(null);

            const coords = await getCurrentLocation();
            const locationString = `${coords.lat},${coords.lon}`;

            const response = await weatherAPI.search(locationString);

            if (response.data.success) {
                onWeatherData(response.data.data);
                setLocation(response.data.data.location.name);
            } else {
                onError(response.data.error || 'Failed to fetch weather data');
            }
        } catch (error) {
            console.error('Geolocation error:', error);
            onError(error.message || 'Failed to get your location. Please enable location services.');
        } finally {
            onLoading(false);
        }
    };

    return (
        <div className="weather-search">
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-group">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Enter city, zip code, or coordinates (lat,lon)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button type="submit" className="search-button">
                            🔍 Search
                        </button>
                    </div>
                </form>

                <button
                    className="location-button"
                    onClick={handleCurrentLocation}
                    title="Use current location"
                >
                    📍 Use My Location
                </button>
            </div>

            <div className="search-examples">
                <p className="examples-title">Examples:</p>
                <div className="example-tags">
                    <span className="example-tag" onClick={() => setLocation('New York')}>New York</span>
                    <span className="example-tag" onClick={() => setLocation('10001')}>10001 (Zip)</span>
                    <span className="example-tag" onClick={() => setLocation('40.7128,-74.0060')}>40.7128,-74.0060 (Coords)</span>
                    <span className="example-tag" onClick={() => setLocation('London')}>London</span>
                </div>
            </div>
        </div>
    );
}

export default WeatherSearch;
