import { exportAPI } from '../utils/api';

function ExportData() {
    const handleExport = (format) => {
        switch (format) {
            case 'json':
                exportAPI.json();
                break;
            case 'csv':
                exportAPI.csv();
                break;
            case 'pdf':
                exportAPI.pdf();
                break;
            case 'xml':
                exportAPI.xml();
                break;
            default:
                console.error('Unknown format');
        }
    };

    return (
        <div className="export-data">
            <h2>Export Weather Data</h2>
            <p className="export-description">
                Download all your saved weather queries in various formats for analysis, reporting, or backup purposes.
            </p>

            <div className="export-grid">
                <div className="export-card">
                    <div className="export-icon">📄</div>
                    <h3>JSON</h3>
                    <p>Structured data format, ideal for developers and data processing</p>
                    <button onClick={() => handleExport('json')} className="export-button">
                        Download JSON
                    </button>
                </div>

                <div className="export-card">
                    <div className="export-icon">📊</div>
                    <h3>CSV</h3>
                    <p>Spreadsheet format, perfect for Excel and data analysis tools</p>
                    <button onClick={() => handleExport('csv')} className="export-button">
                        Download CSV
                    </button>
                </div>

                <div className="export-card">
                    <div className="export-icon">📑</div>
                    <h3>PDF</h3>
                    <p>Professional document format, great for reports and presentations</p>
                    <button onClick={() => handleExport('pdf')} className="export-button">
                        Download PDF
                    </button>
                </div>

                <div className="export-card">
                    <div className="export-icon">🔖</div>
                    <h3>XML</h3>
                    <p>Markup language format, suitable for data exchange and integration</p>
                    <button onClick={() => handleExport('xml')} className="export-button">
                        Download XML
                    </button>
                </div>
            </div>

            <div className="export-info">
                <h3>ℹ️ Export Information</h3>
                <ul>
                    <li>All exports include complete weather query data</li>
                    <li>Data is exported in real-time from the database</li>
                    <li>Files are automatically downloaded to your default download folder</li>
                    <li>No data is stored on external servers during export</li>
                </ul>
            </div>
        </div>
    );
}

export default ExportData;
