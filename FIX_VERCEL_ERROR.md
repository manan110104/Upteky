# 🔧 Fix: Vercel Build Error

## Error Message
```
sh: line 1: cd: frontend: No such file or directory
Error: Command "cd frontend && npm install" exited with 1
```

## Problem
The `vercel.json` file has `cd frontend` commands, but you've already set **Root Directory** to `frontend` in Vercel dashboard. This causes Vercel to try to `cd` into `frontend/frontend` which doesn't exist.

## ✅ Solution

I've fixed the `vercel.json` file. Now you have two options:

### Option 1: Delete vercel.json (Recommended)

Since you're setting Root Directory in Vercel dashboard, you don't need `vercel.json`:

1. **Delete or rename** `vercel.json` file
2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Remove vercel.json - using dashboard settings"
   git push
   ```
3. **In Vercel:**
   - Go to your project
   - Settings → **"Redeploy"** (or it auto-deploys)

### Option 2: Update vercel.json (Alternative)

The `vercel.json` file has been updated. Now:

1. **Push updated file to GitHub:**
   ```bash
   git add vercel.json
   git commit -m "Fix vercel.json - remove cd frontend commands"
   git push
   ```
2. **In Vercel:**
   - Settings → **"Redeploy"**

## 📋 Correct Vercel Settings

When **Root Directory** is set to `frontend`, use these commands:

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` (auto, or leave empty) |

**NOT:**
- ❌ `cd frontend && npm install`
- ❌ `cd frontend && npm run build`
- ❌ `frontend/dist`

**Because Root Directory is already `frontend`, you don't need `cd frontend`!**

## 🔍 Why This Happens

### When Root Directory = `frontend`:
- Vercel runs all commands FROM the `frontend/` directory
- `package.json` is in `frontend/`
- `dist/` folder will be `frontend/dist/`

### If you use `cd frontend`:
- Vercel tries to go to `frontend/frontend/` ❌
- This directory doesn't exist
- Error!

## ✅ Quick Fix Steps

### Step 1: Push Fixed Code
```bash
# If you deleted vercel.json
git add .
git commit -m "Remove vercel.json"
git push

# OR if using updated vercel.json
git add vercel.json
git commit -m "Fix vercel.json"
git push
```

### Step 2: Update Vercel Settings

1. Go to Vercel Dashboard → Your Project
2. Go to **Settings** tab
3. Check **Root Directory**: Should be `frontend`
4. Go to **Deployments** tab
5. Click **"..."** on latest deployment
6. Click **"Redeploy"**

### Step 3: Verify Build

Watch the deployment logs:
- ✅ Should see: "Installing dependencies..."
- ✅ Should see: "Building..."
- ✅ Should see: "Deploying..."
- ✅ Should see: "Ready" ✅

## 🎯 Recommended: Use Dashboard Settings Only

**Best approach:**
1. **Delete** `vercel.json` file
2. **Set everything in Vercel Dashboard:**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variable: `VITE_API_URL`

This avoids conflicts between `vercel.json` and dashboard settings.

## ✅ After Fix

Your deployment should:
1. ✅ Install dependencies successfully
2. ✅ Build successfully
3. ✅ Deploy successfully
4. ✅ Your app is live!

---

## 🆘 If Still Not Working

### Check 1: Root Directory
- Go to Settings → Root Directory
- Should be exactly: `frontend` (not `./frontend` or `/frontend`)

### Check 2: Build Command
- Should be: `npm run build`
- NOT: `cd frontend && npm run build`

### Check 3: Output Directory
- Should be: `dist`
- NOT: `frontend/dist`

### Check 4: File Structure
Verify in GitHub that your repo structure is:
```
feedback-dashboard/
├── backend/
│   └── package.json
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
└── vercel.json (optional - better to delete)
```

---

✅ **Push the fixed code and redeploy!**

