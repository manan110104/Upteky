# Quick Start Commands

Copy and paste these commands to quickly run the application.

## Windows (PowerShell/Command Prompt)

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open: http://localhost:3000

## Mac/Linux

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open: http://localhost:3000

## Testing Backend API (Optional)

Open a new terminal and run:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all feedbacks
curl http://localhost:5000/api/feedback

# Get statistics
curl http://localhost:5000/api/stats
```

## Quick Verification Checklist

1. ✅ Backend terminal shows: "Server is running on port 5000"
2. ✅ Frontend terminal shows: "Local: http://localhost:3000/"
3. ✅ Browser opens without errors
4. ✅ Submit a test feedback
5. ✅ Feedback appears in the table
6. ✅ Analytics cards update

## If Something Goes Wrong

**Port 5000 already in use?**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Port 3000 already in use?**
Change port in `frontend/vite.config.js`

**Need to restart?**
1. Stop both servers (Ctrl+C)
2. Delete `backend/feedback.db` if you want fresh data
3. Start again from step 1

