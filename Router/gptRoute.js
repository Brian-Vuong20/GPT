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
  await axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [{ role: "user", content: "Hello" }],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    )
    .then((resp) => {
      let data = resp.data.choices[0].message.content;
      res.render("index", {
        data: data,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = router;
