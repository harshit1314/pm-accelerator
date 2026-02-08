# Quick Deploy to Vercel via GitHub

This is the **easiest and recommended** way to deploy your PM Accelerator Weather App to Vercel!

## Why GitHub Deployment?

✅ **Automatic deployments** on every push  
✅ **Preview deployments** for pull requests  
✅ **No CLI needed** - all done through the web interface  
✅ **Easier to manage** - visual dashboard  
✅ **Better for teams** - automatic CI/CD  

---

## Step-by-Step Guide

### Step 1: Push Your Code to GitHub

#### Option A: If you already have a GitHub repository

```bash
cd "c:\Users\harsh\OneDrive\Desktop\pm accelerator"

# Add all files
git add .

# Commit changes
git commit -m "Configure for Vercel deployment"

# Push to GitHub
git push origin main
```

#### Option B: If you need to create a new repository

1. **Go to GitHub** and create a new repository:
   - Visit: https://github.com/new
   - Repository name: `pm-accelerator-weather-app` (or your choice)
   - Make it **Public** or **Private** (your choice)
   - **DO NOT** initialize with README (you already have one)
   - Click "Create repository"

2. **Push your code**:
   ```bash
   cd "c:\Users\harsh\OneDrive\Desktop\pm accelerator"
   
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - Configure for Vercel deployment"
   
   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/pm-accelerator-weather-app.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Import to Vercel

1. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard
   - Click **"Add New..."** → **"Project"**

2. **Import Git Repository**:
   - You'll see a list of your GitHub repositories
   - Find `pm-accelerator-weather-app`
   - Click **"Import"**

3. **Configure Project**:
   - Vercel will auto-detect your `vercel.json` configuration
   - **Framework Preset**: Should auto-detect as "Other" or "Vite"
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: Leave as default (Vercel uses `vercel.json`)
   - **Output Directory**: Leave as default
   - Click **"Deploy"** (we'll add environment variables after first deploy)

---

### Step 3: Add Environment Variables

After the first deployment (it may fail without env vars, that's OK):

1. **Go to Project Settings**:
   - In Vercel dashboard, click on your project
   - Go to **Settings** → **Environment Variables**

2. **Add these variables**:

   | Variable Name | Value | Environments |
   |---------------|-------|--------------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string | ✅ Production, ✅ Preview, ✅ Development |
   | `OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | ✅ Production, ✅ Preview, ✅ Development |
   | `YOUTUBE_API_KEY` | Your YouTube Data API key | ✅ Production, ✅ Preview, ✅ Development |

   **Important**: Check all three environment checkboxes for each variable!

3. **Get your environment variable values**:
   - Open your local `.env` file: `c:\Users\harsh\OneDrive\Desktop\pm accelerator\backend\.env`
   - Copy the values from there

---

### Step 4: Redeploy

1. **Trigger a new deployment**:
   - Go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - OR simply push a new commit to GitHub:
     ```bash
     git commit --allow-empty -m "Trigger redeploy with env vars"
     git push
     ```

2. **Wait for deployment** (usually 2-3 minutes)

3. **Get your live URL**:
   - You'll get a URL like: `https://pm-accelerator-weather-app.vercel.app`
   - Or: `https://pm-accelerator-weather-app-harshits-projects.vercel.app`

---

### Step 5: Test Your Deployment

Visit your Vercel URL and test:

✅ **Homepage loads**  
✅ **Weather search** (try "London", "10001", "40.7128,-74.0060")  
✅ **Geolocation** button  
✅ **CRUD operations** (create, read, update, delete queries)  
✅ **Data export** (JSON, CSV, PDF, XML)  
✅ **YouTube videos** for locations  
✅ **OpenStreetMap** integration  

---

## MongoDB Atlas Setup (If Not Done Already)

Your MongoDB connection needs to allow Vercel's servers:

1. **Go to MongoDB Atlas**:
   - Visit: https://cloud.mongodb.com/

2. **Network Access**:
   - Click **"Network Access"** in the left sidebar
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

3. **Get Connection String**:
   - Go to **"Database"** → **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your actual database password
   - Use this as your `MONGODB_URI` in Vercel

---

## Automatic Deployments

Once connected to GitHub, Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets its own preview URL

To deploy updates:
```bash
git add .
git commit -m "Update feature"
git push
```

Vercel will automatically build and deploy! 🚀

---

## Troubleshooting

### Deployment fails with "Application Error"
- Check the **Function Logs** in Vercel dashboard
- Verify all environment variables are set correctly
- Make sure MongoDB Atlas allows connections from anywhere

### API routes return 404
- Verify `vercel.json` is in the root directory
- Check that routing configuration is correct
- Review deployment logs

### Build fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

---

## Next Steps After Deployment

1. **Update README** with your live URL
2. **Test all features** on production
3. **Share your demo link** for the PM Accelerator submission
4. **Optional**: Add a custom domain in Vercel settings

---

## Quick Reference Commands

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub (triggers Vercel deployment)
git push origin main

# View git remote
git remote -v
```

---

**That's it! Your app will be live on Vercel with automatic deployments! 🎉**
