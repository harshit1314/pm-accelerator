# Weather App - Full Stack Technical Assessment

![Weather App](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

A comprehensive full-stack weather application built for the **PM Accelerator** Technical Assessment, demonstrating proficiency in both frontend and backend development.

**Developer:** Your Name  
**Assessment:** Full Stack Engineer (Tech Assessment #1 + #2)

---

## 🎯 Project Overview

This application allows users to:
- Search weather by **multiple location formats** (city name, zip code, GPS coordinates)
- View **current weather** and **5-day forecasts**
- **Save weather queries** with date ranges to MongoDB
- Perform **full CRUD operations** on saved queries
- **Export data** in multiple formats (JSON, CSV, PDF, XML)
- View **YouTube videos** and **OpenStreetMap** for searched locations
- Use **geolocation** for current location weather

---

## ✨ Features Completed

### Frontend (Tech Assessment #1) ✅
- ✅ Multiple location input formats (city, zip code, coordinates)
- ✅ Real-time weather search with OpenWeatherMap API
- ✅ Current weather display with detailed information
- ✅ 5-day weather forecast with responsive grid layout
- ✅ Geolocation support for current location
- ✅ Comprehensive error handling with user-friendly messages
- ✅ **Fully responsive design** (desktop, tablet, mobile)
- ✅ Modern UI with gradients, animations, and smooth transitions
- ✅ Weather icons and visual indicators

### Backend (Tech Assessment #2) ✅
- ✅ **CREATE**: Save weather queries with location and date range validation
- ✅ **READ**: Retrieve all saved queries with pagination
- - ✅ **UPDATE**: Modify saved queries with validation
- ✅ **DELETE**: Remove weather queries
- ✅ RESTful API architecture with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation middleware
- ✅ **Data Export**: JSON, CSV, PDF, and XML formats
- ✅ **Additional API Integration**:
  - YouTube Data API v3 (location videos)
  - OpenStreetMap with Leaflet (interactive maps)
  - Nominatim geocoding (location search)

---

## 🛠️ Technology Stack

### Frontend
- **React 18.2** - UI library
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Custom responsive styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### APIs
- **OpenWeatherMap API** - Weather data
- **YouTube Data API v3** - Video content
- **OpenStreetMap** - Free map tiles
- **Nominatim** - Free geocoding service
- **Leaflet** - Interactive map library

---

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local installation - [Download](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
3. **API Keys** (only 2 required, both free):
   - OpenWeatherMap API key - [Get here](https://openweathermap.org/api)
   - YouTube Data API v3 key - [Get here](https://console.cloud.google.com/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/weather-app
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/weather-app

# Server Configuration
PORT=5000

# API Keys
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Option 2: Using Concurrently (Recommended)

From the root directory, you can set up a script to run both:

```bash
# Install concurrently globally
npm install -g concurrently

# Run both servers
concurrently "cd backend && npm start" "cd frontend && npm run dev"
```

---

## 📚 API Documentation

### Weather Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/weather/search` | Search weather by location |
| POST | `/api/weather/queries` | Create new weather query |
| GET | `/api/weather/queries` | Get all saved queries |
| GET | `/api/weather/queries/:id` | Get specific query |
| PUT | `/api/weather/queries/:id` | Update query |
| DELETE | `/api/weather/queries/:id` | Delete query |

### Export Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/export/json` | Export as JSON |
| GET | `/api/export/csv` | Export as CSV |
| GET | `/api/export/pdf` | Export as PDF |
| GET | `/api/export/xml` | Export as XML |

### Additional Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/additional/youtube/:location` | Get YouTube videos |
| GET | `/api/additional/map?location=...` | Get map coordinates for OpenStreetMap |

---

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Search Weather**
   - [ ] Search by city name (e.g., "New York")
   - [ ] Search by zip code (e.g., "10001")
   - [ ] Search by coordinates (e.g., "40.7128,-74.0060")
   - [ ] Use geolocation button
   - [ ] Test invalid location (error handling)

2. **CRUD Operations**
   - [ ] Create a new weather query with date range
   - [ ] View all saved queries
   - [ ] Edit a saved query
   - [ ] Delete a saved query
   - [ ] Test date validation (end date before start date)

3. **Data Export**
   - [ ] Export as JSON
   - [ ] Export as CSV
   - [ ] Export as PDF
   - [ ] Export as XML

4. **Additional Features**
   - [ ] View YouTube videos for location
   - [ ] View OpenStreetMap for location

5. **Responsive Design**
   - [ ] Test on desktop (1920x1080)
   - [ ] Test on tablet (768x1024)
   - [ ] Test on mobile (375x667)

### API Testing with cURL

```bash
# Search weather
curl -X POST http://localhost:5000/api/weather/search \
  -H "Content-Type: application/json" \
  -d '{"location":"London"}'

# Create query
curl -X POST http://localhost:5000/api/weather/queries \
  -H "Content-Type: application/json" \
  -d '{
    "location":"Paris",
    "dateRange":{"start":"2026-02-01","end":"2026-02-05"},
    "notes":"Trip planning"
  }'

# Get all queries
curl http://localhost:5000/api/weather/queries

# Export as JSON
curl http://localhost:5000/api/export/json > weather-data.json
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** (1920x1080 and above)
- **Tablet** (768x1024)
- **Mobile** (375x667 and smaller)

### Responsive Techniques Used:
- CSS Grid and Flexbox for flexible layouts
- Media queries for breakpoints
- Mobile-first design approach
- Fluid typography and spacing
- Touch-friendly buttons and inputs

---

## 🎨 Design Highlights

- **Modern Color Palette** with CSS custom properties
- **Gradient Backgrounds** for visual appeal
- **Smooth Animations** and transitions
- **Weather Icons** using emojis
- **Card-based Layout** for content organization
- **Glassmorphism Effects** on certain elements
- **Hover Effects** for interactivity

---

## 📂 Project Structure

```
weather-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── WeatherQuery.js
│   ├── routes/
│   │   ├── weather.js
│   │   ├── export.js
│   │   └── additional.js
│   ├── middleware/
│   │   └── validation.js
│   ├── utils/
│   │   └── weatherService.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherSearch.jsx
            <span className="tech-tag">OpenWeatherMap API</span>
            <span className="tech-tag">YouTube API</span>
            <span className="tech-tag">OpenStreetMap</span>
            <span className="tech-tag">Leaflet</span>x
│   │   │   ├── AdditionalInfo.jsx
│   │   │   ├── ExportData.jsx
│   │   │   └── Footer.jsx
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🔒 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

**⚠️ Important:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

---

## 🎥 Demo Video

**Demo Video Link:** [Insert your demo video URL here]

The demo video includes:
- Code walkthrough
- Feature demonstration
- CRUD operations
- Export functionality
- Responsive design showcase
- API integrations

---

## 🌟 Key Implementation Decisions

1. **MongoDB over SQL**: Chosen for flexible schema and easy integration with Node.js
2. **Vite over Create React App**: Faster build times and better developer experience
3. **Vanilla CSS over frameworks**: Demonstrates CSS proficiency and full control
4. **Multiple export formats**: Shows versatility in data handling
5. **Comprehensive validation**: Ensures data integrity at both frontend and backend

---

## 🐛 Error Handling

The application includes comprehensive error handling:

- **Frontend**: User-friendly error messages for all failure scenarios
- **Backend**: Proper HTTP status codes and error responses
- **Validation**: Input validation on both client and server
- **API Failures**: Graceful degradation when external APIs fail

---

## 🚧 Future Enhancements

Potential improvements for production:
- User authentication and authorization
- Weather alerts and notifications
- Historical weather data analysis
- Weather comparison between locations
- Social sharing features
- Progressive Web App (PWA) capabilities

---

## 📞 About PM Accelerator

[**Product Manager Accelerator**](https://www.linkedin.com/company/product-manager-accelerator/) is a premier program designed to help aspiring product managers and technical professionals develop the skills needed to excel in the tech industry. The program offers hands-on experience, mentorship, and real-world projects.

---

## 👨‍💻 Developer

**Name:** Your Name  
**GitHub:** [github.com/yourusername](https://github.com/yourusername)  
**LinkedIn:** [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)  
**Email:** your.email@example.com

---

## 📄 License

This project is created for educational purposes as part of the PM Accelerator Technical Assessment.

---

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Google for YouTube API
- OpenStreetMap and Leaflet for free mapping
- PM Accelerator for the opportunity
- MongoDB for database solutions

---

**Built with ❤️ for PM Accelerator Technical Assessment**
