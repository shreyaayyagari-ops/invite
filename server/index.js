const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let answers = [];

app.get("/", (req, res) => {
  res.send("Love Quiz Backend running 💕");
});

app.post("/answer", (req, res) => {
  answers.push(req.body);
  res.json({ success: true });
});

app.get("/answers", (req, res) => {
  res.json(answers);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
