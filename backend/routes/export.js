import express from 'express';
import WeatherQuery from '../models/WeatherQuery.js';
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';

const router = express.Router();

/**
 * GET /api/export/json
 * Export all weather queries as JSON
 */
router.get('/json', async (req, res) => {
    try {
        const queries = await WeatherQuery.find().lean();

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=weather-queries.json');

        res.json({
            exportDate: new Date().toISOString(),
            totalRecords: queries.length,
            data: queries
        });
    } catch (error) {
        console.error('JSON export error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export data as JSON'
        });
    }
});

/**
 * GET /api/export/csv
 * Export all weather queries as CSV
 */
router.get('/csv', async (req, res) => {
    try {
        const queries = await WeatherQuery.find().lean();

        // Flatten the data for CSV format
        const flattenedData = queries.map(query => ({
            id: query._id.toString(),
            location: query.location,
            country: query.country || '',
            latitude: query.coordinates?.lat || '',
            longitude: query.coordinates?.lon || '',
            dateRangeStart: query.dateRange?.start || '',
            dateRangeEnd: query.dateRange?.end || '',
            currentTemp: query.weatherData?.current?.temp || '',
            currentHumidity: query.weatherData?.current?.humidity || '',
            currentWeather: query.weatherData?.current?.weather?.description || '',
            notes: query.notes || '',
            createdAt: query.createdAt,
            updatedAt: query.updatedAt
        }));

        const parser = new Parser();
        const csv = parser.parse(flattenedData);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=weather-queries.csv');
        res.send(csv);
    } catch (error) {
        console.error('CSV export error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export data as CSV'
        });
    }
});

/**
 * GET /api/export/pdf
 * Export all weather queries as PDF
 */
router.get('/pdf', async (req, res) => {
    try {
        const queries = await WeatherQuery.find().sort('-createdAt').lean();

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=weather-queries.pdf');

        doc.pipe(res);

        // Title
        doc.fontSize(24).font('Helvetica-Bold').text('Weather Queries Report', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).font('Helvetica').text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
        doc.fontSize(12).text(`Total Records: ${queries.length}`, { align: 'center' });
        doc.moveDown(2);

        // Add each query
        queries.forEach((query, index) => {
            // Check if we need a new page
            if (doc.y > 650) {
                doc.addPage();
            }

            doc.fontSize(14).font('Helvetica-Bold').text(`${index + 1}. ${query.location}`, { underline: true });
            doc.moveDown(0.5);

            doc.fontSize(10).font('Helvetica');
            doc.text(`Country: ${query.country || 'N/A'}`);
            doc.text(`Coordinates: ${query.coordinates?.lat?.toFixed(4)}, ${query.coordinates?.lon?.toFixed(4)}`);
            doc.text(`Date Range: ${new Date(query.dateRange?.start).toLocaleDateString()} - ${new Date(query.dateRange?.end).toLocaleDateString()}`);

            if (query.weatherData?.current) {
                doc.text(`Temperature: ${query.weatherData.current.temp}°C`);
                doc.text(`Humidity: ${query.weatherData.current.humidity}%`);
                doc.text(`Weather: ${query.weatherData.current.weather?.description || 'N/A'}`);
            }

            if (query.notes) {
                doc.text(`Notes: ${query.notes}`);
            }

            doc.text(`Created: ${new Date(query.createdAt).toLocaleString()}`);
            doc.moveDown(1.5);
        });

        doc.end();
    } catch (error) {
        console.error('PDF export error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export data as PDF'
        });
    }
});

/**
 * GET /api/export/xml
 * Export all weather queries as XML (bonus format)
 */
router.get('/xml', async (req, res) => {
    try {
        const queries = await WeatherQuery.find().lean();

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<weatherQueries>\n';
        xml += `  <exportDate>${new Date().toISOString()}</exportDate>\n`;
        xml += `  <totalRecords>${queries.length}</totalRecords>\n`;
        xml += '  <queries>\n';

        queries.forEach(query => {
            xml += '    <query>\n';
            xml += `      <id>${query._id}</id>\n`;
            xml += `      <location>${escapeXml(query.location)}</location>\n`;
            xml += `      <country>${escapeXml(query.country || '')}</country>\n`;
            xml += '      <coordinates>\n';
            xml += `        <latitude>${query.coordinates?.lat || ''}</latitude>\n`;
            xml += `        <longitude>${query.coordinates?.lon || ''}</longitude>\n`;
            xml += '      </coordinates>\n';
            xml += '      <dateRange>\n';
            xml += `        <start>${query.dateRange?.start || ''}</start>\n`;
            xml += `        <end>${query.dateRange?.end || ''}</end>\n`;
            xml += '      </dateRange>\n';
            if (query.weatherData?.current) {
                xml += '      <currentWeather>\n';
                xml += `        <temperature>${query.weatherData.current.temp}</temperature>\n`;
                xml += `        <humidity>${query.weatherData.current.humidity}</humidity>\n`;
                xml += `        <description>${escapeXml(query.weatherData.current.weather?.description || '')}</description>\n`;
                xml += '      </currentWeather>\n';
            }
            xml += `      <notes>${escapeXml(query.notes || '')}</notes>\n`;
            xml += `      <createdAt>${query.createdAt}</createdAt>\n`;
            xml += `      <updatedAt>${query.updatedAt}</updatedAt>\n`;
            xml += '    </query>\n';
        });

        xml += '  </queries>\n';
        xml += '</weatherQueries>';

        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Content-Disposition', 'attachment; filename=weather-queries.xml');
        res.send(xml);
    } catch (error) {
        console.error('XML export error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export data as XML'
        });
    }
});

// Helper function to escape XML special characters
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export default router;
