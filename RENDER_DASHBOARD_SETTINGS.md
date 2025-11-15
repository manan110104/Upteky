# ⚙️ Render Dashboard Settings

## Exact Settings for Backend Deployment

Use these exact settings when configuring your Render Web Service:

### Basic Settings

| Field | Value |
|-------|-------|
| **Name** | `feedback-api` (or any name you prefer) |
| **Environment** | `Node` |
| **Region** | Choose closest to you (e.g., `Oregon (US West)`) |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ **IMPORTANT** |
| **Runtime** | `Node` (or auto-detected) |
| **Node Version** | `18` or `20` (auto-detected) |

### Build & Deploy Settings

| Field | Value |
|-------|-------|
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Auto-Deploy** | `Yes` (automatically deploys on git push) |

### Environment Variables

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | _(leave empty - Render assigns automatically)_ |

## Step-by-Step in Render Dashboard

### 1. Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Click **"Connect"**

### 2. Basic Configuration

Fill in these fields:

```
Name: feedback-api
Environment: Node
Region: [Choose your region]
Branch: main
Root Directory: backend  ← CRITICAL!
```

### 3. Build & Deploy

```
Build Command: npm install
Start Command: npm start
```

### 4. Advanced (Optional)

Click **"Advanced"** → **"Add Environment Variable"**:

```
Key: NODE_ENV
Value: production
```

### 5. Deploy

1. Scroll down
2. Click **"Create Web Service"**
3. Wait for deployment (2-3 minutes)

## Common Mistakes to Avoid

❌ **Wrong**: Root Directory = `./backend`  
✅ **Correct**: Root Directory = `backend`

❌ **Wrong**: Root Directory = `/backend`  
✅ **Correct**: Root Directory = `backend`

❌ **Wrong**: Build Command = `cd backend && npm install` (when Root Directory is set)  
✅ **Correct**: Build Command = `npm install` (when Root Directory = `backend`)

❌ **Wrong**: Root Directory left empty  
✅ **Correct**: Root Directory = `backend`

## Visual Guide

When setting Root Directory in Render:

```
[Repository Settings]
├── Name: feedback-api
├── Environment: Node
├── Branch: main
├── Root Directory: [backend]  ← Type "backend" here
└── ...
```

## After Deployment

Once deployed, you'll see:
- ✅ Build logs showing `npm install` running
- ✅ Server starting with `npm start`
- ✅ URL like: `https://feedback-api.onrender.com`

## If Build Fails

Check the logs for:
1. **Root Directory error** → Set Root Directory to `backend`
2. **package.json not found** → Verify Root Directory is `backend`
3. **Command not found** → Use `npm install` and `npm start` (not `yarn`)

---

✅ **Follow these exact settings and your deployment will work!**

