const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // ⬅️ Serve static files (HTML/CSS/JS)

// Test Route (optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/fb.html');
});

// Signup Route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Account created successfully' });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  connection.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length > 0) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Server Start
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
