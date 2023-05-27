const express = require("express");
const app = express();
require("dotenv").config();
const gptRoute = require("./Router/gptRoute");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.use(gptRoute);
app.listen(3000, () => {
  console.log("Server is running");
});
