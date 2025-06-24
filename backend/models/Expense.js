// const mongoose = require('mongoose');

// const expenseSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   amount: Number,
//   category: String,
//   note: String,
//   date: Date,
//   source: String,
// });

// module.exports = mongoose.model('Expense', expenseSchema);
// This model defines the structure of an expense document in MongoDB.
// It includes fields for userId, amount, category, note, date, and source.
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  note: {
    type: String,
    default: '',
    trim: true,
    maxlength: 100
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  source: {
    type: String,
    enum: ['web', 'whatsapp'],
    default: 'whatsapp',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
