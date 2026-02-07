/**
 * Validation middleware for weather app requests
 */

export const validateLocation = (req, res, next) => {
    const { location } = req.body;

    if (!location || typeof location !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Location is required and must be a string'
        });
    }

    const trimmedLocation = location.trim();
    if (trimmedLocation.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Location cannot be empty'
        });
    }

    if (trimmedLocation.length > 200) {
        return res.status(400).json({
            success: false,
            error: 'Location is too long (max 200 characters)'
        });
    }

    req.body.location = trimmedLocation;
    next();
};

export const validateDateRange = (req, res, next) => {
    const { dateRange } = req.body;

    if (!dateRange) {
        return res.status(400).json({
            success: false,
            error: 'Date range is required'
        });
    }

    const { start, end } = dateRange;

    if (!start || !end) {
        return res.status(400).json({
            success: false,
            error: 'Both start and end dates are required'
        });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
            success: false,
            error: 'Invalid date format. Use ISO 8601 format (YYYY-MM-DD)'
        });
    }

    if (endDate < startDate) {
        return res.status(400).json({
            success: false,
            error: 'End date must be after or equal to start date'
        });
    }

    // Check if date range is reasonable (not more than 1 year)
    const daysDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (daysDiff > 365) {
        return res.status(400).json({
            success: false,
            error: 'Date range cannot exceed 365 days'
        });
    }

    next();
};

export const validateCoordinates = (req, res, next) => {
    const { coordinates } = req.body;

    if (!coordinates) {
        return res.status(400).json({
            success: false,
            error: 'Coordinates are required'
        });
    }

    const { lat, lon } = coordinates;

    if (typeof lat !== 'number' || typeof lon !== 'number') {
        return res.status(400).json({
            success: false,
            error: 'Latitude and longitude must be numbers'
        });
    }

    if (lat < -90 || lat > 90) {
        return res.status(400).json({
            success: false,
            error: 'Latitude must be between -90 and 90'
        });
    }

    if (lon < -180 || lon > 180) {
        return res.status(400).json({
            success: false,
            error: 'Longitude must be between -180 and 180'
        });
    }

    next();
};

export const validateQueryId = (req, res, next) => {
    const { id } = req.params;

    // MongoDB ObjectId validation (24 hex characters)
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    if (!objectIdPattern.test(id)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid query ID format'
        });
    }

    next();
};
