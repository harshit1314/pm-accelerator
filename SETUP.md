# Weather App - Setup Guide

## Quick Start

### 1. Get API Keys (Free)

#### OpenWeatherMap API
1. Go to https://openweathermap.org/api
2. Click "Sign Up" and create a free account
3. Navigate to "API keys" section
4. Copy your API key

#### YouTube Data API v3
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials (API key)
5. Copy your API key



### 2. Install MongoDB

**Option A: Local Installation**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Connection string: `mongodb://localhost:27017/weather-app`

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Configure Environment Variables

Create `backend/.env` file:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
OPENWEATHER_API_KEY=your_openweather_key_here
YOUTUBE_API_KEY=your_youtube_key_here
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

Open your browser and go to: http://localhost:3000

---

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string is correct
- Verify network access settings in MongoDB Atlas

### API Key Issues
- Verify all API keys are correctly copied
- Check if APIs are enabled in Google Cloud Console
- Ensure OpenWeatherMap API key is activated (can take a few minutes)

### Port Already in Use
- Change PORT in backend/.env to a different number
- Or kill the process using the port

---

## Need Help?

Contact: your.email@example.com
