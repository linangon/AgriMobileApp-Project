const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role, phone_number, address, language_preference, created_at, updated_at, is_active } = req.body;

        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users 
            (username, email, password_hash, role, phone_number, address, language_preference, created_at, updated_at, is_active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [username, email, password_hash, role, phone_number, address, language_preference, created_at, updated_at, is_active], (error, data) => {
            if (error) {
                res.status(500).json({ success: false, message: error.message });
            } else {
                res.status(201).json({ success: true, message: 'User registered successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = `SELECT * FROM users WHERE email = ?`;
        const [results] = await db.query(sql, [email]); // using await

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        res.status(200).json({
            success: true,
            message: 'Login successfully',
            data: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                phone_number: user.phone_number,
                address: user.address,
                language_preference: user.language_preference,
                created_at: user.created_at,
                updated_at: user.updated_at,
                is_active: user.is_active
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
