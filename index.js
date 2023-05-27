const express = require("express");
const app = express();

const gptRoute = require("./Router/gptRoute");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.use(gptRoute);
app.listen(3000, () => {
  console.log("Server is running");
});
