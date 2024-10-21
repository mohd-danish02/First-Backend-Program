require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const port = 8000;
// mongo db connection ...
const url = "mongodb://127.0.0.1:27017/MyDatabase-1";
app.use(express.json());
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Mongo Error ", err));

// mongoose ka schema matlb entries
const userShema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  job_title: {
    type: String,
  },
  gender: {
    type: String,
  },
});
// this is a model , it help us to perform crud operation
const user = mongoose.model("user", userShema);

app.get("/", (req, res) => {
  return res.send("Hi there this is home page ");
});

// post mathod to store data in database

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "all fields are required !" });
  }
  const result = await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "success" });
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
