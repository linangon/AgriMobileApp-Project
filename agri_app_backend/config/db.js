// filepath: c:\Users\user\Documents\Practicum(team)\AgriMobileApp-Project\agri_app_backend\config\db.js
const { createPool } = require('mysql2/promise');
require('dotenv').config();

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds
});

module.exports = pool;