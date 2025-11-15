# Deployment Guide

This guide covers deploying the Feedback Dashboard to production.

## Prerequisites

- GitHub repository with your code
- Accounts on deployment platforms:
  - [Vercel](https://vercel.com) (Frontend)
  - [Render](https://render.com) (Backend)

## Backend Deployment (Render)

### Option 1: Using Render Dashboard

1. **Create a New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**
   - **Name**: `feedback-api` (or your preferred name)
   - **Environment**: Node
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier works fine

3. **Environment Variables**
   - Add `PORT` = `10000` (Render assigns ports dynamically, but this is a fallback)
   - Add `NODE_ENV` = `production`

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Note the URL (e.g., `https://feedback-api.onrender.com`)

### Option 2: Using render.yaml

1. Push your code with `render.yaml` to GitHub
2. Go to Render Dashboard → "New +" → "Blueprint"
3. Connect your repository
4. Render will auto-detect and deploy based on `render.yaml`

### Important Notes for Backend

- SQLite database will persist in Render's filesystem
- For production, consider upgrading to PostgreSQL (Render offers free tier)
- The backend URL will be your API endpoint

## Frontend Deployment (Vercel)

### Option 1: Using Vercel Dashboard

1. **Create a New Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure the Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**
   - Add `VITE_API_URL` = Your backend URL (e.g., `https://feedback-api.onrender.com`)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - Note the URL (e.g., `https://feedback-dashboard.vercel.app`)

### Option 2: Using Vercel CLI

```bash
cd frontend
npm install -g vercel
vercel
# Follow the prompts
# Set VITE_API_URL when asked
```

### Option 3: Using vercel.json

1. Push your code with `vercel.json` to GitHub
2. Connect repository to Vercel
3. Vercel will auto-detect the configuration

## Alternative Deployment Options

### Frontend: Netlify

1. Go to [Netlify](https://www.netlify.com)
2. Create new site from Git
3. Configure:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
   - Environment variable: `VITE_API_URL`

### Backend: Railway

1. Go to [Railway](https://railway.app)
2. Create new project from Git
3. Configure:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variable: `PORT`

### Backend: Cyclic

1. Go to [Cyclic](https://cyclic.sh)
2. Connect GitHub repository
3. Configure:
   - Root directory: `backend`
   - Cyclic will auto-detect and deploy

## Using Docker

If you prefer Docker deployment:

```bash
# Build and run with Docker Compose
docker-compose up -d

# Frontend will be on http://localhost
# Backend will be on http://localhost:5000
```

## Post-Deployment Checklist

- [ ] Backend is accessible (check `/api/health` endpoint)
- [ ] Frontend can connect to backend API
- [ ] Form submission works
- [ ] Feedback table displays data
- [ ] Analytics cards show correct data
- [ ] Search/filter functionality works
- [ ] CSV export works
- [ ] Database persists data

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### CORS Issues
If you see CORS errors:
- Update `cors` configuration in `backend/server.js`
- Add your frontend URL to allowed origins

### Database Not Persisting
- For Render: Files persist in the filesystem by default
- For Railway: Consider using their PostgreSQL service
- For Cyclic: Database persists automatically

### Build Failures
- Check that all dependencies are in `package.json`
- Verify Node.js version (v16+)
- Check build logs for specific errors

## Testing Deployment

After deployment, test all features:
1. Submit feedback through the form
2. View feedbacks in the table
3. Check analytics cards update
4. Test search/filter
5. Test CSV export
6. Verify data persists after refresh

## Support

For issues:
- Check deployment platform logs
- Verify environment variables are set correctly
- Ensure backend is accessible before deploying frontend
- Test locally first before deploying

