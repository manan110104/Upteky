# Quick Setup Guide

Follow these steps to get the Feedback Dashboard running locally:

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend will run on `http://localhost:5000`

## Step 2: Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Step 3: Access the Application

Open your browser and navigate to `http://localhost:3000`

## Testing the Application

1. Fill out the feedback form with:
   - Name: Your name
   - Email: your@email.com
   - Message: Test feedback
   - Rating: 5 stars

2. Click "Submit Feedback"

3. Verify the feedback appears in the table

4. Check that analytics cards update with the new data

5. Try filtering by rating or searching for specific terms

6. Test the CSV export feature

## Troubleshooting

### Backend not connecting
- Ensure the backend server is running on port 5000
- Check that no other application is using port 5000
- Verify the database file is being created in the backend directory

### Frontend not loading
- Ensure the frontend server is running on port 3000
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly in `.env` file if using custom backend URL

### CORS errors
- The backend is configured to allow all origins for development
- If deploying, update CORS settings in `backend/server.js`

## Production Build

### Backend
```bash
cd backend
npm install --production
npm start
```

### Frontend
```bash
cd frontend
npm run build
# The built files will be in the 'dist' directory
```

