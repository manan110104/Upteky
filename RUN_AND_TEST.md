# Step-by-Step Guide: Running and Testing the Feedback Dashboard

This guide will walk you through running the application and verifying all features work correctly.

## Prerequisites Check

Before starting, ensure you have:
- Node.js installed (version 16 or higher)
- npm or yarn package manager

Check your Node.js version:
```bash
node --version
npm --version
```

## Step 1: Install Backend Dependencies

1. Open your terminal/command prompt
2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

**Expected Output:**
- You should see npm downloading packages
- No errors should occur
- You should see "added X packages" message

**Verification:**
- Check that `node_modules` folder is created in the `backend` directory
- Verify `package-lock.json` is created

## Step 2: Start the Backend Server

1. Still in the `backend` directory, run:
```bash
npm start
```

**Expected Output:**
```
Connected to SQLite database
Feedbacks table ready
Server is running on port 5000
```

**What to Check:**
- ✅ No errors in the console
- ✅ Server is running on port 5000
- ✅ Database connection successful
- ✅ Table creation successful

**Leave this terminal window open** - the server needs to keep running.

## Step 3: Test Backend API (Optional but Recommended)

Open a **NEW terminal window** and test if the backend is working:

### Test 1: Health Check
```bash
# On Windows (PowerShell)
curl http://localhost:5000/api/health

# On Mac/Linux
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{"status":"OK","message":"Server is running"}
```

### Test 2: Get All Feedbacks (Should be empty initially)
```bash
curl http://localhost:5000/api/feedback
```

**Expected Response:**
```json
[]
```

### Test 3: Get Statistics
```bash
curl http://localhost:5000/api/stats
```

**Expected Response:**
```json
{"total":0,"averageRating":0,"positive":0,"negative":0,"neutral":0}
```

**If these tests pass**, your backend is working correctly!

## Step 4: Install Frontend Dependencies

1. Open a **NEW terminal window** (keep backend running)
2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

**Expected Output:**
- npm downloading packages
- No errors
- "added X packages" message

**Verification:**
- Check that `node_modules` folder is created in the `frontend` directory
- Verify `package-lock.json` is created

## Step 5: Start the Frontend Development Server

