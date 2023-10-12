// routes/adminRoutes.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Example route requiring admin privileges
router.post('/add-item', authMiddleware, isAdmin, (req, res) => {
    // Only admins can add items
    res.json({ msg: 'Item added successfully' });
});

// Example route for regular users
router.post('/checkout', authMiddleware, (req, res) => {
    // All authenticated users can checkout
    res.json({ msg: 'Checkout successful' });
});

module.exports = router;
