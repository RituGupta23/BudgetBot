const express = require('express');
const { parseExpense } = require('../utils/groqParser');
const Expense = require('../models/Expense');
const User = require('../models/User');

const router = express.Router();

router.post('/webhook', async (req, res) => {
  const message = req.body.Body;
  const from = req.body.From; // e.g., "whatsapp:+918588023759"
  console.log("Incoming from:", from, "Message:", message);

  try {
    const parsed = await parseExpense(message);

    if (!parsed || !parsed.amount || !parsed.category) {
      return res.set('Content-Type', 'text/xml').send(`
        <Response>
          <Message>❌ Couldn’t understand that. Try something like “Spent 200 on groceries”.</Message>
        </Response>
      `);
    }

    const phoneNumber = from.replace('whatsapp:', '');
    const user = await User.findOne({ phone: phoneNumber });

    if (!user) {
      return res.set('Content-Type', 'text/xml').send(`
        <Response>
          <Message>❌ Your number is not registered. Please sign up on the web app first.</Message>
        </Response>
      `);
    }

    // Handle date fallback
    let parsedDate = parsed.date;
    if (!parsedDate || parsedDate === 'unknown' || isNaN(new Date(parsedDate))) {
      parsedDate = new Date(); // fallback to current time
    }

    await Expense.create({
      userId: user._id,
      amount: parsed.amount,
      category: parsed.category,
      note: parsed.note,
      date: parsedDate,
      source: 'whatsapp'
    });

    res.set('Content-Type', 'text/xml');
    return res.send(`
      <Response>
        <Message>✅ ₹${parsed.amount} for ${parsed.category} recorded!</Message>
      </Response>
    `);
  } catch (err) {
    console.error('Error in WhatsApp webhook:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;