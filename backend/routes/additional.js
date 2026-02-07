import express from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * GET /api/additional/youtube/:location
 * Fetch YouTube videos related to a location
 */
router.get('/youtube/:location', async (req, res) => {
    try {
        const { location } = req.params;
        const apiKey = process.env.YOUTUBE_API_KEY;

        if (!apiKey) {
            return res.status(503).json({
                success: false,
                error: 'YouTube API key not configured'
            });
        }

        const searchQuery = `${location} travel guide tour`;
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: searchQuery,
                type: 'video',
                maxResults: 5,
                key: apiKey,
                videoDuration: 'medium',
                relevanceLanguage: 'en'
            }
        });

        const videos = response.data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));

        res.json({
            success: true,
            data: videos
        });
    } catch (error) {
        console.error('YouTube API error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch YouTube videos',
            details: error.response?.data?.error?.message || error.message
        });
    }
});

/**
 * GET /api/additional/map
 * Get map coordinates for OpenStreetMap/Leaflet
 */
router.get('/map', async (req, res) => {
    try {
        const { location, lat, lon } = req.query;

        // If coordinates provided, return them directly
        if (lat && lon) {
            return res.json({
                success: true,
                data: {
                    lat: parseFloat(lat),
                    lon: parseFloat(lon),
                    zoom: 12
                }
            });
        }

        // If location name provided, use Nominatim (OpenStreetMap geocoding)
        if (location) {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: location,
                    format: 'json',
                    limit: 1
                },
                headers: {
                    'User-Agent': 'WeatherApp/1.0' // Required by Nominatim
                }
            });

            if (response.data && response.data.length > 0) {
                const result = response.data[0];
                return res.json({
                    success: true,
                    data: {
                        lat: parseFloat(result.lat),
                        lon: parseFloat(result.lon),
                        zoom: 12,
                        displayName: result.display_name
                    }
                });
            }
        }

        return res.status(400).json({
            success: false,
            error: 'Either location or coordinates (lat, lon) are required'
        });
    } catch (error) {
        console.error('Map data error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get map data'
        });
    }
});

/**
 * GET /api/additional/timezone/:lat/:lon
 * Get timezone information for coordinates (bonus feature)
 */
router.get('/timezone/:lat/:lon', async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const timestamp = Math.floor(Date.now() / 1000);
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            return res.status(503).json({
                success: false,
                error: 'Google Maps API key not configured'
            });
        }

        const response = await axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
            params: {
                location: `${lat},${lon}`,
                timestamp,
                key: apiKey
            }
        });

        if (response.data.status !== 'OK') {
            throw new Error(response.data.errorMessage || 'Failed to fetch timezone');
        }

        res.json({
            success: true,
            data: {
                timeZoneId: response.data.timeZoneId,
                timeZoneName: response.data.timeZoneName,
                rawOffset: response.data.rawOffset,
                dstOffset: response.data.dstOffset
            }
        });
    } catch (error) {
        console.error('Timezone API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch timezone information'
        });
    }
});

export default router;
