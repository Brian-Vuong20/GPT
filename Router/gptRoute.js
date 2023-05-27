const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [{ role: "user", content: "Hello" }],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.render("index", { data: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.response.data);
    throw error;
  }
});

module.exports = router;
