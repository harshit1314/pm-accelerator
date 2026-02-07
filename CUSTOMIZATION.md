# Customization Guide

## 🎨 Personalize Your Submission

Before submitting, make sure to customize these files with your personal information:

### 1. Update Developer Name

#### backend/server.js (Line 48)
```javascript
author: 'Your Name',  // ← Change this
```

#### frontend/src/components/Footer.jsx (Line 67)
```javascript
Developed by <strong>Your Name</strong>  // ← Change this
```

#### README.md (Multiple locations)
- Line 9: `**Developer:** Your Name`
- Line 382: `**Name:** Your Name`
- Search for "Your Name" and replace all instances

### 2. Add Your Links

#### frontend/src/components/Footer.jsx (Line 70)
```javascript
href="https://github.com/yourusername/weather-app"  // ← Add your GitHub username
```

#### README.md
- Line 383: Add your GitHub profile link
- Line 384: Add your LinkedIn profile link
- Line 385: Add your email

### 3. Update Repository Information

#### README.md (Line 31)
```bash
git clone https://github.com/yourusername/weather-app.git  // ← Your repo URL
```

### 4. Add Demo Video Link

#### README.md (Line 365)
```markdown
**Demo Video Link:** [Insert your demo video URL here]
```

---

## 📝 Checklist Before Submission

- [ ] Replace "Your Name" with your actual name (3 locations)
- [ ] Update GitHub username in links (2 locations)
- [ ] Add your LinkedIn profile link
- [ ] Add your email address
- [ ] Record and upload demo video
- [ ] Add demo video link to README
- [ ] Test application end-to-end
- [ ] Verify all API keys are working
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Set repository to public
- [ ] Submit Google form

---

## 🔍 Files to Customize

1. `backend/server.js` - Developer name
2. `frontend/src/components/Footer.jsx` - Name and GitHub link
3. `README.md` - Name, links, demo video
4. `backend/package.json` - Author field (optional)
5. `frontend/package.json` - Author field (optional)

---

## 🎥 Recording Your Demo Video

### Recommended Tools
- **OBS Studio** (Free, professional) - https://obsproject.com/
- **Loom** (Easy, web-based) - https://loom.com/
- **ShareX** (Windows) - https://getsharex.com/
- **QuickTime** (Mac) - Built-in

### Video Checklist
- [ ] Show project structure
- [ ] Demonstrate weather search
- [ ] Show 5-day forecast
- [ ] Demonstrate CRUD operations
- [ ] Show data export
- [ ] Display YouTube and Maps integration
- [ ] Show responsive design
- [ ] Keep it under 2 minutes
- [ ] Speak clearly and explain features

### Upload Options
- YouTube (unlisted or public)
- Google Drive (set to "Anyone with link can view")
- Vimeo
- Loom (automatic hosting)

---

## 📤 GitHub Repository Setup

### Initialize Git
```bash
cd "c:\Users\harsh\OneDrive\Desktop\pm accelerator"
git init
git add .
git commit -m "Initial commit: Full Stack Weather App"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Name: `weather-app` or `pm-accelerator-weather-app`
3. Description: "Full Stack Weather Application - PM Accelerator Technical Assessment"
4. Set to **Public**
5. Don't initialize with README (you already have one)

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Add Collaborator (if using private repo)
- Go to Settings → Collaborators
- Add: `PMA-Community`

---

## ✅ Final Verification

Before submitting, verify:

1. **Application runs locally**
   - Backend starts without errors
   - Frontend loads correctly
   - All features work

2. **Documentation is complete**
   - README has all your information
   - Demo video link is added
   - Setup instructions are clear

3. **GitHub repository**
   - Code is pushed
   - Repository is public (or PMA-Community has access)
   - README displays correctly on GitHub

4. **Demo video**
   - Shows all required features
   - Audio is clear
   - Under 2 minutes
   - Link works

---

## 🚀 You're Ready!

Once you've completed all customizations and verifications, submit the Google form with:
- GitHub repository link
- Demo video link
- Your contact information

**Good luck with your submission! 🎉**
