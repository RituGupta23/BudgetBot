const Expense = require('../models/Expense');
const { parseExpense } = require('../utils/groqParser');

// @desc    Add a new expense (protected)
// @route   POST /api/expenses/create
// @access  Private
const addExpense = async (req, res) => {
  try {
    const { amount, category, note, date, source } = req.body;

    const newExpense = new Expense({
      userId: req.user._id, // pulled from JWT middleware
      amount,
      category,
      note,
      date,
      source: source || 'web'
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error("Error adding expense:", err.message);
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

// @desc    Get all expenses for the logged-in user
// @route   GET /api/expenses/my
// @access  Private
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err.message);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// @desc    Parse a natural language message into structured expense data
// @route   POST /api/expenses/parse
// @access  Private (can make public if needed)
const parserExpense = async (req, res) => {
  const { message } = req.body;
  try {
    const parsed = await parseExpense(message);
    if (parsed) {
      res.json(parsed);
    } else {
      res.status(500).json({ error: 'Parsing failed' });
    }
  } catch (err) {
    console.error("Parsing error:", err.message);
    res.status(500).json({ error: 'Parsing error occurred' });
  }
};

module.exports = { addExpense, getExpenses, parserExpense };