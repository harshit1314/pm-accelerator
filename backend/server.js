import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/database.js';
import weatherRoutes from './routes/weather.js';
import exportRoutes from './routes/export.js';
import additionalRoutes from './routes/additional.js';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables with explicit path
dotenv.config({ path: join(__dirname, '.env') });

console.log('🔍 Environment check:');
console.log('  OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ? `${process.env.OPENWEATHER_API_KEY.substring(0, 8)}...` : 'NOT FOUND');
console.log('  MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');
console.log('  PORT:', process.env.PORT || '5000 (default)');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/additional', additionalRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Weather App API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
    res.json({
        message: 'Weather App API - PM Accelerator Technical Assessment',
        developer: 'Your Name',
        version: '1.0.0',
        endpoints: {
            weather: {
                search: 'POST /api/weather/search - Search weather by location',
                createQuery: 'POST /api/weather/queries - Create weather query',
                getAllQueries: 'GET /api/weather/queries - Get all queries',
                getQuery: 'GET /api/weather/queries/:id - Get specific query',
                updateQuery: 'PUT /api/weather/queries/:id - Update query',
                deleteQuery: 'DELETE /api/weather/queries/:id - Delete query'
            },
            export: {
                json: 'GET /api/export/json - Export as JSON',
                csv: 'GET /api/export/csv - Export as CSV',
                pdf: 'GET /api/export/pdf - Export as PDF',
                xml: 'GET /api/export/xml - Export as XML'
            },
            additional: {
                youtube: 'GET /api/additional/youtube/:location - Get YouTube videos',
                map: 'GET /api/additional/map?location=... - Get Google Maps embed',
                timezone: 'GET /api/additional/timezone/:lat/:lon - Get timezone info'
            }
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}`);
    console.log(`📚 Documentation: http://localhost:${PORT}/\n`);
});

export default app;
