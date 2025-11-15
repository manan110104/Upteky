# ✅ Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## Pre-Deployment Checklist

- [ ] Code is tested and working locally
- [ ] All files are committed to git
- [ ] `.gitignore` includes sensitive files (`.env`, `node_modules`, `*.db`)
- [ ] Backend starts successfully (`cd backend && npm start`)
- [ ] Frontend builds successfully (`cd frontend && npm run build`)
- [ ] No hardcoded localhost URLs in code
- [ ] Environment variables are documented

## GitHub Setup

- [ ] GitHub account created
- [ ] New repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Repository is accessible

## Backend Deployment (Render)

- [ ] Render account created
- [ ] GitHub repository connected to Render
- [ ] Web service created with correct settings:
  - [ ] Name: `feedback-api`
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Environment variables set (if any)
- [ ] Service deployed successfully
- [ ] Health endpoint working: `https://your-api.onrender.com/api/health`
- [ ] Backend URL copied

## Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Project imported
- [ ] Configuration correct:
  - [ ] Root Directory: `frontend`
  - [ ] Framework: Vite
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Environment variable set:
  - [ ] `VITE_API_URL` = Backend URL from Render
- [ ] Project deployed successfully
- [ ] Frontend URL accessible
- [ ] Frontend URL copied

## Post-Deployment Testing

### Backend Tests
- [ ] Health check works: `/api/health`
- [ ] POST `/api/feedback` works (submit feedback)
- [ ] GET `/api/feedback` works (get all feedbacks)
- [ ] GET `/api/stats` works (get statistics)
- [ ] GET `/api/feedback/export` works (CSV export)

### Frontend Tests
- [ ] Page loads without errors
- [ ] Can submit feedback form
- [ ] Feedbacks display in table
- [ ] Analytics cards show data
- [ ] Filter by rating works
- [ ] Search functionality works
- [ ] CSV export button works
- [ ] No console errors in browser (F12)

### Integration Tests
- [ ] Frontend connects to backend API
- [ ] Form submission saves to database
- [ ] Data persists after refresh
- [ ] All features work end-to-end

## Submission Preparation

- [ ] Frontend URL documented
- [ ] Backend URL documented
- [ ] GitHub repository URL documented
- [ ] Screenshots taken (optional)
- [ ] Demo video recorded (optional)
- [ ] All URLs tested one final time

## Final Verification

Before submitting, verify:
1. ✅ Frontend URL is accessible
2. ✅ Backend URL is accessible
3. ✅ All features work on live deployment
4. ✅ No errors in browser console
5. ✅ No errors in backend logs

## Quick Links Format

For submission, prepare:

```
Project Name: Feedback Management Dashboard

Frontend URL: https://your-frontend.vercel.app
Backend URL: https://your-backend.onrender.com
GitHub Repository: https://github.com/your-username/feedback-dashboard

Tech Stack:
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: SQLite
```

## Notes

- Render free tier: Services sleep after 15 minutes of inactivity
- First request after sleep: Takes 30-50 seconds to wake up (normal)
- Vercel: Unlimited deployments, fast builds
- Database: SQLite file persists on Render's filesystem

---

✅ **Ready to submit when all items are checked!**

