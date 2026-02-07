import { useState } from 'react';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeather from './components/CurrentWeather';
import FiveDayForecast from './components/FiveDayForecast';
import SavedQueries from './components/SavedQueries';
import AdditionalInfo from './components/AdditionalInfo';
import ExportData from './components/ExportData';
import Footer from './components/Footer';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('search');

    const handleWeatherData = (data) => {
        setWeatherData(data);
        setError(null);
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setWeatherData(null);
    };

    const handleLoading = (isLoading) => {
        setLoading(isLoading);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <h1 className="app-title">
                        <span className="weather-icon">⛅</span>
                        Weather App
                    </h1>
                    <p className="app-subtitle">Full Stack Technical Assessment</p>
                </div>
            </header>

            <nav className="nav-tabs">
                <button
                    className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
                    onClick={() => setActiveTab('search')}
                >
                    🔍 Search Weather
                </button>
                <button
                    className={`nav-tab ${activeTab === 'saved' ? 'active' : ''}`}
                    onClick={() => setActiveTab('saved')}
                >
                    💾 Saved Queries
                </button>
                <button
                    className={`nav-tab ${activeTab === 'export' ? 'active' : ''}`}
                    onClick={() => setActiveTab('export')}
                >
                    📥 Export Data
                </button>
            </nav>

            <main className="main-content">
                {activeTab === 'search' && (
                    <>
                        <WeatherSearch
                            onWeatherData={handleWeatherData}
                            onError={handleError}
                            onLoading={handleLoading}
                        />

                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Fetching weather data...</p>
                            </div>
                        )}

                        {weatherData && !loading && (
                            <div className="weather-results">
                                <CurrentWeather data={weatherData.current} location={weatherData.location} />
                                <FiveDayForecast forecast={weatherData.forecast} />
                                <AdditionalInfo location={weatherData.location} />
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'saved' && <SavedQueries />}
                {activeTab === 'export' && <ExportData />}
            </main>

            <Footer />
        </div>
    );
}

export default App;
