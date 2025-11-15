# Debug Guide: Average Rating Fix

## Steps to Fix and Test

### Step 1: Restart Backend Server

**Important:** You MUST restart the backend server for changes to take effect!

1. Stop the current backend server (Press `Ctrl+C` in the backend terminal)
2. Restart it:
```bash
cd backend
npm start
```

**Check the console output** - you should see:
- "Connected to SQLite database"
- "Feedbacks table ready"
- "Server is running on port 5000"

### Step 2: Clear Old Database (Optional but Recommended)

If you have old test data that might be causing issues:

1. Stop the backend server (Ctrl+C)
2. Delete the database file:
```bash
cd backend
# Windows
del feedback.db

# Mac/Linux
rm feedback.db
```
3. Restart the backend - it will create a new database

### Step 3: Test with Debug Endpoint

Open your browser or use curl to test:

```bash
# In browser, go to:
http://localhost:5000/api/test

# Or use curl:
curl http://localhost:5000/api/test
```

This will show:
- All feedbacks in the database
- The raw average from SQLite
- Feedback count

**Expected when empty:**
```json
{
  "feedbacks": [],
  "stats": { "total": 0, "avg": null },
  "feedbackCount": 0
}
```

### Step 4: Submit Test Feedback

1. Go to http://localhost:3000 (your frontend)
2. Submit a feedback with rating 5:
   - Name: Test User
   - Email: test@example.com
   - Message: Test message
   - Rating: 5

3. **Check backend console** - you should see:
   ```
   Inserting feedback with rating: 5 type: number
   Stats query result: { total: 1, averageRating: 5, ... }
   Returning stats: { total: 1, averageRating: 5, ... }
   ```

### Step 5: Check Stats API Directly

Test the stats endpoint directly:

```bash
# In browser:
http://localhost:5000/api/stats

# Or curl:
curl http://localhost:5000/api/stats
```

**Expected after 1 feedback with rating 5:**
```json
{
  "total": 1,
  "averageRating": 5,
  "positive": 1,
  "negative": 0,
  "neutral": 0
}
```

**Expected after 2 feedbacks with rating 5:**
```json
{
  "total": 2,
  "averageRating": 5,
  "positive": 2,
  "negative": 0,
  "neutral": 0
}
```

**Expected after ratings 5 and 3:**
```json
{
  "total": 2,
  "averageRating": 4,
  "positive": 1,
  "negative": 0,
  "neutral": 1
}
```

### Step 6: Verify Frontend Display

1. Check the browser console (F12)
2. Look for any errors
3. Verify the Analytics Cards show the correct average

### Step 7: Check Backend Console Logs

When you submit feedback or refresh the page, you should see in the backend console:

```
Inserting feedback with rating: 5 type: number
Stats query result: { total: 1, averageRating: 5, positive: 1, negative: 0, neutral: 0 }
Returning stats: { total: 1, averageRating: 5, positive: 1, negative: 0, neutral: 0 }
```

## What Was Fixed

1. **Rating Type**: Ensured rating is parsed as integer when saving
2. **SQL Calculation**: Changed `AVG(rating)` to `AVG(CAST(rating AS REAL))` for proper calculation
3. **Average Handling**: Improved parsing and formatting of average value
4. **Debug Logging**: Added console logs to track what's happening
5. **Frontend Display**: Fixed display logic to always show the value correctly

## If Still Not Working

### Check 1: Database Contents
```bash
# Test endpoint shows all data:
curl http://localhost:5000/api/test
```

### Check 2: Backend Console
Look for error messages or unexpected values in the console logs

### Check 3: Browser Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Submit feedback
4. Check the `/api/stats` request
5. See what JSON is being returned

### Check 4: Manual Database Query

If you have SQLite CLI installed:
```bash
cd backend
sqlite3 feedback.db
```

Then run:
```sql
SELECT * FROM feedbacks;
SELECT COUNT(*) as total, AVG(CAST(rating AS REAL)) as avg FROM feedbacks;
```

## Expected Results

After submitting 2 feedbacks with rating 5:
- **Total Feedbacks**: 2
- **Average Rating**: 5.00
- **Positive (4+)**: 2
- **Negative (<3)**: 0
- **Neutral (3)**: 0

After submitting ratings: 5, 4, 3, 2, 1:
- **Total Feedbacks**: 5
- **Average Rating**: 3.00
- **Positive (4+)**: 2
- **Negative (<3)**: 2
- **Neutral (3)**: 1

## Contact

If the issue persists after following all steps, check:
1. Backend console for errors
2. Browser console for errors
3. Network tab to see API responses
4. Database contents using `/api/test` endpoint

