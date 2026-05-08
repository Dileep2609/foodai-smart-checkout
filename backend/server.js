const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const Groq = require("groq-sdk");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Groq Backend Running");
});

app.post("/api/ai/suggestions", async (req, res) => {
  try {
    const cart = req.body.cart || [];

    const cartItems = cart.map((item) => item.title).join(", ");

    console.log("CART:", cartItems);

    // FALLBACK IF CART EMPTY

    if (!cartItems) {
      return res.json([
        {
          name: "Add Food",
          message: "Select food items to get AI suggestions",
        },
      ]);
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: `
User selected:
${cartItems}

Suggest:
- drinks
- desserts
- side dishes

Return ONLY valid JSON:

{
  "items": [
    {
      "name": "",
      "message": ""
    }
  ]
}
`,
        },
      ],

      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    console.log(response);

    const cleaned = response.replace(/```json/g, "").replace(/```/g, "");

    let data;

    try {
      data = JSON.parse(cleaned);
    } catch {
      data = {
        items: [
          {
            name: "AI Suggestion",
            message: cleaned,
          },
        ],
      };
    }

    res.json(data.items);
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json([
      {
        name: "Server Error",
        message: "AI suggestions unavailable",
      },
    ]);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
