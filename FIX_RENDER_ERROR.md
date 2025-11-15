# 🔧 Fix: Render Deployment Error

## Error Message
```
error Couldn't find a package.json file in "/opt/render/project/src"
```

## Problem
Render is looking for `package.json` in the wrong directory. It needs to use the `backend` directory as the root.

## Solution: Set Root Directory in Render

### Step 1: Go to Render Dashboard

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click on your **Web Service** (`feedback-api`)

### Step 2: Open Settings

1. Click on **"Settings"** tab (left sidebar)

### Step 2: Set Root Directory

1. Scroll down to **"Build & Deploy"** section
2. Find **"Root Directory"** field
3. Enter: `backend`
4. Click **"Save Changes"**

### Step 3: Update Build & Start Commands

1. In the same **"Build & Deploy"** section:
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. Click **"Save Changes"**

### Step 4: Manual Deploy

1. Click **"Manual Deploy"** tab
2. Click **"Deploy latest commit"**
3. Wait for deployment (2-3 minutes)

## Alternative: Using render.yaml (Advanced)

If you want to use `render.yaml`, you need to ensure Render is reading it correctly:

### Option A: Use render.yaml (Blueprint)

1. In Render dashboard, go to **"New +"** → **"Blueprint"**
2. Connect your GitHub repo
3. Render will auto-detect `render.yaml`
4. Deploy

### Option B: Manual Configuration (Recommended)

Just set the Root Directory manually in dashboard as described above.

## Correct Configuration

After fixing, your Render service should have:

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Environment** | `Node` |

## Verify Fix

After redeploy, check logs. You should see:
```
Installing dependencies...
npm install

Starting...
npm start

Server is running on port 10000
```

## Still Having Issues?

If you're still getting errors:

1. **Clear build cache**:
   - Settings → Clear build cache & deploy
   
2. **Check repository structure**:
   - Make sure `backend/package.json` exists in your GitHub repo
   
3. **Verify root directory**:
   - Double-check Root Directory is set to `backend` (not `./backend` or `/backend`)

4. **Try alternative**:
   - Root Directory: `backend`
   - Build Command: `cd backend && npm install` (if root directory doesn't work)
   - Start Command: `cd backend && npm start`

---

✅ **This should fix your deployment error!**

