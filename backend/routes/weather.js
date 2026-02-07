import express from 'express';
import WeatherQuery from '../models/WeatherQuery.js';
import weatherService from '../utils/weatherService.js';
import { validateLocation, validateDateRange, validateQueryId } from '../middleware/validation.js';

const router = express.Router();

/**
 * POST /api/weather/search
 * Search for weather by location (real-time, not stored)
 */
router.post('/search', async (req, res) => {
    try {
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({
                success: false,
                error: 'Location is required'
            });
        }

        const weatherData = await weatherService.getInstance().getWeatherByLocation(location);

        res.json({
            success: true,
            data: weatherData
        });
    } catch (error) {
        console.error('Weather search error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch weather data'
        });
    }
});

/**
 * POST /api/weather/queries
 * CREATE: Store a new weather query with validation
 */
router.post('/queries', validateLocation, validateDateRange, async (req, res) => {
    try {
        const { location, dateRange, notes } = req.body;

        // Fetch weather data for the location
        const weatherData = await weatherService.getInstance().getWeatherByLocation(location);

        // Create new query document
        const query = new WeatherQuery({
            location: weatherData.location.name,
            dateRange: {
                start: new Date(dateRange.start),
                end: new Date(dateRange.end)
            },
            weatherData: {
                current: weatherData.current,
                forecast: weatherData.forecast
            },
            coordinates: weatherData.location.coordinates,
            country: weatherData.location.country,
            timezone: weatherData.current.timezone,
            notes: notes || ''
        });

        await query.save();

        res.status(201).json({
            success: true,
            message: 'Weather query saved successfully',
            data: query
        });
    } catch (error) {
        console.error('Create query error:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: Object.values(error.errors).map(e => e.message).join(', ')
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to save weather query'
        });
    }
});

/**
 * GET /api/weather/queries
 * READ: Retrieve all stored weather queries
 */
router.get('/queries', async (req, res) => {
    try {
        const { limit = 50, skip = 0, sort = '-createdAt' } = req.query;

        const queries = await WeatherQuery.find()
            .sort(sort)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .lean();

        const total = await WeatherQuery.countDocuments();

        res.json({
            success: true,
            data: queries,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip),
                hasMore: total > parseInt(skip) + queries.length
            }
        });
    } catch (error) {
        console.error('Fetch queries error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather queries'
        });
    }
});

/**
 * GET /api/weather/queries/:id
 * READ: Retrieve a specific weather query
 */
router.get('/queries/:id', validateQueryId, async (req, res) => {
    try {
        const query = await WeatherQuery.findById(req.params.id);

        if (!query) {
            return res.status(404).json({
                success: false,
                error: 'Weather query not found'
            });
        }

        res.json({
            success: true,
            data: query
        });
    } catch (error) {
        console.error('Fetch query error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather query'
        });
    }
});

/**
 * PUT /api/weather/queries/:id
 * UPDATE: Modify a stored weather query with validation
 */
router.put('/queries/:id', validateQueryId, async (req, res) => {
    try {
        const { location, dateRange, notes } = req.body;
        const updateData = {};

        // Validate and update location if provided
        if (location) {
            const weatherData = await weatherService.getInstance().getWeatherByLocation(location);
            updateData.location = weatherData.location.name;
            updateData.coordinates = weatherData.location.coordinates;
            updateData.country = weatherData.location.country;
            updateData.weatherData = {
                current: weatherData.current,
                forecast: weatherData.forecast
            };
            updateData.timezone = weatherData.current.timezone;
        }

        // Validate and update date range if provided
        if (dateRange) {
            const { start, end } = dateRange;
            const startDate = new Date(start);
            const endDate = new Date(end);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid date format'
                });
            }

            if (endDate < startDate) {
                return res.status(400).json({
                    success: false,
                    error: 'End date must be after or equal to start date'
                });
            }

            updateData.dateRange = { start: startDate, end: endDate };
        }

        // Update notes if provided
        if (notes !== undefined) {
            updateData.notes = notes;
        }

        const query = await WeatherQuery.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!query) {
            return res.status(404).json({
                success: false,
                error: 'Weather query not found'
            });
        }

        res.json({
            success: true,
            message: 'Weather query updated successfully',
            data: query
        });
    } catch (error) {
        console.error('Update query error:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: Object.values(error.errors).map(e => e.message).join(', ')
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to update weather query'
        });
    }
});

/**
 * DELETE /api/weather/queries/:id
 * DELETE: Remove a weather query
 */
router.delete('/queries/:id', validateQueryId, async (req, res) => {
    try {
        const query = await WeatherQuery.findByIdAndDelete(req.params.id);

        if (!query) {
            return res.status(404).json({
                success: false,
                error: 'Weather query not found'
            });
        }

        res.json({
            success: true,
            message: 'Weather query deleted successfully',
            data: query
        });
    } catch (error) {
        console.error('Delete query error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete weather query'
        });
    }
});

export default router;
