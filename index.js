require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  return res.send("Hi there this is home page ");
});

app.get("/contact", (req, res) => {
  return res.send(" hii there this is contact page");
});
app.get("/about", (req, res) => {
  return res.send("<h1>About Us page !</h1>");
});
app.listen(process.env.PORT, () => {
  console.log(`server created on this port ${process.env.PORT}`);
});
