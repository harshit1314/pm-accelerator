function FiveDayForecast({ forecast }) {
    if (!forecast || forecast.length === 0) return null;

    const getWeatherIcon = (weatherCode) => {
        const iconMap = {
            'clear': '☀️',
            'clouds': '☁️',
            'rain': '🌧️',
            'drizzle': '🌦️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'mist': '🌫️',
            'fog': '🌫️'
        };

        const main = weatherCode?.toLowerCase() || '';

        for (const [key, icon] of Object.entries(iconMap)) {
            if (main.includes(key)) return icon;
        }

        return '🌡️';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTemp = (temp) => Math.round(temp);

    return (
        <div className="forecast-section">
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="forecast-grid">
                {forecast.map((day, index) => (
                    <div key={index} className="forecast-card">
                        <div className="forecast-date">{formatDate(day.date)}</div>
                        <div className="forecast-icon">{getWeatherIcon(day.weather?.main)}</div>
                        <div className="forecast-description">{day.weather?.description}</div>
                        <div className="forecast-temp">
                            <span className="forecast-temp-value">{formatTemp(day.temp)}°C</span>
                        </div>
                        <div className="forecast-range">
                            <span className="forecast-min">↓ {formatTemp(day.temp_min)}°</span>
                            <span className="forecast-max">↑ {formatTemp(day.temp_max)}°</span>
                        </div>
                        <div className="forecast-details">
                            <div className="forecast-detail">
                                <span>💧 {day.humidity}%</span>
                            </div>
                            <div className="forecast-detail">
                                <span>💨 {day.wind?.speed} m/s</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FiveDayForecast;
