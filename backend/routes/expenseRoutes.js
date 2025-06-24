const express = require('express');
const { addExpense, getExpenses, parserExpense } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware'); 

const router = express.Router();

// Protected Routes
router.post('/create', protect, addExpense);
router.get('/my', protect, getExpenses);
router.post('/parse', protect, parserExpense); // Optional to protect

module.exports = router;
