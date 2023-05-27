const express = require("express");
const router = express.Router();
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  const messages = [
    {
      role: "system",
      content: "Tell me a joke if i said i am sad, unhappy.",
    },
    {
      role: "system",
      content: "List medicines i should take if i am sick or unwell",
    },
    { role: "user", content: prompt },
  ];
  const gptRes = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  res.render("index", { data: gptRes.data.choices[0].message.content });
});

module.exports = router;
