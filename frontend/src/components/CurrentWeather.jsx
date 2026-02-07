function CurrentWeather({ data, location }) {
    if (!data || !location) return null;

    const getWeatherIcon = (weatherCode) => {
        const iconMap = {
            'clear sky': '☀️',
            'few clouds': '🌤️',
            'scattered clouds': '⛅',
            'broken clouds': '☁️',
            'overcast clouds': '☁️',
            'shower rain': '🌧️',
            'rain': '🌧️',
            'light rain': '🌦️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'mist': '🌫️',
            'fog': '🌫️'
        };

        const description = weatherCode?.toLowerCase() || '';

        for (const [key, icon] of Object.entries(iconMap)) {
            if (description.includes(key)) return icon;
        }

        return '🌡️';
    };

    const formatTemp = (temp) => Math.round(temp);

    return (
        <div className="current-weather">
            <div className="weather-header">
                <h2 className="weather-location">
                    {location.name}
                    {location.state && `, ${location.state}`}
                    {location.country && ` (${location.country})`}
                </h2>
                <p className="weather-coords">
                    📍 {location.coordinates.lat.toFixed(4)}, {location.coordinates.lon.toFixed(4)}
                </p>
            </div>

            <div className="weather-main">
                <div className="weather-icon-large">
                    {getWeatherIcon(data.weather?.description)}
                </div>
                <div className="weather-temp-main">
                    <span className="temp-value">{formatTemp(data.temp)}</span>
                    <span className="temp-unit">°C</span>
                </div>
                <p className="weather-description">{data.weather?.description}</p>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <span className="detail-icon">🌡️</span>
                    <div className="detail-content">
                        <span className="detail-label">Feels Like</span>
                        <span className="detail-value">{formatTemp(data.feels_like)}°C</span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">💧</span>
                    <div className="detail-content">
                        <span className="detail-label">Humidity</span>
                        <span className="detail-value">{data.humidity}%</span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">💨</span>
                    <div className="detail-content">
                        <span className="detail-label">Wind Speed</span>
                        <span className="detail-value">{data.wind?.speed} m/s</span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">🔽</span>
                    <div className="detail-content">
                        <span className="detail-label">Pressure</span>
                        <span className="detail-value">{data.pressure} hPa</span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">👁️</span>
                    <div className="detail-content">
                        <span className="detail-label">Visibility</span>
                        <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
                    </div>
                </div>

                <div className="detail-item">
                    <span className="detail-icon">☁️</span>
                    <div className="detail-content">
                        <span className="detail-label">Cloudiness</span>
                        <span className="detail-value">{data.clouds?.all}%</span>
                    </div>
                </div>
            </div>

            <div className="temp-range">
                <div className="temp-range-item">
                    <span className="range-label">Min</span>
                    <span className="range-value">{formatTemp(data.temp_min)}°C</span>
                </div>
                <div className="temp-range-divider"></div>
                <div className="temp-range-item">
                    <span className="range-label">Max</span>
                    <span className="range-value">{formatTemp(data.temp_max)}°C</span>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;
