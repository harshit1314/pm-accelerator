# Deploying to Vercel - Step-by-Step Guide

This guide will walk you through deploying your PM Accelerator Weather App to Vercel.

## Prerequisites

Before deploying, ensure you have:
- ✅ A Vercel account ([Sign up free](https://vercel.com/signup))
- ✅ Git repository (GitHub, GitLab, or Bitbucket)
- ✅ MongoDB Atlas connection string (for production database)
- ✅ OpenWeatherMap API key
- ✅ YouTube Data API key

---

## Option 1: Deploy via Vercel Dashboard (Recommended for First-Time Users)

### Step 1: Push Your Code to Git

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Prepare for Vercel deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/pm-accelerator-weather-app.git
git branch -M main
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect the framework settings

### Step 3: Configure Build Settings

Vercel should auto-detect the configuration from `vercel.json`, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as root)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install` (in both frontend and backend)

### Step 4: Add Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | Production, Preview, Development |
| `OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Production, Preview, Development |
| `YOUTUBE_API_KEY` | Your YouTube Data API key | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

> **Important**: Make sure to select all three environments (Production, Preview, Development) for each variable.

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll get a URL like: `https://pm-accelerator-weather-app.vercel.app`

---

## Option 2: Deploy via Vercel CLI (For Advanced Users)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Project Root

```bash
cd "c:\Users\harsh\OneDrive\Desktop\pm accelerator"
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (for first deployment)
- **Project name?** → pm-accelerator-weather-app (or your choice)
- **In which directory is your code located?** → `./`

### Step 4: Add Environment Variables via CLI

```bash
# Add MongoDB URI
vercel env add MONGODB_URI

# Add OpenWeatherMap API Key
vercel env add OPENWEATHER_API_KEY

# Add YouTube API Key
vercel env add YOUTUBE_API_KEY
```

For each variable:
- Paste the value when prompted
- Select: **Production**, **Preview**, and **Development**

### Step 5: Redeploy with Environment Variables

```bash
vercel --prod
```

---

## Post-Deployment Verification

### 1. Test the Deployment

Visit your Vercel URL and test:

- ✅ **Homepage loads** without errors
- ✅ **Weather search** works (try "London", "10001", "40.7128,-74.0060")
- ✅ **Geolocation** button functions
- ✅ **CRUD operations** (create, read, update, delete queries)
- ✅ **Data export** (JSON, CSV, PDF, XML)
- ✅ **YouTube videos** display for locations
- ✅ **OpenStreetMap** renders correctly

### 2. Check API Health

```bash
# Replace YOUR_VERCEL_URL with your actual deployment URL
curl https://YOUR_VERCEL_URL/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Weather App API is running",
  "timestamp": "2026-02-08T...",
  "environment": "production"
}
```

### 3. Test Weather Search API

```bash
curl -X POST https://YOUR_VERCEL_URL/api/weather/search \
  -H "Content-Type: application/json" \
  -d '{"location":"London"}'
```

### 4. Monitor Logs

- Go to Vercel Dashboard → Your Project → **Functions**
- Click on any function to view real-time logs
- Check for errors or warnings

---

## Troubleshooting

### Issue: "Application Error" on Deployment

**Solution**: Check Vercel function logs for specific errors. Common causes:
- Missing environment variables
- MongoDB connection issues
- API key problems

### Issue: API Routes Return 404

**Solution**: Verify `vercel.json` routing configuration is correct:
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    }
  ]
}
```

### Issue: Frontend Loads but API Calls Fail

**Solution**: 
1. Check browser console for CORS errors
2. Verify environment variables are set in Vercel dashboard
3. Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0) or add Vercel IPs

### Issue: Build Fails

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Try building locally first: `cd frontend && npm run build`

### Issue: MongoDB Connection Timeout

**Solution**:
1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Redeploy on Vercel

---

## Environment-Specific Configuration

### MongoDB Atlas Setup for Production

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/weather-app`
5. Add to Vercel environment variables

### API Keys

- **OpenWeatherMap**: [Get free API key](https://openweathermap.org/api)
- **YouTube Data API**: [Get free API key](https://console.cloud.google.com/)

---

## Continuous Deployment

Once connected to Git, Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

To trigger a new deployment:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

---

## Performance Optimization

Your deployment includes:
- ✅ Code splitting (vendor and leaflet chunks)
- ✅ Minified production build
- ✅ Serverless functions with automatic scaling
- ✅ CDN distribution via Vercel Edge Network

---

## Monitoring and Analytics

- **Vercel Analytics**: Enable in project settings for free
- **Function Logs**: Real-time logs in Vercel dashboard
- **Performance Insights**: Available in Vercel dashboard

---

## Support

If you encounter issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review function logs in Vercel dashboard
3. Test API endpoints using the health check endpoint

---

**Deployment Checklist:**
- [ ] Code pushed to Git repository
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] All features tested on production URL
- [ ] API health check passes
- [ ] MongoDB connection verified

---

**🎉 Congratulations! Your PM Accelerator Weather App is now live on Vercel!**
