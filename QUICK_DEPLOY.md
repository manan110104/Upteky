# ⚡ Quick Deployment Guide

Fastest way to deploy your Feedback Dashboard.

## 🎯 Quick Steps

### 1️⃣ Push to GitHub (5 minutes)

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - Feedback Dashboard"
git branch -M main

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/feedback-dashboard.git
git push -u origin main
```

### 2️⃣ Deploy Backend to Render (3 minutes)

1. Go to [render.com](https://render.com) → Sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo → **"Connect"**
4. Configure:
   - **Name**: `feedback-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **"Create Web Service"**
6. **Wait for deploy** → Copy the URL (e.g., `https://feedback-api.onrender.com`)

### 3️⃣ Deploy Frontend to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign up
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repo → **"Import"**
4. Configure:
   - **Root Directory**: `frontend` (click Edit)
   - **Framework Preset**: Vite
5. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (from step 2)
6. Click **"Deploy"**
7. **Wait for deploy** → Copy the URL (e.g., `https://feedback-dashboard.vercel.app`)

## ✅ Done!

**Your URLs:**
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.onrender.com`
- GitHub: `https://github.com/your-username/feedback-dashboard`

## 🔧 Troubleshooting

**Backend not working?**
- Check Render logs (Logs tab)
- First request might take 30s (free tier sleep)

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` in Vercel → Settings → Environment Variables
- Make sure URL has no trailing slash
- Redeploy frontend after changing env var

## 📝 For Submission

Submit these:
1. **Frontend URL**: Your Vercel URL
2. **Backend URL**: Your Render URL
3. **GitHub Repository**: Your repo link

🎉 **Good luck!**

