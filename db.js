// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: 'Asad@3434',         // your MySQL password
  database: 'facebook_clone'  // make sure this DB exists
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

module.exports = connection;
