import { useState, useEffect, useRef } from 'react';
import { additionalAPI } from '../utils/api';

function AdditionalInfo({ location }) {
    const [videos, setVideos] = useState([]);
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('videos');
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (location) {
            fetchAdditionalData();
        }
    }, [location]);

    useEffect(() => {
        // Initialize Leaflet map when map section is active and data is available
        if (activeSection === 'map' && mapData && mapContainerRef.current && !mapInstanceRef.current) {
            initializeMap();
        }
    }, [activeSection, mapData]);

    const fetchAdditionalData = async () => {
        setLoading(true);

        try {
            // Fetch YouTube videos
            const videoResponse = await additionalAPI.getYouTubeVideos(location.name);
            if (videoResponse.data.success) {
                setVideos(videoResponse.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch YouTube videos:', err);
        }

        try {
            // Fetch map data
            const mapResponse = await additionalAPI.getMapData(
                location.name,
                location.coordinates.lat,
                location.coordinates.lon
            );
            if (mapResponse.data.success) {
                setMapData(mapResponse.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch map data:', err);
        }

        setLoading(false);
    };

    const initializeMap = () => {
        // Dynamically load Leaflet CSS and JS
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        if (!window.L) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => createMap();
            document.head.appendChild(script);
        } else {
            createMap();
        }
    };

    const createMap = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
        }

        const map = window.L.map(mapContainerRef.current).setView(
            [mapData.lat, mapData.lon],
            mapData.zoom || 12
        );

        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Add marker
        window.L.marker([mapData.lat, mapData.lon])
            .addTo(map)
            .bindPopup(`<b>${location.name}</b><br>${mapData.lat.toFixed(4)}, ${mapData.lon.toFixed(4)}`)
            .openPopup();

        mapInstanceRef.current = map;
    };

    // Cleanup map on unmount
    useEffect(() => {
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    if (!location) return null;

    return (
        <div className="additional-info">
            <h3 className="additional-title">Explore {location.name}</h3>

            <div className="additional-tabs">
                <button
                    className={`additional-tab ${activeSection === 'videos' ? 'active' : ''}`}
                    onClick={() => setActiveSection('videos')}
                >
                    🎥 Videos
                </button>
                <button
                    className={`additional-tab ${activeSection === 'map' ? 'active' : ''}`}
                    onClick={() => setActiveSection('map')}
                >
                    🗺️ Map
                </button>
            </div>

            {loading && (
                <div className="loading-small">
                    <div className="spinner-small"></div>
                    <p>Loading...</p>
                </div>
            )}

            {activeSection === 'videos' && videos.length > 0 && (
                <div className="videos-section">
                    <div className="videos-grid">
                        {videos.map((video) => (
                            <a
                                key={video.id}
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="video-card"
                            >
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                                <div className="video-info">
                                    <h4 className="video-title">{video.title}</h4>
                                    <p className="video-channel">{video.channelTitle}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {activeSection === 'map' && mapData && (
                <div className="map-section">
                    <div ref={mapContainerRef} className="leaflet-map"></div>
                </div>
            )}
        </div>
    );
}

export default AdditionalInfo;
