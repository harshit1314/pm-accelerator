function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About This Project</h3>
                    <p>
                        Full Stack Weather Application built for the <strong>PM Accelerator</strong> Technical Assessment.
                        This application demonstrates proficiency in both frontend and backend development,
                        including API integration, database management, and responsive design.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>About PM Accelerator</h3>
                    <p>
                        <a
                            href="https://www.linkedin.com/company/product-manager-accelerator/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Product Manager Accelerator
                        </a>
                        {' '}is a premier program designed to help aspiring product managers
                        and technical professionals develop the skills needed to excel in the tech industry.
                        The program offers hands-on experience, mentorship, and real-world projects.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Technologies Used</h3>
                    <div className="tech-tags">
                        <span className="tech-tag">React</span>
                        <span className="tech-tag">Node.js</span>
                        <span className="tech-tag">Express</span>
                        <span className="tech-tag">MongoDB</span>
                        <span className="tech-tag">OpenWeatherMap API</span>
                        <span className="tech-tag">YouTube API</span>
                        <span className="tech-tag">Google Maps API</span>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Features</h3>
                    <ul className="features-list">
                        <li>✅ Real-time weather data from OpenWeatherMap</li>
                        <li>✅ 5-day weather forecast</li>
                        <li>✅ Multiple location input formats (city, zip, coordinates)</li>
                        <li>✅ Geolocation support</li>
                        <li>✅ Full CRUD operations with MongoDB</li>
                        <li>✅ Data export (JSON, CSV, PDF, XML)</li>
                        <li>✅ YouTube video integration</li>
                        <li>✅ Google Maps integration</li>
                        <li>✅ Responsive design for all devices</li>
                        <li>✅ Comprehensive error handling</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    Developed by <strong>Your Name</strong> |
                    <a
                        href="https://github.com/yourusername/weather-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        {' '}GitHub Repository
                    </a>
                </p>
                <p className="footer-year">© 2026 | PM Accelerator Technical Assessment</p>
            </div>
        </footer>
    );
}

export default Footer;
