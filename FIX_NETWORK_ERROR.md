# 🔧 Fix: Network Error in Localhost

## Error Message
```
Network error. Please check if the backend server is running.
```

## ✅ Solution

I've fixed the code! Now follow these steps:

### Step 1: Make Sure Backend is Running

**Open Terminal 1:**
```bash
cd backend
npm start
```

**You should see:**
```
Connected to SQLite database
Feedbacks table ready
Server is running on port 5000
```

### Step 2: Make Sure Frontend is Running

**Open Terminal 2 (new terminal):**
```bash
cd frontend
npm run dev
```

**You should see:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### Step 3: Test the Connection

1. Open browser: `http://localhost:3000`
2. Open browser console (F12)
3. Check for any errors

### Step 4: Verify Backend is Accessible

In browser, try:
```
http://localhost:5000/api/health
```

**Should return:** `{"status":"OK","message":"Server is running"}`

## 🔍 What Was Fixed

### 1. API Configuration
- Changed to use Vite proxy in development
- Uses relative URLs (`/api/...`) which go through Vite proxy
- Proxy forwards to `http://localhost:5000`

### 2. Better Error Messages
- More specific error messages
- Shows exact issue (connection refused, etc.)

## ✅ Verify Fix

After restarting frontend:

1. **Check Browser Console (F12)**
   - Should NOT show network errors
   - Should show successful API calls

2. **Test Features:**
   - Page loads without errors
   - Analytics cards load (may show zeros initially)
   - Can submit feedback
   - Feedbacks appear in table

## 🚨 If Still Getting Errors

### Check 1: Backend Port
Make sure backend is running on port **5000** (not another port)

```bash
# Check backend server.js line 9:
PORT = process.env.PORT || 5000
```

### Check 2: Vite Proxy
Make sure `frontend/vite.config.js` has:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

### Check 3: Restart Frontend
After code changes, **restart** the frontend dev server:
```bash
# Stop frontend (Ctrl+C)
# Restart:
cd frontend
npm run dev
```

### Check 4: CORS (Should be fine)
Backend already has CORS enabled, so this should work.

### Check 5: Firewall/Antivirus
Sometimes firewall blocks localhost connections. Try:
- Temporarily disable firewall
- Or add exception for Node.js

## 📋 Quick Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Backend health check works: `http://localhost:5000/api/health`
- [ ] Frontend code updated (restart frontend after code changes)
- [ ] No firewall blocking localhost
- [ ] Browser console shows no network errors

## 🎯 Expected Behavior

**After fix:**
- ✅ Frontend loads without errors
- ✅ API calls go through Vite proxy to backend
- ✅ No "Network error" messages
- ✅ All features work correctly

---

✅ **Restart your frontend server and test again!**

