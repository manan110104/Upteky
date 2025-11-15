const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialization
const dbPath = path.join(__dirname, 'feedback.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    // Create table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS feedbacks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Feedbacks table ready');
      }
    });
  }
});

// Validation middleware
const validateFeedback = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// POST /api/feedback - Add new feedback
app.post('/api/feedback', validateFeedback, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message, rating } = req.body;

  // Ensure rating is an integer
  const ratingInt = parseInt(rating, 10);
  console.log('Inserting feedback with rating:', ratingInt, 'type:', typeof ratingInt);

  const sql = `INSERT INTO feedbacks (name, email, message, rating) VALUES (?, ?, ?, ?)`;
  
  db.run(sql, [name, email, message, ratingInt], function(err) {
    if (err) {
      console.error('Error inserting feedback:', err.message);
      return res.status(500).json({ error: 'Failed to save feedback' });
    }
    
    res.status(201).json({
      id: this.lastID,
      name,
      email,
      message,
      rating: ratingInt,
      createdAt: new Date().toISOString()
    });
  });
});

// GET /api/test - Test endpoint to check database contents
app.get('/api/test', (req, res) => {
  const sql = 'SELECT * FROM feedbacks ORDER BY createdAt DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching test data:', err.message);
      return res.status(500).json({ error: 'Failed to fetch test data' });
    }
    
    // Also get stats
    const statsSql = `SELECT COUNT(*) as total, AVG(CAST(rating AS REAL)) as avg FROM feedbacks`;
    db.get(statsSql, [], (err, statsRow) => {
      if (err) {
        return res.json({ feedbacks: rows, statsError: err.message });
      }
      res.json({ 
        feedbacks: rows, 
        stats: statsRow,
        feedbackCount: rows.length
      });
    });
  });
});

// GET /api/feedback - Fetch all feedbacks
app.get('/api/feedback', (req, res) => {
  const { rating, search } = req.query;
  let sql = 'SELECT * FROM feedbacks WHERE 1=1';
  const params = [];

  // Filter by rating if provided
  if (rating) {
    sql += ' AND rating = ?';
    params.push(parseInt(rating));
  }

  // Search in name, email, or message if provided
  if (search) {
    sql += ' AND (name LIKE ? OR email LIKE ? OR message LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  sql += ' ORDER BY createdAt DESC';

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error('Error fetching feedbacks:', err.message);
      return res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
    res.json(rows);
  });
});

// GET /api/stats - Get analytics data
app.get('/api/stats', (req, res) => {
  // Fetch all feedbacks and calculate in JavaScript
  db.all('SELECT rating FROM feedbacks', [], (err, rows) => {
    if (err) {
      console.error('Error fetching feedbacks for stats:', err.message);
      return res.status(500).json({ error: 'Failed to fetch statistics' });
    }
    
    const total = rows ? rows.length : 0;
    
    // Initialize counters
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    
    // Calculate stats from all ratings
    if (rows && rows.length > 0) {
      rows.forEach((row) => {
        const rating = parseInt(row.rating, 10);
        if (!isNaN(rating) && rating >= 1 && rating <= 5) {
          if (rating >= 4) {
            positive++;
          } else if (rating < 3) {
            negative++;
          } else if (rating === 3) {
            neutral++;
          }
        }
      });
    }
    
    const stats = {
      total: total,
      positive: positive,
      negative: negative,
      neutral: neutral
    };
    
    console.log('Calculated stats from', total, 'feedbacks:');
    console.log('  Positive:', positive, 'Negative:', negative, 'Neutral:', neutral);
    console.log('Returning stats:', JSON.stringify(stats, null, 2));
    
    res.json(stats);
  });
});

// Export feedbacks to CSV endpoint
app.get('/api/feedback/export', (req, res) => {
  const sql = 'SELECT * FROM feedbacks ORDER BY createdAt DESC';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching feedbacks for export:', err.message);
      return res.status(500).json({ error: 'Failed to export feedbacks' });
    }

    // Convert to CSV format
    const headers = ['ID', 'Name', 'Email', 'Message', 'Rating', 'Created At'];
    const csvRows = [headers.join(',')];

    rows.forEach(row => {
      const values = [
        row.id,
        `"${row.name.replace(/"/g, '""')}"`,
        `"${row.email.replace(/"/g, '""')}"`,
        `"${row.message.replace(/"/g, '""')}"`,
        row.rating,
        `"${row.createdAt}"`
      ];
      csvRows.push(values.join(','));
    });

    const csv = csvRows.join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=feedbacks.csv');
    res.send(csv);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