1. Still in the `frontend` directory, run:
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**What to Check:**
- ✅ Frontend server is running on port 3000
- ✅ No errors in the console
- ✅ It shows the local URL (http://localhost:3000)

## Step 6: Open the Application in Browser

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Navigate to: `http://localhost:3000`

**Expected Result:**
- You should see the Feedback Management Dashboard
- The page should load without errors
- You should see:
  - Header: "Feedback Management Dashboard"
  - Analytics cards (Total, Average Rating, Positive, Negative, Neutral) - all showing 0
  - Feedback form on the left
  - Filters & Actions panel on the right
  - Empty feedbacks table at the bottom

**Check Browser Console (F12):**
- Open Developer Tools (F12 or Right-click → Inspect)
- Go to Console tab
- ✅ No red errors should appear
- ✅ Only normal loading messages

## Step 7: Test the Feedback Form

### Test 1: Submit Valid Feedback

1. Fill out the form:
   - **Name**: `John Doe`
   - **Email**: `john@example.com`
   - **Message**: `This is a test feedback. Great service!`
   - **Rating**: Move the slider to `5` (or select any value 1-5)

2. Click **"Submit Feedback"** button

**Expected Result:**
- ✅ Button shows "Submitting..." briefly
- ✅ Green success message appears: "Feedback submitted successfully!"
- ✅ Form fields are cleared
- ✅ Feedback appears in the table immediately
- ✅ Analytics cards update:
  - Total: `1`
  - Average Rating: `5.00` (if you selected 5)
  - Positive: `1` (if rating >= 4)
  - Negative: `0`
  - Neutral: `0`

**Verify in Table:**
- Check the table shows:
  - Name: John Doe
  - Email: john@example.com
  - Rating: 5 ⭐
  - Message: This is a test feedback...
  - Created At: Current date/time

### Test 2: Form Validation - Empty Fields

1. Try to submit the form with empty fields
2. Click "Submit Feedback" without filling anything

**Expected Result:**
- ✅ Form does NOT submit
- ✅ Error messages appear:
  - "Name is required"
  - "Email is required"
  - "Message is required"

### Test 3: Form Validation - Invalid Email

1. Fill out the form with:
   - Name: `Test User`
   - Email: `invalid-email` (not a proper email)
   - Message: `Test message`
   - Rating: `4`

2. Click "Submit Feedback"

**Expected Result:**
- ✅ Form does NOT submit
- ✅ Error message: "Please enter a valid email"

### Test 4: Submit Multiple Feedbacks

Submit 3-4 more feedbacks with different ratings:

**Feedback 2:**
- Name: `Jane Smith`
- Email: `jane@example.com`
- Message: `Good experience overall`
- Rating: `4`
- Submit

**Feedback 3:**
- Name: `Bob Wilson`
- Email: `bob@example.com`
- Message: `Could be better`
- Rating: `2`
- Submit

**Feedback 4:**
- Name: `Alice Brown`
- Email: `alice@example.com`
- Message: `Average service`
- Rating: `3`
- Submit

**Expected Result:**
- ✅ All feedbacks appear in the table
- ✅ Analytics cards update correctly:
  - Total: `4` (or however many you submitted)
  - Average Rating: Should calculate correctly
  - Positive (4+): Count of ratings >= 4
  - Negative (<3): Count of ratings < 3
  - Neutral (3): Count of ratings = 3

## Step 8: Test Filter by Rating

1. In the "Filters & Actions" panel, find the "Filter by Rating" dropdown
2. Select **"5 Stars"**

**Expected Result:**
- ✅ Table shows only feedbacks with 5-star rating
- ✅ Other ratings are filtered out
- ✅ Table count updates

3. Select **"All Ratings"**

**Expected Result:**
- ✅ All feedbacks appear again

4. Try filtering by other ratings (4, 3, 2, 1)
5. **Verify:** Each filter shows only feedbacks with that rating

## Step 9: Test Search Functionality

1. In the "Filters & Actions" panel, find the "Search" input field
2. Type: `John`

**Expected Result:**
- ✅ Table shows only feedbacks containing "John" in name, email, or message
- ✅ Results filter in real-time as you type

3. Try searching for:
   - An email: `john@example.com`
   - Part of a message: `Great`
   - A name: `Jane`

**Verify:** Search works across all fields (name, email, message)

4. Clear the search box

**Expected Result:**
- ✅ All feedbacks appear again

## Step 10: Test CSV Export

1. Make sure you have at least one feedback in the table
2. Click the **"Export to CSV"** button in the "Filters & Actions" panel

**Expected Result:**
- ✅ A CSV file downloads automatically
- ✅ File name: `feedbacks.csv`
- ✅ Open the file (Excel, Notepad, etc.)
- ✅ Verify it contains all feedbacks with columns:
  - ID, Name, Email, Message, Rating, Created At

**Note:** If using Chrome, check the Downloads folder. Other browsers may ask where to save.

## Step 11: Test Refresh Functionality

1. In the feedback table, click the **"Refresh"** button

**Expected Result:**
- ✅ Loading indicator appears briefly
- ✅ Data refreshes from the server
- ✅ All feedbacks reload

## Step 12: Test Analytics Cards

Verify the analytics cards show correct calculations:

1. Check **Total Feedbacks**: Should match the number of rows in the table
2. Check **Average Rating**: Should be the average of all ratings
3. Check **Positive (4+)**: Should count ratings >= 4
4. Check **Negative (<3)**: Should count ratings < 3
5. Check **Neutral (3)**: Should count ratings = 3

**Quick Math Check:**
- If you have ratings: [5, 4, 2, 3]
- Total: 4
- Average: (5+4+2+3)/4 = 3.5
- Positive: 2 (5 and 4)
- Negative: 1 (2)
- Neutral: 1 (3)

## Step 13: Test Backend Persistence

This verifies data persists in the database:

1. **Stop the backend server** (Ctrl+C in the backend terminal)
2. **Restart the backend server**:
   ```bash
   cd backend
   npm start
   ```
3. **Refresh the frontend** (F5 or click refresh)

**Expected Result:**
- ✅ All feedbacks should still be there
- ✅ Data persisted in the database
- ✅ Analytics cards show the same values

**This confirms:** Database is working correctly!

## Step 14: Test Error Handling

### Test 1: Backend Disconnected

1. Stop the backend server (Ctrl+C)
2. Try to submit a new feedback

**Expected Result:**
- ✅ Error message appears
- ✅ Something like: "Failed to submit feedback" or "Network error"
- ✅ User is informed about the issue

3. **Restart backend** and try again - should work now

### Test 2: Invalid Data

Try to submit feedback with:
- Rating: Use browser console to set an invalid rating (e.g., 10)
- Empty required fields (already tested above)

**Expected Result:**
- ✅ Frontend validation prevents invalid submissions
- ✅ Backend also validates (if frontend validation is bypassed)

## Step 15: Verify Mobile Responsiveness

1. Open browser DevTools (F12)
2. Click the device toggle icon (or Ctrl+Shift+M)
3. Select a mobile device view (iPhone, iPad, etc.)

**Expected Result:**
- ✅ Layout adjusts for mobile
- ✅ All components are visible
- ✅ Table is scrollable
- ✅ Form is usable on mobile

## Complete Test Checklist

Use this checklist to ensure everything works:

### Backend ✅
- [ ] Server starts without errors
- [ ] Health endpoint returns OK
- [ ] GET /api/feedback returns data
- [ ] POST /api/feedback creates new feedback
- [ ] GET /api/stats returns statistics
- [ ] GET /api/feedback/export returns CSV
- [ ] Database persists data after restart

### Frontend ✅
- [ ] Page loads without errors
- [ ] Analytics cards display correctly
- [ ] Form validation works
- [ ] Form submission works
- [ ] Table displays feedbacks
- [ ] Filter by rating works
- [ ] Search functionality works
- [ ] CSV export works
- [ ] Refresh button works
- [ ] Responsive design works
- [ ] Loading states work
- [ ] Error messages display

### Integration ✅
- [ ] Frontend connects to backend
- [ ] Data flows from frontend to backend
- [ ] Data flows from backend to frontend
- [ ] Real-time updates work
- [ ] Statistics update automatically

## Troubleshooting Common Issues

### Issue: Backend won't start
**Solution:**
- Check if port 5000 is already in use
- Kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Issue: Frontend won't start
**Solution:**
- Check if port 3000 is already in use
- Change port in `vite.config.js` if needed

### Issue: "Cannot connect to backend"
**Solution:**
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env` file
- Verify CORS is enabled in backend

### Issue: Form submits but data doesn't appear
**Solution:**
- Check browser console for errors (F12)
- Check backend terminal for errors
- Verify database file is created in backend directory

### Issue: Database errors
**Solution:**
- Delete `backend/feedback.db` file
- Restart backend (it will create a new database)

## Success Indicators

✅ **Everything is working correctly if:**
1. Backend server runs without errors
2. Frontend loads without errors
3. You can submit feedbacks successfully
4. Feedbacks appear in the table
5. Analytics cards show correct values
6. Filter and search work
7. CSV export works
8. Data persists after server restart

## Next Steps

If all tests pass:
1. ✅ Application is ready for deployment
2. ✅ Follow `DEPLOYMENT.md` for production deployment
3. ✅ Push code to GitHub
4. ✅ Deploy to Render (backend) and Vercel (frontend)
5. ✅ Share live URLs

**Congratulations!** Your Feedback Dashboard is fully functional! 🎉

