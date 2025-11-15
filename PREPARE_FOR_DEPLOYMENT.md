# 🚀 Prepare for Deployment

This document helps you prepare your code for deployment to Render and Vercel.

## Step 1: Verify Everything Works Locally

Before deploying, make sure everything works:

```bash
# Test Backend
cd backend
npm install
npm start
# Should run on http://localhost:5000

# Test Frontend (in new terminal)
cd frontend
npm install
npm run build
# Should create 'dist' folder without errors
npm run dev
# Should run on http://localhost:3000
```

✅ Both should work without errors!

## Step 2: Check for Hardcoded URLs

Search for any hardcoded localhost URLs:

```bash
# Check backend
grep -r "localhost" backend/

# Check frontend
grep -r "localhost" frontend/src/
```

✅ Should only find in configuration files (not in code logic)

## Step 3: Verify .gitignore

Make sure `.gitignore` includes:
- `node_modules/`
- `.env`
- `*.db`
- `dist/`
- `build/`

## Step 4: Commit All Changes

```bash
git add .
git commit -m "Ready for deployment"
```

## Step 5: Push to GitHub

If you haven't created a GitHub repo yet:

```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/feedback-dashboard.git
git branch -M main
git push -u origin main
```

If repo already exists:

```bash
git push origin main
```

## Step 6: Ready to Deploy!

Now follow:
- **DEPLOYMENT_STEPS.md** - Detailed step-by-step guide
- **QUICK_DEPLOY.md** - Fast deployment guide

## Common Issues Before Deployment

### Issue: Build fails locally
**Solution**: Fix errors before deploying
```bash
cd frontend
npm run build
# Fix any errors shown
```

### Issue: Dependencies missing
**Solution**: Make sure all dependencies are in package.json
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Issue: Environment variables
**Solution**: No .env files needed - will set in Render/Vercel dashboards

---

✅ **You're ready when:**
1. Code works locally
2. Code is pushed to GitHub
3. No hardcoded localhost URLs
4. Build succeeds

🎉 **Ready to deploy!**

