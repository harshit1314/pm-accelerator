import mongoose from 'mongoose';

const weatherQuerySchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        minlength: [1, 'Location cannot be empty'],
        maxlength: [200, 'Location is too long']
    },
    dateRange: {
        start: {
            type: Date,
            required: [true, 'Start date is required']
        },
        end: {
            type: Date,
            required: [true, 'End date is required'],
            validate: {
                validator: function (value) {
                    return value >= this.dateRange.start;
                },
                message: 'End date must be after or equal to start date'
            }
        }
    },
    weatherData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    coordinates: {
        lat: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },
        lon: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        }
    },
    country: String,
    timezone: String,
    notes: String
}, {
    timestamps: true
});

// Index for faster queries
weatherQuerySchema.index({ location: 1, createdAt: -1 });
weatherQuerySchema.index({ 'coordinates.lat': 1, 'coordinates.lon': 1 });

const WeatherQuery = mongoose.model('WeatherQuery', weatherQuerySchema);

export default WeatherQuery;
