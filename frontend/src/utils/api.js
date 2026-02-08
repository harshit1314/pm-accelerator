import axios from 'axios';

// Use relative path in production (Vercel), localhost in development
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Weather API calls
export const weatherAPI = {
    search: (location) => api.post('/weather/search', { location }),
    createQuery: (data) => api.post('/weather/queries', data),
    getAllQueries: (params) => api.get('/weather/queries', { params }),
    getQuery: (id) => api.get(`/weather/queries/${id}`),
    updateQuery: (id, data) => api.put(`/weather/queries/${id}`, data),
    deleteQuery: (id) => api.delete(`/weather/queries/${id}`)
};

// Export API calls
export const exportAPI = {
    json: () => window.open(`${API_BASE_URL}/export/json`, '_blank'),
    csv: () => window.open(`${API_BASE_URL}/export/csv`, '_blank'),
    pdf: () => window.open(`${API_BASE_URL}/export/pdf`, '_blank'),
    xml: () => window.open(`${API_BASE_URL}/export/xml`, '_blank')
};

// Additional API calls
export const additionalAPI = {
    getYouTubeVideos: (location) => api.get(`/additional/youtube/${encodeURIComponent(location)}`),
    getMapData: (location, lat, lon) => {
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        if (lat) params.append('lat', lat);
        if (lon) params.append('lon', lon);
        return api.get(`/additional/map?${params.toString()}`);
    },
    getTimezone: (lat, lon) => api.get(`/additional/timezone/${lat}/${lon}`)
};

// Geolocation helper
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                reject(new Error('Unable to retrieve your location'));
            }
        );
    });
};

export default api;
