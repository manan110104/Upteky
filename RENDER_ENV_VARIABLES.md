# Environment Variables for Render Backend

## Required Environment Variables

**None!** Your backend doesn't require any mandatory environment variables. Render automatically handles the `PORT` variable.

## Optional Environment Variables

You can optionally add these for better configuration:

### 1. PORT (Optional)
- **Key**: `PORT`
- **Value**: Leave empty (Render assigns automatically)
- **Purpose**: Port number for the server
- **Note**: Your code uses `process.env.PORT || 5000`, so Render's auto-assigned PORT will work automatically

### 2. NODE_ENV (Recommended)
- **Key**: `NODE_ENV`
- **Value**: `production`
- **Purpose**: Sets the environment to production mode
- **Note**: Good practice for production deployments

## How to Add Environment Variables in Render

1. Go to your Render dashboard
2. Select your **Web Service** (feedback-api)
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add the variables:

```
Key: NODE_ENV
Value: production
```

6. Click **"Save Changes"**
7. The service will automatically redeploy

## Minimum Configuration (Recommended)

For your Feedback Dashboard backend, add just this one:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |

## Complete Environment Variables List

Here's the complete list if you want to set everything:

| Key | Value | Required | Notes |
|-----|-------|----------|-------|
| `PORT` | _(empty or auto)_ | ❌ No | Render assigns automatically |
| `NODE_ENV` | `production` | ✅ Recommended | Set to production |

## What Your Code Uses

Your backend (`server.js`) currently uses:
- `process.env.PORT` - Falls back to 5000 if not set (Render sets this automatically)
- `process.env.NODE_ENV` - Not used in code, but good practice

## Quick Setup

**Minimum setup (works without any env vars):**
- No environment variables needed ✅

**Recommended setup:**
1. Add `NODE_ENV` = `production`

That's it! Your backend is ready to deploy.

---

## Screenshot Guide (Render Dashboard)

1. **Navigate to your service** → Click on service name
2. **Click "Environment" tab** (left sidebar)
3. **Click "Add Environment Variable"** button
4. **Enter:**
   - Key: `NODE_ENV`
   - Value: `production`
5. **Click "Save Changes"**
6. **Wait for automatic redeploy** (1-2 minutes)

---

✅ **That's all you need!** Your backend will work with or without these variables, but adding `NODE_ENV=production` is recommended.

