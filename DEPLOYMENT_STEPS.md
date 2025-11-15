# 🚀 Complete Deployment Guide: Render + Vercel

This guide will walk you through deploying your Feedback Dashboard to Render (backend) and Vercel (frontend).

## Prerequisites

1. **GitHub Account** - Free account at [github.com](https://github.com)
2. **Render Account** - Free account at [render.com](https://render.com)
3. **Vercel Account** - Free account at [vercel.com](https://vercel.com)
4. **Git installed** on your computer (if not, download from [git-scm.com](https://git-scm.com))

---

## Step 1: Prepare Your Code for GitHub

### 1.1 Initialize Git Repository

Open terminal in your project root directory:

```bash
# Navigate to your project root
cd C:\Users\Administrator\Downloads\upteky__

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Feedback Dashboard ready for deployment"
```

### 1.2 Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `feedback-dashboard` (or any name you prefer)
4. Description: `Full Stack Feedback Management Dashboard`
5. Set to **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click **"Create repository"**

### 1.3 Push Code to GitHub

GitHub will show you commands. Run these in your terminal:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/feedback-dashboard.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get authentication errors:**
- Use Personal Access Token instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` permissions
- Use token as password when pushing

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended) or email

### 2.2 Create New Web Service

1. In Render Dashboard, click **"New +"** button
2. Select **"Web Service"**
3. Click **"Connect account"** if prompted (connect GitHub)
4. Find your repository: `feedback-dashboard` → Click **"Connect"**

### 2.3 Configure Backend Service

Fill in the following:

- **Name**: `feedback-api` (or any name)
- **Environment**: `Node`
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

- **Key**: `NODE_ENV`
- **Value**: `production`

Click **"Add Environment Variable"** again (if needed):

- **Key**: `PORT`
- **Value**: Leave empty (Render assigns automatically)

### 2.5 Deploy

1. Scroll down and click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll see a URL like: `https://feedback-api.onrender.com`
4. **Copy this URL** - you'll need it for the frontend!

### 2.6 Test Backend

1. Visit: `https://your-backend-url.onrender.com/api/health`
2. You should see: `{"status":"OK","message":"Server is running"}`

✅ **Backend is now live!**

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended) for easy deployment

### 3.2 Import Project

1. In Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `feedback-dashboard`
3. Click **"Import"**

### 3.3 Configure Frontend

1. **Framework Preset**: Select `Vite` (or it auto-detects)
2. **Root Directory**: Click **"Edit"** → Change to `frontend`
3. **Build Command**: `npm run build` (should be auto-filled)
4. **Output Directory**: `dist` (should be auto-filled)
5. **Install Command**: `npm install` (should be auto-filled)

### 3.4 Add Environment Variable

Click **"Environment Variables"**:

- **Key**: `VITE_API_URL`
- **Value**: `https://your-backend-url.onrender.com` (your Render backend URL from Step 2.5)
- Click **"Add"**

### 3.5 Deploy

1. Click **"Deploy"** button
2. Wait for build and deployment (1-2 minutes)
3. Once deployed, you'll get a URL like: `https://feedback-dashboard.vercel.app`
4. **Copy this URL** - this is your live frontend!

### 3.6 Test Frontend

1. Visit your Vercel URL
2. Try submitting a feedback
3. Verify everything works!

✅ **Frontend is now live!**

---

## Step 4: Verify Deployment

### Test Checklist

1. ✅ Backend health check: `https://your-backend.onrender.com/api/health`
2. ✅ Frontend loads: `https://your-frontend.vercel.app`
3. ✅ Submit feedback works
4. ✅ Feedbacks display in table
5. ✅ Analytics cards show data
6. ✅ Filter by rating works
7. ✅ Search works
8. ✅ CSV export works

---

## Step 5: Get Your Project Links

You now have two URLs:

1. **Backend API URL**: `https://your-backend.onrender.com`
2. **Frontend URL**: `https://your-frontend.vercel.app`

### For Company Submission:

**Frontend URL**: `https://your-frontend.vercel.app`  
**Backend URL**: `https://your-backend.onrender.com`  
**GitHub Repository**: `https://github.com/your-username/feedback-dashboard`

---

## Troubleshooting

### Backend Issues

**Problem**: Backend not responding
- **Solution**: Check Render logs (Logs tab in Render dashboard)
- Wait 30 seconds after deployment (cold start)

**Problem**: Database errors
- **Solution**: SQLite file is created automatically on first request
- Check logs for permission errors

**Problem**: CORS errors
- **Solution**: Backend already has CORS enabled for all origins

### Frontend Issues

**Problem**: Cannot connect to backend
- **Solution**: 
  1. Verify `VITE_API_URL` environment variable in Vercel
  2. Make sure backend URL doesn't have trailing slash
  3. Re-deploy frontend after changing environment variable

**Problem**: Build fails
- **Solution**: Check build logs in Vercel
- Make sure all dependencies are in `package.json`

**Problem**: 404 errors on refresh
- **Solution**: This is handled automatically by Vercel

### Common Issues

**Render free tier sleep**:
- After 15 minutes of inactivity, Render free tier services "sleep"
- First request after sleep takes 30-50 seconds to wake up
- This is normal for free tier

**Environment variables not updating**:
- After adding/changing environment variables, you must **redeploy**:
  - **Render**: Go to Manual Deploy → Clear build cache & deploy
  - **Vercel**: Go to Deployments → Redeploy

---

## Next Steps

1. ✅ Test all features on live deployment
2. ✅ Take screenshots if needed
3. ✅ Prepare submission with:
   - Frontend URL
   - Backend URL  
   - GitHub Repository link
4. ✅ Optional: Create a short demo video (Loom, etc.)

---

## Quick Reference

### Render (Backend)
- **Dashboard**: [dashboard.render.com](https://dashboard.render.com)
- **Free tier**: Yes, with 15min sleep timeout
- **Database**: SQLite (file persists)

### Vercel (Frontend)
- **Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Free tier**: Yes, unlimited deployments
- **Domain**: Free `.vercel.app` subdomain

---

## Support

If you encounter issues:
1. Check deployment logs in Render/Vercel dashboards
2. Verify environment variables are set correctly
3. Make sure backend URL is accessible before deploying frontend
4. Check browser console (F12) for frontend errors

**Good luck with your submission!** 🚀

