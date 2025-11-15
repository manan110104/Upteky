# Troubleshoot Average Rating Issue

## CRITICAL: Restart Backend Server

**You MUST restart the backend server after the fixes!**

1. **Stop** the backend server (Ctrl+C)
2. **Restart** it:
```bash
cd backend
npm start
```

## Step 1: Verify Backend is Updated

Check the backend console when it starts - you should see:
```
Connected to SQLite database
Feedbacks table ready
Server is running on port 5000
```

## Step 2: Test Directly with API

### Test 1: Check what's in the database
Open in browser: `http://localhost:5000/api/test`

This shows all feedbacks and raw average calculation.

### Test 2: Check stats endpoint
Open in browser: `http://localhost:5000/api/stats`

**Expected after 2 ratings of 5:**
```json
{
  "total": 2,
  "averageRating": 5,
  "positive": 2,
  "negative": 0,
  "neutral": 0
}
```

**If you see `"averageRating": 0` or `null`, check backend console logs!**

## Step 3: Check Backend Console Logs

When you submit feedback, you should see:
```
Inserting feedback with rating: 5 type: number
```

When stats are fetched, you should see:
```
Stats query result (raw): {
  "total": 2,
  "averageRating": 5,
  ...
}
averageRating value: 5 type: number
Returning stats: {
  "total": 2,
  "averageRating": 5,
  ...
}
```

**If you don't see these logs, the backend wasn't restarted!**

## Step 4: Check Frontend Browser Console

Open browser DevTools (F12) → Console tab.

When page loads, you should see:
```
Stats received from API: {total: 2, averageRating: 5, ...}
Average rating value: 5 type: number
Average Rating in card: 5 type: number
```

**If you see `averageRating: 0` or `undefined` or `null`**, the issue is in the backend response.

## Step 5: Clear Database and Test Fresh

If old data might be causing issues:

1. Stop backend (Ctrl+C)
2. Delete database:
```bash
cd backend
# Windows
del feedback.db
# Mac/Linux
rm feedback.db
```
3. Restart backend - it will create new database
4. Submit 2 new feedbacks with rating 5
5. Check stats

## Step 6: Manual Database Check

If you have SQLite installed, check directly:

```bash
cd backend
sqlite3 feedback.db
```

Then run:
```sql
SELECT * FROM feedbacks;
SELECT COUNT(*) as total, AVG(CAST(rating AS REAL)) as avg FROM feedbacks;
.exit
```

## What to Report Back

If it's still not working, please share:

1. **Backend console output** when you:
   - Submit a feedback
   - Access `/api/stats` endpoint

2. **What you see** when you open `http://localhost:5000/api/stats` in browser

3. **Frontend browser console** output (F12 → Console)

4. **The actual JSON response** from `/api/stats` (from browser Network tab)

## Quick Test Script

Run this in browser console (F12) after submitting 2 feedbacks:

```javascript
fetch('http://localhost:5000/api/stats')
  .then(r => r.json())
  .then(data => {
    console.log('Stats:', data);
    console.log('Average:', data.averageRating, 'Type:', typeof data.averageRating);
  });
```

**Expected output:**
```
Stats: {total: 2, averageRating: 5, ...}
Average: 5 Type: number
```

If you see `Average: 0` or `Average: null`, the backend is returning 0/null.

