# Feedback Dashboard Backend

Express.js API server for the Feedback Management Dashboard.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```
PORT=5000
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `POST /api/feedback` - Add new feedback
- `GET /api/feedback` - Get all feedbacks (supports `?rating=X` and `?search=term` query params)
- `GET /api/stats` - Get analytics data
- `GET /api/feedback/export` - Export feedbacks as CSV
- `GET /api/health` - Health check

## Database

Uses SQLite database (`feedback.db`). The table is created automatically on first run.

## Deployment

The backend can be deployed to Render, Railway, or Cyclic. Make sure to:
- Set the PORT environment variable
- The SQLite database file will persist in the deployment environment

