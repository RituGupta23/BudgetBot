const axios = require("axios");

const fallbackPredict = async (message) => {
  try {
    const res = await axios.post("http://localhost:6000/predict", { message });
    return res.data.category;
  } catch (err) {
    console.error("Fallback failed:", err.message);
    return "uncategorized";
  }
};

const parseExpense = async (message) => {
  try {
    const prompt = `
Extract the amount, category, date, and note from this expense message:
"${message}"

Respond only in this JSON format:
{
  "amount": number,
  "category": "string",
  "date": "ISO 8601 format",
  "note": "string"
}
`;

    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const jsonString = res.data.choices[0].message.content.trim();
    const parsed = JSON.parse(jsonString);

    // If category is missing or empty, call fallback ML model
    if (!parsed.category || parsed.category.trim() === "") {
      parsed.category = await fallbackPredict(message);
    }

    return parsed;

  } catch (err) {
    console.error("Groq parsing failed:", err.message);
    if (err.response) {
      console.error("Groq error response:", err.response.data);
    }
    return null;
  }
};

module.exports = { parseExpense };