# ⚡ Vercel Quick Deployment Steps

Fastest way to deploy to Vercel (5 minutes).

## 🚀 Quick Steps

### 1️⃣ Import Project (1 min)
1. Go to [vercel.com](https://vercel.com) → Sign in
2. Click **"Add New..."** → **"Project"**
3. Find your repo: `feedback-dashboard` → Click **"Import"**

### 2️⃣ Configure (2 min)
1. **Root Directory**: Click "Edit" → Change to `frontend`
2. **Framework**: Auto-detects `Vite` ✅
3. **Build Command**: `npm run build` (auto-filled) ✅
4. **Output Directory**: `dist` (auto-filled) ✅

### 3️⃣ Add Environment Variable (1 min)
1. Scroll to **"Environment Variables"**
2. Click **"Add"**
3. **Key**: `VITE_API_URL`
4. **Value**: `https://upteky-api-9uv4.onrender.com`
5. Click **"Add"**

### 4️⃣ Deploy (1 min)
1. Click **"Deploy"** button
2. Wait 1-3 minutes
3. ✅ Done! Copy your URL

## ✅ Critical Settings

| Setting | Value |
|---------|-------|
| Root Directory | `frontend` |
| Environment Variable | `VITE_API_URL` = `https://upteky-api-9uv4.onrender.com` |

## 🎯 Test After Deployment

1. Open your Vercel URL
2. Submit a test feedback
3. ✅ If it works = Success!

---

📖 **For detailed guide, see:** `VERCEL_DEPLOYMENT_GUIDE.md`

